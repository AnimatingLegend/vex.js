import {
  VexGlobal,
  VexObject,
  VexState,
  VexSprite,
  VexText,
} from "../../index.js";

export default class PlayState extends VexState {
  create() {
    this._buildInstructions();
    this._buildStations();
    this._resetObjects();
  }

  _buildInstructions() {
    this.title = new VexText(120, 20, "Vex.js Collision Visual Test")
      .setFont("18px Comic Sans MS")
      .setAlign("center")
      .setColor("#ffffff");
    this.add(this.title);

    this.instructions = new VexText(
      320,
      450,
      "Click anywhere to reset positions!",
    )
      .setFont("14px Comic Sans MS")
      .setAlign("center")
      .setColor("#aaaaaa");
    this.add(this.instructions);

    this.status = new VexText(400, 320, "Status:")
      .setFont("14px sans-serif")
      .setColor("#ffffff");
    this.add(this.status);
  }

  _buildStations() {
    // 1. Vertical Station - Floor + Falling Box.
    this.add(
      new VexText(40, 60, "1. Vertical")
        .setFont("14px Comic Sans MS")
        .setColor("#ffffff"),
    );

    this.floor = new VexSprite(30, 220).makeGraphic(100, 20, "#555555");
    this.floor.immovable = true;
    this.add(this.floor);

    this.verticalBox = new VexSprite(65, 85).makeGraphic(30, 30, "#ff4444");
    this.add(this.verticalBox);

    // ---------------
    // 2. Horizontal Station - Wall + Moving Box.
    this.add(
      new VexText(240, 60, "2. Horizontal")
        .setFont("14px Comic Sans MS")
        .setColor("#ffffff"),
    );

    this.wall = new VexSprite(310, 100).makeGraphic(20, 140, "#555555");
    this.wall.immovable = true;
    this.add(this.wall);

    this.horizontalBox = new VexSprite(190, 150).makeGraphic(30, 30, "#44aaff");
    this.add(this.horizontalBox);

    // ---------------
    // 3. Both Movable Station: Head-on Collision.
    this.add(
      new VexText(460, 60, "3. Both Movable")
        .setFont("14px Comic Sans MS")
        .setColor("#ffffff"),
    );

    this.movableA = new VexSprite(440, 100).makeGraphic(30, 30, "#ffaa00");
    this.movableB = new VexSprite(540, 100).makeGraphic(30, 30, "#aaff00");
    this.add(this.movableA);
    this.add(this.movableB);

    // ---------------
    // 4. Edge Contact Station: Sliding flush along edge
    this.add(
      new VexText(80, 280, "4. Edge Contact")
        .setFont("14px Comic Sans MS")
        .setColor("#ffffff"),
    );

    this.edgeBlock = new VexSprite(30, 310).makeGraphic(60, 60, "#555555");
    this.edgeBlock.immovable = true;
    this.add(this.edgeBlock);

    this.slider = new VexSprite(90, 280).makeGraphic(30, 30, "#dd44ff");
    this.add(this.slider);
  }

  _resetObjects() {
    // Station 1
    this.verticalBox.setPosition(65, 85);
    this.verticalBox.velocity.y = 120;

    // Station 2
    this.horizontalBox.setPosition(190, 150);
    this.horizontalBox.velocity.x = 80;

    // Station 3
    this.movableA.setPosition(400, 100);
    this.movableA.velocity.x = 60;
    this.movableB.setPosition(520, 100);
    this.movableB.velocity.x = -60;

    // Station 4
    this.slider.setPosition(90, 280); // Exact right edge of edgeBlock (30 + 60 = 90)
    this.slider.velocity.y = 70;
  }

  update(dt) {
    super.update(dt);

    // Run Collsion resolution for all test pairs.
    VexObject.collide(this.verticalBox, this.floor);
    VexObject.collide(this.horizontalBox, this.wall);
    VexObject.collide(this.movableA, this.movableB);
    VexObject.collide(this.slider, this.edgeBlock);

    // Update Status across consistent updates.
    this.status.text =
      `STATUS:\n` +
      `Vertical Touching Down: ${this.verticalBox.touching.down}\n` +
      `Horizontal Touching Right: ${this.horizontalBox.touching.right}\n` +
      `Movable A Touching Right: ${this.movableA.touching.right}\n` +
      `Edge Overlaps: ${this.slider.overlaps(this.edgeBlock)}`;

    // Click to reset.
    if (VexGlobal.mouse.justPressed) this._resetObjects();
  }
}
