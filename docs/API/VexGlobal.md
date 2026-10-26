# `VexGlobal.js`

A single shared object for input, screen size, the camera, and the current state. You import it and use it from anywhere. It is not a class, so don't call `new` on it.

| Name      | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `width`   | number      | Canvas width. Set by `VexGame`.              |
| `height`  | number      | Canvas height. Set by `VexGame`.             |
| `camera`  | `VexCamera` | The active camera.                           |
| `state`   | `VexState`  | The current state of your game.              |
| `elapsed` | number      | The `dt` (delta time) of most recent update. |

## Keyboard

`VexGlobal.keys` takes [`KeyboardEvent.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) values such as "`ArrowLeft`", "`KeyA`" and "`Space`".

| Method               | Returns true when                     |
| -------------------- | ------------------------------------- |
| `pressed(code)`      | The key is currently held down.       |
| `justPressed(code)`  | The key went down during this update. |
| `justReleased(code)` | The key came up during this update.   |

## Mouse

`VexGlobal.mouse` reports positions in canvas pixels, scaled to the canvas size even when CSS resizes it. These are screen coordinates, not world coordinates. See
"**[The Camera](../CONCEPTS/camera.md)**" for converting them.

| Name           | Type    | Description                            |
| -------------- | ------- | -------------------------------------- |
| `x`, `y`       | number  | Pointer position over the canvas.      |
| `pressed`      | boolean | A button is held down.                 |
| `justPressed`  | boolean | A button went down during this update. |
| `justReleased` | boolean | A button came up during this update.   |

## Methods

- **`switchState(newState)`**: Destroys the current state and starts `newState`.
- **`loadImage(path)`**: Loads an image and returns a promise for it. Results are cached by path, so loading the same path again reuses the first request.
- **`playSound(path, volume = 1)`**: Plays a sound effect and returns the sound instance. `volume` ranges from `0` - `1`.

### Example:

```js
// Keyboard events
if (VexGlobal.keys.justPressed("Space")) player.velocity.y = -320;

// Mouse events
if (VexGlobal.mouse.justPressed) {
  console.log(VexGlobal.mouse.x, VexGlobal.mouse.y);
}
```
