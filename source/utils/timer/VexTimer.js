import VexTimerManager from "./VexTimerManager.js";

/**
 * @file VexTimer.js
 *
 * @description A timer that counts down from a specified time,
 *  optionally looping and calling a callback on completion.
 */
export default class VexTimer {
  static globalManager = new VexTimerManager();

  constructor(manager = null) {
    this.manager = manager || VexTimer.globalManager;

    this.time = 0;
    this._timeCounter = 0;
    this.loops = 1;
    this.elapsedLoops = 0;

    this.active = false;
    this.finished = false;
    this.onComplete = null;
  }

  // ----- GETTERS / SETTERS -----

  // Returns the remaining time in seconds, clamped to 0.
  get timeRemaining() {
    return Math.max(0, this.time - this._timeCounter);
  }

  // Returns the progress of the timer as a value between 0 and 1.
  get progress() {
    return this.time > 0 ? Math.min(1, this._timeCounter / this.time) : 0;
  }

  // Returns the number of loops remaining.
  get loopsRemaining() {
    if (this.loops === 0) return Infinity; // 0 loops means infinite loops.
    return Math.max(0, this.loops - this.elapsedLoops);
  }

  // Returns true if the timer is paused, false otherwise.
  get pausedTimer() {
    return !this.active;
  }

  /**
   * Sets the paused state of the timer.
   * @param {Boolean} value - True to pause the timer, false to resume it.
   */
  set pausedTimer(value) {
    this.active = !value;
  }

  // Returns the total elapsed time since the timer started, including loops.
  get elapsedTime() {
    return this._timeCounter;
  }

  // ----- PUBLIC METHODS -----

  /**
   * Starts the timer with the specified params.
   *
   * @param {Number} time - The time to count down from.
   * @param {Function} onComplete - The callback to invoke when the timer completes.
   * @param {Number} loops - The number of times to loop the timer (default is 1).
   * @returns {VexTimer} The timer instance for chaining.
   */
  start(time = 1, onComplete = null, loops = 1) {
    this.time = Math.abs(time);
    this.onComplete = onComplete;
    this.loops = Math.max(0, loops);

    this.active = true;
    this.finished = false;
    this._timeCounter = 0;
    this.elapsedLoops = 0;

    this.manager.add(this);
    return this;
  }

  /**
   * Resets the timer to its initial state.
   *
   * @param {Number} newTime - The new time to count down from.
   * @returns {VexTimer} The timer instance for chaining.
   */
  reset(newTime = -1) {
    if (newTime >= 0) this.time = newTime;

    this.active = true;
    this.finished = false;
    this._timeCounter = 0;
    this.elapsedLoops = 0;

    this.manager.add(this);
    return this;
  }

  /**
   * A static shortcut to create and start a one-shot timer.
   *
   * @param {Number} time - The time to count down from in seconds.
   * @param {Function} onComplete - The callback that triggers when the timer completes.
   * @returns {Promise} A promise that resolves when the timer completes.
   */
  static wait(time, onComplete = null) {
    if (onComplete) {
      return new VexTimer().start(time, onComplete, 1);
    }

    // Allows: await VexTimer.wait(1);
    return new Promise((resolve) => {
      new VexTimer().start(time, resolve, 1);
    });
  }

  // Cancels the timer, stopping it and removing it from the manager.
  cancel() {
    this.active = false;
    this.finished = true;
    this.manager.remove(this);
  }

  // Stops the timer without marking it as finished.
  stop() {
    this.cancel();
  }

  update(dt) {
    if (!this.active || this.finished) return;

    this._timeCounter += dt;

    while (this._timeCounter >= this.time && this.active && !this.finished) {
      this._timeCounter -= this.time;
      this.elapsedLoops++;

      if (this.onComplete) this.onComplete(this);

      if (this.loops > 0 && this.elapsedLoops >= this.loops) {
        this.finished = true;
        this.cancel();
        break;
      }
    }
  }

  // Destroys the timer, canceling it and clearing the onComplete callback.
  destroy() {
    this.cancel();
    this.onComplete = null;
  }
}
