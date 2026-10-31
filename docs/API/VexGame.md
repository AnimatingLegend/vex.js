# `VexGame.js`

Owns the canvas, runs the fixed-timestep game loop, connects keyboard and mouse input, and starts your first state. Create one per game.

## Constructor

`new VexGame(options)`

| Option         | Type                | Default | Description                                                                                          |
| -------------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `width`        | number              | `480`   | Canvas width in pixels.                                                                              |
| `height`       | number              | `480`   | Canvas height in pixels.                                                                             |
| `canvas`       | `HTMLCanvasElement` | `null`  | The canvas to draw on. If omitted, a canvas is created, but not added to the page, so pass your own. |
| `initialState` | `VexState`          | N/A     | The first state to run. **REQUIRED**                                                                 |
| `framerate`    | number              | `60`    | Updates per second.                                                                                  |

## Properties

| Name     | Type                       | Description                          |
| -------- | -------------------------- | ------------------------------------ |
| `canvas` | `HTMLCanvasElement`        | The canvas being drawn in.           |
| `ctx`    | `CanvasRenderingContext2D` | The canvas 2D context.               |
| `step`   | number                     | Seconds per update, `1 / framerate`. |

## Methods

- **`start()`**: Begins the game loop.
- **`stop()`**: Halts the game loop.

### Example:

```js
var vexgame = new VexGame({
  width: 640,
  height: 480,
  canvas: document.getElementById("game"),
  initialState: new TitleState(),
});

vexgame.start();
```

See "**[The Game Loop](../CONCEPTS/game-loops.md)**" for what happens each frame.
