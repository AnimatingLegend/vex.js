import VexBasic from "../../core/VexBasic.js";

/**
 * @file VexTimerManager.js
 * @description Manages a collection of timers, allowing for their addition, removal & update.
 */
export default class VexTimerManager extends VexBasic {
  constructor() {
    super();
    this.timers = [];
  }

  // Add a timer to the manager if it is not already present.
  add(timer) {
    if (!this.timers.includes(timer)) this.timers.push(timer);
  }

  // Remove a timer from the manager if it is already present.
  remove(timer) {
    const index = this.timers.indexOf(timer);
    if (index !== -1) this.timers.splice(index, 1);
  }

  update(dt) {
    // Snapshot loop to safely handle callbacks that add/cancel timers.
    const activeTimers = [...this.timers];
    for (const timer of activeTimers) {
      timer.update(dt);
    }
  }

  // Cancel all present timers and clear the manager.
  clear() {
    for (const timer of [...this.timers]) timer.cancel();
    this.timers.length = 0;
  }
}
