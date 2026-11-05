# `VexTimerManager.js`

Holds a group of timers and advances them. **[`VexTimer`](./VexTimer.md)** creates timers on a shared global manager by default, and **[`VexGame`](./VexGame.md)** updates it every frame, so you rarely touch this class directly.

Extends **[`VexBasic`](./VexBasic.md)**.

## Constructor:

**`new VexTimerManager()`**

## Properties

| Name     | Type  | Description                          |
| -------- | ----- | ------------------------------------ |
| `timers` | array | The timers currently in the manager. |

**`VexTimer.globalManager`**: The shared manager that timers join by default

## Methods

- **`add(timer)`**: Adds a timer. Does nothing if it's already in the manager. `start()` does this for you.

- **`remove(timer)`**: Removes a timer without cancelling it. Finished and cancelled timers remove themselves.

- **`clear()`**: Cancels every timer and empties the manager. Callbacks don't fire.

- **`update(dt)`**: Advances every timer. Timers can start or cancel other timers from their callbacks safely.

## Using your own manager

A custom manager lets your group timers and control them together. Add it to a state, and it updates with the state:

```js
create() {
  this.tmrs = new VexTimerManager();
  this.add(this.tmrs);

  new VexTimer(this.tmrs).start(5, () => this._explode());
}
```

Because the manager is part of the state, its timers freeze while a substate such as a pause menu is open, and they resume when it closes. Timers on a manager you created aren't cleared by state switches. They're cleaning up when the state destroys the manager, or you can call `clear()` yourself.
