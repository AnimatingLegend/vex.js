# The Camera

The camera decides which part of the world is visible. `VexGame` creates one, and you reach it through `VexGlobal.camera`.

## How does the camera work?

The camera has a `scroll` position (the world coordinate at the top-left of the screen) and a `zoom`. Each frame, `VexGame` applies them as a canvas transform before your state draws. That means objects always live in world space, and you never add the camera offset to their positions yourself.

To convert a mouse position, which is in screen space, to world space:

```js
var worldX =
  VexGlobal.mouse.x / VexGlobal.camera.zoom + VexGlobal.camera.scroll.x;

var worldY =
  VexGlobal.mouse.y / VexGlobal.camera.zoom + VexGlobal.camera.scroll.y;
```

## Following a target

```js
// The camera locks to the player
VexGlobal.camera.follow(this.player);
// The camera smoothly chases the player
VexGlobal.camera.follow(this.player, { mode: "lerp", lerp: 0.1 });
```

- **`"lock"`**: (The Default) Pins the camera to the target with no delay.
- **`"lerp"`**: eases towards the target. `lerp` is the fraction of the remaining distance closed per frame at 60 updates per second. Lower values feel "laggier", and higher values fell "snappier". The easing is framerate independent.

## Screen Effects

```js
// White flash that fades out
VexGlobal.camera.flash("#ffffff", 0.2);
// Fade to black.
VexGlobal.camera.fade("#000000", 0.5);
// Fade in from black.
VexGlobal.camera.fade("#000000", 0.5, true);
```

Both accept an `onComplete` callback. See **[`VexCamera`](../API/VexCamera.md)** for the full signatures.

## HUD Elements

Give an object `scrollFactor = { x: 0, y: 0 }`, and it stays fixed on screen while the camera moves. `VexText` defaults this.
