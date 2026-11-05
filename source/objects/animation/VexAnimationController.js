/**
 * @file VexAnimationController.js
 *
 * @description Plays named frame sequences from a spritesheet. Storing frame indices keeps
 *  animations small and lets multiple sequences share the same image frames.
 */
export default class VexAnimationController {
  constructor(sprite) {
    this.sprite = sprite;
    this._frames = [];
    this._animations = new Map();
    this._current = null;
    this._frameIndex = 0;
    this._elapsed = 0;
    this.currentFrame = null;
    this.finished = false;
  }

  /**
   * Precompute frame rectangles so playback only needs to select an index.
   *
   * @param {object} image - Your spritesheet.
   * @param {Number} frameWidth - The width of your sprite.
   * @param {Number} frameHeight - The height of your sprite
   */
  _setupSheet(image, frameWidth, frameHeight) {
    this._frames = [];
    const cols = Math.floor(image.width / frameWidth);
    const rows = Math.floor(image.height / frameHeight);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this._frames.push({
          x: c * frameWidth,
          y: r * frameHeight,
          width: frameWidth,
          height: frameHeight,
        });
      }
    }
  }

  /**
   * Assigns an atlas, or an array of frame records to this controller.
   *
   * Usage:
   * `bf.animation.setFrames(atlas);`
   *
   * @param {VexAtlas|Array<object>} atlasFrames - A parsed VexAtlas instance, or raw array of frame objects.
   */
  setFrames(atlasFrames) {
    this._frames = atlasFrames?.frames || atlasFrames || [];
    if (this._frames.length > 0) {
      const first = this._frames[0];
      this.currentFrame = first;
      if (this.sprite) {
        this.sprite.width = first.sourceWidth || first.width;
        this.sprite.height = first.sourceHeight || first.height;
      }
    }
  }

  /**
   * Give the a custom frame name, its atlas prefix,
   *  set the framerate of the animation, and determine whether the animation is looped.
   *
   * Usage:
   * `bf.animation.addByPrefix("singUP-alt", "BF HEY", 24, false);`
   *
   * @param {String} name - Your custom frame name.
   * @param {String} prefix - The name prefix to match in the atlas (e.g. "BF idle dance").
   * @param {Number} [framerate=30] - Playback speed in frames per second.
   * @param {boolean} [looped=true] - Whether the animation repeats when it finishes.
   * @returns {void}
   */
  addByPrefix(name, prefix, framerate = 30, looped = true) {
    const indices = [];
    this._frames.forEach((frame, index) => {
      if (frame.name && frame.name.startsWith(prefix)) {
        indices.push(index);
      }
    });
    this.add(name, indices, framerate, looped);
  }

  /**
   * Give the character a frame name, its atlas prefix, its indices,
   *  set the framerate of the animation, and determine whether the animation is looped.
   *
   * Usage:
   * `bf.animation.addByIndices("idle-hold", "BF idle dance", [10, 11, 12, 13], "", 24, true);`
   *
   * @param {String} name - The custom frame name.
   * @param {String} prefix - The name prefix to match in the atlas (e.g. "BF idle dance").
   * @param {Array[Number]} indices - An index of frames that you want to include.
   * @param {String} [postFix=""] - Optional postfix to match at the end of the frame name.
   * @param {Number} [framerate=30] - Playback speed in frames per second.
   * @param {boolean} [looped=true] - Whether the animation repeats when it finishes.
   * @returns {void}
   */
  addByIndices(
    name,
    prefix,
    indices,
    postFix = "",
    framerate = 30,
    looped = true,
  ) {
    const matching = [];
    this._frames.forEach((frame, index) => {
      if (
        frame.name &&
        frame.name.startsWith(prefix) &&
        frame.name.endsWith(postFix)
      ) {
        matching.push(index);
      }
    });

    const frameIndices = indices
      .map((i) => matching[i])
      .filter((i) => i !== undefined);
    this.add(name, frameIndices, framerate, looped);
  }

  /**
   * Play the characters animation.
   *
   * Usage:
   * `bf.animation.play("idle-hold");`
   *
   * @param {String} name - Your frame name
   * @param {boolean} [force=false] - Set true if you want to force-play your animation.  
   */
  play(name, force = false) {
    if (this._current === name && !force) return;
    if (!this._animations.has(name)) return;
    this._current = name;
    this._frameIndex = 0;
    this._elapsed = 0;
    this.finished = false;
    this._applyFrame();
  }

  update(dt) {
    if (!this._current) return;
    const anim = this._animations.get(this._current);
    if (!anim || this.finished) return;

    this._elapsed += dt;
    const frameDuration = 1 / anim.framerate;
    // Consume all elapsed frame intervals so a delayed update does not lose animation time.
    while (this._elapsed >= frameDuration) {
      this._elapsed -= frameDuration;
      this._frameIndex++;
      if (this._frameIndex >= anim.frames.length) {
        if (anim.looped) this._frameIndex = 0;
        else {
          this._frameIndex = anim.frames.length - 1;
          this.finished = true;
          break;
        }
      }
    }
    this._applyFrame();
  }

  // Resolve the animation index once so the renderer can use the current frame directly.
  _applyFrame() {
    const anim = this._animations.get(this._current);
    if (!anim) return;
    const frameNum = anim.frames[this._frameIndex];
    this.currentFrame = this._frames[frameNum] || null;
  }
}
