# The Game Loop

`VexGame` runs your game with a fixed timestep. Updates always happen in equal slices of time, no matter how fast the screen refreshes, so motion and collisions behave the same on any computer.

## How does a frame work?

Each time the browser is ready to draw, `VexGame`:

- Measures how much real time has passed, capped at `0.25` seconds, so a background tab can't trigger hundreds of catch-up updates.
- Adds that time to an accumulator.
- Runs one update for every full step in the accumulator. (A step is `1 / framerate` seconds... you can do the math!)
- Draws once, using whatever state the updates left behind.

A fast display can draw several times per update, and a slow one can run several updates per draw. Your game logic uses `dt` (delta time) either way!

## What happens in each update?

- **`VexGlobal.state.update(dt)`**: Updates your state and everything in it.
- **`VexGlobal.camera.update(dt)`**: Handles camera following, flashing, and fading.
- **`VexGlobal.updateTweens(dt)`**: Advances active tweens.
- Input flags are cleared, so `justPressed` & `justReleased` last for only one update.

> [!WARNING]
>
> Don't call `VexGlobal.camera.update(dt)` yourself. `VexGame` already does, and a second call makes the camera effects run at double the speed!

## What happens in each draw?

- The canvas is cleared.
- The camera transform (scroll & zoom) is applied.
- The state draws its objects in the world space.
- The transform is removed.
- Camera flash and fade overlays draw on top, covering the whole screen.

## Work with `dt`

`dt` (delta time) is in seconds and is constant (`1 / framerate`). If you move something by hand, multiply by it:

```js
this.x += 100 * dt; // 100 pixels per second.
```

Sprites do this for you! Set `velocity` in pixels per second and the engine applies it.

## Starting & Stopping

`game.start()` begins the loop, and `game.stop` halts it. Set the update rate with the `framerate` option.

```js
new VexGame({ framerate: 30 /* ... */ });
```
