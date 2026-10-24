import {
  VexState,
  VexSprite,
  VexText,
  VexGlobal,
  VexObject,
} from "../../index.js";

/**
 * @file PlayState.js
 *
 * @description A minimal "Jump Game" for Vex:
 *  Jump over obstacles DO NOT GET HIT!
 */
export default class PlayState extends VexState {
  create() {
    // Initialize the HUD
    this._buildHUD();
    this.score = 0;

    // Initialize the world
    this._buildWorld();

    // Player sprite
    this.player = new VexSprite()
      .loadGraphic("./assets/crow.jpg")
      .setPosition(300, 350);
    this.player.width = 68;
    this.player.height = 48;
    this.playerSpawn = { x: this.player.x, y: this.player.y };
    this.add(this.player);

    VexGlobal.camera.follow(this.player, { mode: "lerp", lerp: 0.05 });
  }

  _buildHUD() {
    // Game title display
    this.descText = new VexText(100, 100, "Jump!")
      .setFont("20px Courier New")
      .setBold(true)
      .setColor("#ffffff")
      .setAlign("left");
    this.descText.x = 10;
    this.descText.y = 10;
    this.add(this.descText);

    // Score text display
    this.scoreText = new VexText(100, 100, "Score: 0")
      .setFont("20px Courier New")
      .setBold(true)
      .setColor("#ffffff")
      .setAlign("left");
    this.scoreText.x = 500;
    this.scoreText.y = 10;
    this.add(this.scoreText);
  }

  _buildWorld() {
    // Ground Sprite
    this.ground = new VexSprite(0, 400).loadGraphic(
      "./assets/grassanddirt.jpg",
    );
    this.ground.width = 6000;
    this.height = 400;
    this.add(this.ground);

    // Obstacle (enemy) sprites
    this.obstacle = new VexSprite().loadGraphic("./assets/uhhhh.jpg");
    this.add(this.obstacle);
    this._resetObstacle();

    // World values
    this.gravity = 500;
    this.gamespeed = 150;

    // Gamespeed on ground and obstacle sprite
    this.ground.velocity.x = -this.gamespeed;
    this.obstacle.velocity.x = -this.gamespeed;
  }

  update(dt) {
    super.update(dt);
    VexGlobal.camera.update(dt);

    var player = this.player;
    player.acceleration.y = this.gravity;

    // Ground and Obstacle automatic movement to the left following gamespeed changes.
    // GSI = Game Speed Index
    for (var GSI = 0; GSI < 5; GSI++) {
      VexGlobal.keys.pressed("ArrowLeft");
      this.ground.velocity.x = -this.gamespeed;
      this.obstacle.velocity.x = -this.gamespeed;
    }

    // Cap the gamespeed at 650 to prevent lag!
    if (this.gamespeed > 650) this.gamespeed = 650;

    // Ground/Obstacle loop
    var lastObstacle = -280;
    if (this.ground.x < -5000) this.ground.x = 0;
    if (lastObstacle > this.obstacle.x) this._resetObstacle();

    // Confirming collision to restart game
    this._obstacleCollision();
    if (this._obstacleCollision()) {
      VexGlobal.camera.fade("#000000", 0.5, true);
      return this._restartGame();
    }

    // Scoring system
    if (
      !this.obstacleScored &&
      this.obstacle.x + this.obstacle.width < this.player.x
    ) {
      this._scoringSystem();
    }

    VexObject.collide(this.player, this.ground);

    // Player jump movement
    var isGrounded = player.touching.down;
    if (VexGlobal.keys.pressed("Space") && isGrounded) player.velocity.y = -320;
  }

  // Obstacle Collion towards player
  _obstacleCollision() {
    return this.player.overlaps(this.obstacle);
  }

  // Obstacle reset for looping mechanism
  _resetObstacle() {
    this.obstacleHeight = 30 + Math.floor(Math.random() * 30);
    this.obstacle.width = 50;
    this.obstacle.height = this.obstacleHeight;
    this.obstacle.x = 800;
    this.obstacle.y = this.ground.y - this.obstacle.height;
    this.obstacleScored = false;
  }

  // Game restarting after death
  _restartGame() {
    this.player.x = this.playerSpawn.x;
    this.player.y = this.playerSpawn.y;
    this.player.velocity.x = 0;
    this.player.velocity.y = 0;
    this.ground.x = 0;
    this.obstacle.x = 600;
    this.score = 0;
    this.scoreText.setText(`Score: ${this.score}`);
    this.gamespeed = 150;
    this._resetObstacle();
  }

  // Score system for everytime you jump over an obstacle
  _scoringSystem() {
    this.score += 100;
    this.gamespeed += 25;

    this.ground.velocity.x = -this.gamespeed;
    this.obstacle.velocity.x = -this.gamespeed;

    this.scoreText.setText(`Score: ${this.score}`);
    this.obstacleScored = true;
  }
}
