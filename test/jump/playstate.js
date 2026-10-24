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
    this.gamespeed = 150;

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
    this.scoreText.x = 530;
    this.scoreText.y = 10;
    this.add(this.scoreText);

    this.score = 0;

    // Player sprite
    this.player = new VexSprite().setPosition(300, 350);
    this.player.loadGraphic("./assets/crow.jpg");
    this.player.width = 68;
    this.player.height = 48;
    this.playerSpawn = { x: this.player.x, y: this.player.y };
    this.add(this.player);

    // Ground Sprite
    this.ground = new VexSprite(0, 400);
    this.ground.loadGraphic("./assets/grassanddirt.jpg");
    this.ground.width = 6000;
    this.ground.height = 400;

    this.add(this.ground);

    this.gravity = 500;

    VexGlobal.camera.follow(this.player, { mode: "lerp", lerp: 0.05 });

    // Obstacle Sprite
    this.obstacle = new VexSprite();
    this.add(this.obstacle);

    this.obstacle.loadGraphic("./assets/uhhhh.jpg");
    this._resetObstacle();

    // Gamespeed on ground and obstacle sprite
    this.ground.velocity.x = -this.gamespeed;
    this.obstacle.velocity.x = -this.gamespeed;
  }

  update(dt) {
    super.update(dt);
    VexGlobal.camera.update(dt);

    const player = this.player;
    player.acceleration.y = this.gravity;

    // Ground and Obstacle automatic movement to the left following gamespeed changes.
    for (let i = 0; i < 5; i++) {
      VexGlobal.keys.pressed("ArrowLeft");
      this.ground.velocity.x = -this.gamespeed;
      this.obstacle.velocity.x = -this.gamespeed;
    }

    // Ground loop
    if (this.ground.x < -5000) {
      this.ground.x = 0;
    }

    // Obstacle loop
    const lastObstacle = -280;

    if (lastObstacle > this.obstacle.x) {
      this._resetObstacle();
    }

    //Confirming collision to restart game
    this._obstacleCollision();
    if (this._obstacleCollision()) {
      VexGlobal.camera.fade("#000000", 0.5, true);
      return this._restartGame();
    }

    //Scoring system
    if (
      !this.obstacleScored &&
      this.obstacle.x + this.obstacle.width < this.player.x
    ) {
      this.score += 1;
      this.gamespeed += 25;

      this.ground.velocity.x = -this.gamespeed;
      this.obstacle.velocity.x = -this.gamespeed;

      this.scoreText.setText(`Score: ${this.score}`);
      this.obstacleScored = true;
    }

    //Gamespeed limit
    if (this.gamespeed > 650) {
      this.gamespeed = 650;
    }

    VexObject.collide(this.player, this.ground);
    var isGrounded = player.touching.down;
    // Player jump movement
    if (VexGlobal.keys.pressed("Space") && isGrounded) player.velocity.y = -320;
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

  // Obstacle Collion towards player
  _obstacleCollision() {
    return this.player.overlaps(this.obstacle);
  }
}
