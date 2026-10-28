import VexObject from "./VexObject.js";
import VexAnimationController from "./animation/VexAnimationController.js";

/**
 * @file VexSprite.js
 *
 * @description Represents a movable, drawable game object. It combines motion and image
 *  animation so common 2D behavior can be reused by game entities.
 */
export default class VexSprite extends VexObject {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.scale = { x: 1, y: 1 };
    this.flipX = false;
    this.flipY = false;
    this.alpha = 1;
    this.scrollFactor = { x: 1, y: 1 };
    this.offset = { x: 0, y: 0 };

    this.image = null;
    this.animationController = new VexAnimationController(this);

    // A color fallback keeps sprites usable before an image is loaded.
    this.color = "#ffffff";
  }

  /**
   * Alias to access this sprite's animation controller.
   * @type {VexAnimationController}
   */
  get animation() {
    return this.animationController;
  }

  /**
   * Gets the list of parsed atlas frame records, and loads it into the animation controller.
   * @type {VexAnimationController}
   */
  get frames() {
    return this.animationController._frames;
  }

  /**
   * Sets the sprite's animaiton atlas, and updates the frame dimensions.
   * @param {VexAtlas|Array<object>} atlas - A VexAtlas instance or array of frames.
   */
  set frames(atlas) {
    this.animationController.setFrames(atlas);
  }

  /**
   * Loads an image file for this sprite and optionally sets up a spritesheet grid.
   *
   * @param {String} path - URL or path to the image file.
   * @param {Number} [frameWidth=0] - Frame width for grid slicing (0 for whole image).
   * @param {Number} [frameHeight=0] - Frame height for grid slicing (0 for whole image).
   * @returns {VexSprite} This sprite instance for method chaining.
   */
  loadGraphic(path, frameWidth = 0, frameHeight = 0) {
    const image = new Image();
    image.src = path;
    this.image = image;
    this.width = frameWidth;
    this.height = frameHeight;

    image.onload = () => {
      this.width = frameWidth || this.width || image.width;
      this.height = frameHeight || this.height || image.height;
      if (frameWidth && frameHeight) {
        this.animationController._setupSheet(
          this.image,
          frameWidth,
          frameHeight,
        );
      }
    };
    return this;
  }

  /**
   * Creates a solid colored rectangle placeholder graphic.
   *
   * @param {Number} width - Width of the graphic in pixels.
   * @param {Number} height - Height of the graphic in pixels.
   * @param {String} [color="#ffffff"] - Fill color in CSS format (hex, rgb, etc.).
   * @returns {VexSprite} This sprite instance for method chaining.
   */
  makeGraphic(width, height, color = "#ffffff") {
    this.width = width;
    this.height = height;
    this.color = color;
    this.image = null;
    return this;
  }

  /**
   * Sets the world position of the sprite.
   *
   * @param {Number} x - Target X coordinate.
   * @param {Number} y - Target Y coordinate.
   * @returns {VexSprite} This sprite instance for method chaining.
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this; // Allow for method chaining
  }

  /**
   * Sets the bounding size of the sprite.
   *
   * @param {Number} width - Target width.
   * @param {Number} height - Target height.
   * @returns {VexSprite} This sprite instance for method chaining.
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;
    return this; // Allow for method chaining
  }

  update(dt) {
    super.update(dt);
    this.animationController.update(dt);
  }

  draw(ctx, camera) {
    if (!this.visible) return;
    const sx =
      this.x + camera.scroll.x * (1 - this.scrollFactor.x) - this.offset.x;
    const sy =
      this.y + camera.scroll.y * (1 - this.scrollFactor.y) - this.offset.y;

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(sx + this.width / 2, sy + this.height / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.scale(
      this.scale.x * (this.flipX ? -1 : 1),
      this.scale.y * (this.flipY ? -1 : 1),
    );

    if (this.image && this.image.complete) {
      const frame = this.animationController.currentFrame;
      if (frame) {
        const ox = frame.offsetX || 0;
        const oy = frame.offsetY || 0;

        ctx.drawImage(
          this.image,
          frame.x,
          frame.y,
          frame.width,
          frame.height,
          -this.width / 2 + ox,
          -this.height / 2 + oy,
          this.width,
          this.height,
        );
      } else {
        ctx.drawImage(
          this.image,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height,
        );
      }
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
    ctx.restore();
  }
}
