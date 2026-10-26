# Camera follow Modes & Transitions

How to choose between a locked camera and a smoothed one, and how to use fades and flashes for transitions and impact.

## Locked Cameras

The camera stays exactly on the target. Movement feels tight and precise, the way classic platformers do:

```js
VexGlobal.camera.follow(this.player);
```

This is the default. It's the same as passing `{ mode: lock }`.

## Smoothed Cameras

The camera eases toward the target and lags slightly behind when it moves fast:

```js
VexGlobal.camera.follow(this.player, { mode: "lerp", lerp: 0.1 });
```

`lerp` is the fraction of the remaining distance the camera closes each frame, at 60 updates per second:

| Value           | Feel                                 |
| --------------- | ------------------------------------ |
| `0.02` - `0.05` | Slow and floaty, with a lot of lag.  |
| `0.1`           | Gentle chase. A good starting point. |
| `0.3` & beyond  | Snappy, with barely visible lag.     |

The easing is framerate independent, so it feels the same whatever the update rate is.

## Switching modes

Call `follow()` again with different options. For example, to go smooth during a cutscene and lock for gameplay:

```js
VexGlobal.camera.follow(this.player {mode: "lerp", lerp: 0.04}); // Cutscene
VexGlobal.camera.follow(this.player); // In game.
```

### Fade in at the start of a state:

```js
create() {
  VexGlobal.camera.fade("#000000", 0.5, true); // True = start
}
```

### Fade out & Switch States:

```js
VexGlobal.camera.fade("#000000", 0.5, false () => {
  VexGlobal.switchState(new GameState());
});
```

The screen stays covered after the fade ends. The new state should fade in from black in its `create()`, as shown above, or screen stays black.

### Flash on impact:

```js
VexGlobal.cameara.flash("#ffffff", 0.15); // Short white flash.
VexGlobal.camera.flash("#ff0000", 0.3); // Red flash for taking damage.
```
