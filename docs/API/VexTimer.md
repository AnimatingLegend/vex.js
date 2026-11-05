# `VexTimer.js`

Calls a function after a delay, either once or repeatedly. Timers run on game time, so they follow the game loop's fixed timestep. Create one wherever you need a delay, and **[`VexGame`](./VexGame.md)** advances it every update.

## Constructor

**`new VexTimer(manager = null)`**:

Most of the time you pass nothing. The timer joins `VexTimer.globalManager`, which `VexGame` updates every frame. To control a group of timers yourself, pass your own [`VexTimerManager`](VexTimerManager.md).

## Properties

| Name           | Type               | Default            | Description                                                          |
| -------------- | ------------------ | ------------------ | -------------------------------------------------------------------- |
| `time`         | number             | `0`                | Seconds between callbacks. Set by `start()`.                         |
| `loops`        | number             | `1`                | How many times the timer fires. `0` means forever. Set by `start()`. |
| `elapsedLoops` | number             | `0`                | Loops completed so far.                                              |
| `active`       | boolean            | `false`            | True while the timer is running.                                     |
| `finished`     | boolean            | `false`            | True once the last loop is done or the timer is cancelled.           |
| `onComplete`   | function or `null` | `null`             | Called each time the timer fires, with the timer as its argument.    |
| `manager`      | VexTimerManager    | the global manager | The manager that updates this timer.                                 |

These getters report progress:

| Name             | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `timeRemaining`  | Seconds until the next callback.                            |
| `elapsedTime`    | Seconds counted so far in the current loop.                 |
| `loopsRemaining` | Loops left, or `Infinity` for an endless timer.             |
| `progress`       | How far through the current loop the timer is, from 0 to 1. |

`pausedTimer` can be read and written. It's true while the timer is paused (`active` is false). Set it to `true` to pause and `false` to resume.

## Methods

- **`start(time = 1, onComplete = null, loops = 1)`**: Starts the timer and returns it. If the timer is already running, it restarts from zero.

| Parameter    | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `time`       | Seconds to wait before each callback.                                |
| `onComplete` | A function to call each time the timer fires. It receives the timer. |
| `loops`      | How many times to fire. `0` repeats until you cancel it.             |

- **`reset(newTime = -1)`**: Restarts the timer from zero with the same callback and loop count. Pass `newTime` (in seconds) to change the delay, or leave it out to keep the current one. Returns the timer.

- **`cancel()`**: Stops the timer without calling `onComplete`. `finished` becomes true, and the timer is removed from its manager. You can start it again with `start()`.

- **`stop()`**: An alias for `cancel()`.

- **`destroy()`**: Cancels the timer and releases its callback. Use it when you're done with a timer for good.

- **`update(dt)`**: Advances the timer. Called by its manager, so you don't need to call it yourself.

- **`VexTimer.wait(time, onComplete = null)`**: Static. A shortcut for a one-shot timer.
  - With a callback, it starts the timer and returns it.
  - Without one, it returns a promise that resolves when the timer completes, so you can write `await VexTimer.wait(1)` inside an async function.

  If the timer is cancelled before it completes, for example because the state switched, the promise never resolves and the code after the `await` doesn't run.

- **`VexTimer.globalManager`**: Static. The shared **[`VexTimerManager`](VexTimerManager.md)** that timers join by default.

## Behavior to know

- **Callbacks run during the update.** If the delay is shorter than one update step, the callback fires several times in the same update.
- **Inside the last callback, `finished` is still false.** It becomes true right after the callback returns. To detect the last loop, check `timer.loopsRemaining === 0`.
- **A `time` of `0` fires once per update.**
- **Timers on the global manager are cancelled when you switch states**, so a callback never fires into a state that no longer exists.
- **Timers keep running while a substate is open**, such as a pause menu. To freeze them, set `pausedTimer = true`, or use a manager you've added to the state. See [VexTimerManager](VexTimerManager.md).

## Example

```js
// Run once, after two seconds.
new VexTimer().start(2, () => {
  console.log("Two seconds later");
});

// Run five times, half a second apart.
new VexTimer().start(
  0.5,
  (timer) => {
    console.log(`${timer.elapsedLoops} of 5`);
  },
  5,
);

// Run every second until cancelled.
const spawner = new VexTimer().start(1, () => spawnEnemy(), 0);
spawner.cancel();

// Wait inside an async function.
async function intro() {
  await VexTimer.wait(1.5);
  console.log("Go!");
}
```

See the "[**timers guide**](../guides/timers.md)".
