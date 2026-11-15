import VexEase from "./VexEase.js";

/**
 * @file VexTween.js
 *
 * @description Animates object properties over time.
 * A shared manager lets the game advance active tweens centrally on each update.
 */
class VexTween {
  constructor(target, properties, duration, options = {}) {
    this.target = target;
    this.duration = Math.max(0, Number(duration) || 0);
    this.onComplete = options.onComplete || null;
    this.cancelled = false;
    this.done = false;
    this.ease = options.ease || VexEase.linear;
    this.elapsed = 0;

    this._from = {};
    this._to = properties;
    Object.keys(properties).forEach((key) => {
      this._from[key] = target[key];
    });
  }

  update(dt) {
    if (this.done || this.cancelled) return;
    this.elapsed += dt;

    // If duration is 0, progress is immediately 1.
    // Otherwise, calcuate ratio.
    const progress =
      this.duration <= 0 ? 1 : Math.min(1, this.elapsed / this.duration);
    const eased = this.ease(progress);

    Object.keys(this._to).forEach((key) => {
      const from = this._from[key];
      const to = this._to[key];
      this.target[key] = from + (to - from) * eased;
    });

    if (progress >= 1) {
      this.done = true;
      if (this.onComplete) this.onComplete();
    }
  }
}

// A shared list lets VexGame advance tweens without owning each one.
const activeTweens = [];

// Return the tween handle so callers can track its completion.
function tween(target, properties, duration, options = {}) {
  const tmr = new VexTween(target, properties, duration, options);
  activeTweens.push(tmr);
  return tmr;
}

// Iterate backward so completed tweens can be removed without skipping entries.
function updateTweens(dt) {
  // Snapshot list so callbacks pushing new tweens don't run on the same tick.
  const currentTweens = [...activeTweens];
  for (const tween of currentTweens) {
    if (!tween.done && !tween.cancelled) tween.update(dt);
  }

  // Remove all completed/cancelled tweens from the active list.
  for (let i = activeTweens.length - 1; i >= 0; i--) {
    if (activeTweens[i].done || activeTweens[i].cancelled)
      activeTweens.splice(i, 1);
  }
}

// Cancel updates when another action takes control of the same target.
function cancelTweensOf(target) {
  for (let i = activeTweens.length - 1; i >= 0; i--) {
    if (activeTweens[i].target === target) {
      activeTweens[i].cancelled = true;
      activeTweens.splice(i, 1);
    }
  }
}

export default { tween, updateTweens, cancelTweensOf, Easing: VexEase };
