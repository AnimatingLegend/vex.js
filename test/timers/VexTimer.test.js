import { describe, it, expect } from "vitest";
import { VexTimer } from "../../index.js";

/**
 * @file VexTimer.test.js
 * @description Unit tests for the VexTimer and VexTimerManager functionality.
 */
describe("VexTimer", () => {
  it("should complete a one-shot timer and trigger callback", () => {
    var completed = false;

    var timer = new VexTimer().start(1.0, (tmr) => {
      completed = true;
      expect(tmr).toBe(timer);
    });

    expect(timer.active).toBe(true);
    expect(timer.finished).toBe(false);

    // Simuldate 0.5s passing.
    timer.update(0.5);
    expect(timer.progress).toBeCloseTo(0.5);
    expect(timer.timeRemaining).toBeCloseTo(0.5);
    expect(completed).toBe(false);
    console.log("Progress after 0.5s:", timer.progress);

    // Simulate another 0.5s passing.
    timer.update(0.5);
    expect(completed).toBe(true);
    expect(timer.finished).toBe(true);
    console.log("Progress after 1.0s:", timer.progress);
  });

  it("should handle looping timers correctly", () => {
    var loopCount = 0;
    var timer = new VexTimer().start(0.5, () => loopCount++, 3);

    timer.update(0.5); // Loop 1
    expect(loopCount).toBe(1);
    expect(timer.loopsRemaining).toBe(2);
    console.log("Loops remaining after 1st loop:", timer.loopsRemaining);

    timer.update(0.5); // Loop 2
    expect(loopCount).toBe(2);
    expect(timer.loopsRemaining).toBe(1);
    console.log("Loops remaining after 2nd loop:", timer.loopsRemaining);

    timer.update(0.5); // Loop 3 (final)
    expect(loopCount).toBe(3);
    expect(timer.finished).toBe(true);
    console.log("Loops remaining after 3rd loop:", timer.loopsRemaining);
  });

  it("should handle infinite loops when loops = 0", () => {
    var loopCount = 0;
    var timer = new VexTimer().start(0.5, () => loopCount++, 0);

    expect(timer.loopsRemaining).toBe(Infinity);
    timer.update(2.5); // 5 loops
    console.log("Loop count after 2.5s:", loopCount);

    expect(loopCount).toBe(5);
    expect(timer.finished).toBe(false);
    console.log("Loops remaining after 5 loops:", timer.loopsRemaining);

    timer.cancel();
    expect(timer.finished).toBe(true);
    console.log("Timer finished after 5 loops:", timer.finished);
  });

  it("should resolve VexTimer.wait with promises", async () => {
    var promise = VexTimer.wait(0.2);
    expect(promise).toBeInstanceOf(Promise);

    // Fast-forward global manager
    VexTimer.globalManager.update(0.2);
    await expect(promise).resolves.toBeUndefined();

    console.log("Promise resolved after 0.2s");
  });
});
