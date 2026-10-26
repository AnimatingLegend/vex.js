# `VexCamera.js`

Controls which part of the world is visible. It handles scrolling, zoom, following a target, and screen flash and fade effects. `VexGame` creates one for you, available as `VexGlobal.camera`.

## Properties

| Name              | Type      | Default     | Description                                       |
| ----------------- | --------- | ----------- | ------------------------------------------------- |
| `width`, `height` | number    | canvas size | The size of the view.                             |
| `scroll`          | `{x, y}`  | `{0, 0}`    | The world position at the top-left of the screen. |
| `zoom`            | number    | `1`         | Zoom level. Values above 1 zoom in.               |
| `target`          | VexSprite | `null`      | The object being followed.                        |
| `followMode`      | string    | `"lock"`    | `"lock"` or `"lerp"`. Set by `follow()`.          |
| `followLerp`      | number    | `0.1`       | Chase speed in `"lerp"` mode. Set by `follow()`.  |
| `deadzone`        | object    | `null`      | Not implemented yet. Setting it has no effect.    |

## Methods

- **`follow(target, options = {})`**: Starts following an object, centering it on screen.

| Option     | Default  | Description                                                                                                                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | `"lock"` | `"lock"` pins the camera to the target. `"lerp"` eases toward it.                                                                                                              |
| `lerp`     | `0.1`    | In `"lerp"` mode, the fraction of the remaining distance closed per frame at 60 updates per second. Lower is laggier, higher is snappier. The easing is framerate independent. |
| `deadzone` | `null`   | Reserved. Not implemented yet.                                                                                                                                                 |

- **`flash(color = "#ffffff", duration = 0.5, onComplete = null)`**: Covers the screen in a color and fades it out over `duration` seconds. `onComplete` runs when it finishes.

- **`fade(color = "#000000", duration = 0.5, fadeIn = false, onComplete = null)`**: Fades the screen to `color` over `duration` seconds. With `fadeIn` set to true, it starts fully covered and fades away instead. `onComplete` runs when it finishes.

- **`update(dt)`, `applyTransform(ctx)`, `restoreTransform(ctx)`, `drawOverlays(ctx)`**: Called by `VexGame` every frame. Don't call them yourself.

## Example

```js
VexGlobal.camera.follow(this.player, { mode: "lerp", lerp: 0.05 });
VexGlobal.camera.fade("#000000", 0.5, true); // Fade in at the start.
VexGlobal.camera.flash("#ffffff", 0.15); // Quick flash on a hit.
```

See "[**The camera**](../concepts/camera.md)" and "[**Camera follow modes and transitions**](../guides/camera-follow-modes.md)".
