# Timers

How to run code after a delay, repeat it on a schedule, show a countdown, and pause or cancel timers with **[`VexTimer`](../API/VexTimer)**.

## Run something after a delay:

```js
new VexTimer().start(1.5 () => {
  this.door.kill();
});
```

Use an arrow function, as shown, so `this` still refers to your state inside the callback.

## Repeat a fixed number of timers

The third argument is how many times the timer fires:

```js
new VexTimer().start(
  0.25,
  (tmr) => {
    this._spawnEnemy();
    if (tmr.loopsRemaining === 0) console.log("Wave Complete");
  },
  5,
);
```

`tmr.loopsRemaining` reaches 0 on the last callback, so you can run extra code on the final loop.

## Repeat until you stop it

A loop count of `0` means forever. Keep the timer so you can cancel it:

```js
this.spawner = new VexTimer().start(1, () => this._spawnEnemy(), 0);

// ...

// Later when the wave ends, cancel the timer.
this.spawner.cancel();
```

`cancel()` stops the timer without calling the callback.

## Show a countdown or progress bar

Read `timeRemaining` and `progress` from the timer in your `update()`:

```js
create() {
  this.tmr = new new VexTimer().start(10, () => this._gameOver());
}

update(dt) {
  super.update(dt);

  this.clockTxt.setText(`[TIME] ${Math.ceil(this.tmr.timeRemaining)}`);
  this.bar.scale.x = 1 - this.tmr.progress;
}
```

`progress` goes from 0 to 1 across the current loop, which makes it a good fit for bars and fades.

## Wait inside an async function

`VexTimer.wait()` without a callback returns a promise, so you can write a sequence in order:

```js
async startIntro() {
  await VexTimer.wait(1);
  this.title.visible = true;
  await VexTimer.wait(2);
  VexGlobal.switchState(new MainMenuState());
}
```

If the state switches while a wait is pending, the timer is cancelled and the code after the `await` never runs. That keeps your code from touching a destroyed state.

## Pause n' Resume:

```js
this.tmr.pausedTimer = true; // Pause.
this.tmr.pausedTimer = false; // Resume where you left off.
```

Timers on the global manager keep running while a substate is open. To freeze a group of timers along with the state, put them on a manager you add to the state:

```js
this.tmrs = new VexTimerManager();
this.add(this.tmrs);

new VexTimer(this.tmrs).start(5, () => this._explode());
```

## Restart the timer:

```js
this.tmr.reset(); // Same delay, same callback, same loop count.
this.tmr.reset(3); // Same, but with a 3 second delay.
```

## Switching States

Timers on a global manager are cancelled when you switch states, so their callbacks never fire into a state that has been destroyed. Start your timers in `create()` and you don't need to clean them up.

## Tips / Tricks:

> [!TIP]
>
> - Creating a new timer for each event is fine. Finished timers remove themselves.
> - Keep a reference only to timers you might need to cancel, pause, or read from later.
> - A repeating timer shorter than one update step fires several times in the same update.
