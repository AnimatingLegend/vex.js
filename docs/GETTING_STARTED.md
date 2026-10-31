# Getting Started!

Welcome to Vex.js! This mini guide will help you get situated with the engine, and how it works; and by the end of this page, you will have a square canvas where you can move around with your arrow keys!

## Vex.js Requirements, & Installation

Read the **[Contributing Guide](./CONTRIBUTING.md)** to get a more into depth guide on how to install Vex.js and the engines dependencies.

## Run the demo

Start the dev server from the repository root:

```bash
npm run dev
```

Open the address it prints (`http://localhost:3000`), then go to `test/` to see your demo `my-game/`.

## Building your first game

In order to build your first game, you will need to create a new folder inside the `test/` directory of this repository.

### Example:

```bash
test/my-game/
```

### 1. Create the page

Create `my-game/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vex.js - My First Game!</title>
    <style>
      body {
        background: #111;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      canvas {
        background: #222;
        image-rendering: pixelated;
        border: 2px solid #444;
      }
    </style>
  </head>
  <body>
    <canvas id="vex-canvas"></canvas>
    <script type="module">
      import VexGame from "../../source/VexGame.js";
      import PlayState from "./PlayState.js";

      const canvas = document.getElementById("vex-canvas");
      const vexGame = new VexGame({
        width: 640,
        height: 480,
        canvas,
        initialState: new PlayState(),
      });
      vexGame.start();
    </script>
  </body>
</html>
```

A few things to notice:

- The canvas has no `width` or `height`, `VexGame` sets that for you.
- The script uses `type="module"`. Without it, the browser rejects the `import` line `PlayState.js` which is needed!
- The canvas uses `outline` instead of `border`. The reason for this is because borders add extra pixels to the canvas element and shifts the mouse coordinates, while outline doesn't.

### 2. Create your State

A state is your current game scene, like a menu or a level. Create `my-game/PlayState.js` and add a state with one sprite:

```js
import { VexGame, VexGlobal, VexSprite, VexState } from "../index.js";

class PlayState extends VexState {
  create() {
    this.player = new VexSprite()
      .makeGraphic(32, 32, "#ffffff")
      .setPosition(304, 224);
    this.add(this.player);
  }

  update(dt) {
    super.update(dt);
  }
}
```

`create()` runs once, when the state starts. `makeGraphic()` gives the sprite a solid-color rectangle (width, height, color). `this.add()` registers the sprite with the state, so it's updated and drawn every frame. Without that call, the sprite exists but never really appears.

The position `(304, 224)` puts a 32x32 square in the middle of a 640x480 canvas.

### 3. Make the square move

Replace the `update()` method in `PlayState` with this:

```js
update(dt) {
  var speed = 200;
  this.player.velocity.x = 0;
  this.player.velocity.y = 0;

  if (VexGlobal.keys.pressed("ArrowLeft")) this.player.velocity.x = -speed;
  if (VexGlobal.keys.pressed("ArrowRight")) this.player.velocity.x = speed;
  if (VexGlobal.keys.pressed("ArrowUp")) this.player.velocity.y = -speed;
  if (VexGlobal.key.pressed("ArrowDown")) this.player.velocity.y = speed;

  // Set velocity first, so the move is applied on the same frame!
  super.update(dt);
}
```

`dt` (delta time) is the time since the last update, in seconds. A velocity of 200 moves, is the sprite moving 200 pixels per second! `VexGlobal.keys.pressed()` takes `KeyboardEvent.code` values such as "`ArrowLeft`", "`KeyA`", and "`Space`".

### The Finished product

This is what your code should look like:

```js
import { VexGame, VexGlobal, VexSprite, VexState } from "../index.js";

class PlayState extends VexState {
  create() {
    this.player = new VexSprite()
      .makeGraphic(32, 32, "#ffffff")
      .setPosition(304, 224);
    this.add(this.player);
  }

  update(dt) {
    var speed = 200;
    this.player.velocity.x = 0;
    this.player.velocity.y = 0;

    if (VexGlobal.keys.pressed("ArrowLeft")) this.player.velocity.x = -speed;
    if (VexGlobal.keys.pressed("ArrowRight")) this.player.velocity.x = speed;
    if (VexGlobal.keys.pressed("ArrowUp")) this.player.velocity.y = -speed;
    if (VexGlobal.keys.pressed("ArrowDown")) this.player.velocity.y = speed;

    // Set velocity first, so the move is applied on the same frame!
    super.update(dt);
  }
}
```

### What you just used

- **`VexGame`**: Owns the canvas & runs the game loop.
- **`VexState`**: Is your game scene. Everything you `add()`, to it, will be updated and drawn every frame.
- **`VexSprite`**: Is a moveable, drawable object. Its `velocity` moves it, & `makeGraphic()` give it a color, and makes it visible.
- **`VexGlobal`**: Is shared access to input, screen size, & the canvas.

### Troubleshooting

- **`cannot use import statement outside a module`**: add `type="module"` to the script tag in `index.html`.
- **404 errors for Vex files in the browser console**: The `dev` server must serve the repository root, and your import must point to `index.js` in that root (`../index.js` from inside `my-game/`).
- **Nothing loads when you open `index.html` directly**: browsers block ES Modules on pages opened from disk. Use the `dev` server instead.

### What's next?

- Read **[The Game Loop](./CONCEPTS/game-loops.md)** and the rest of **[The Concepts](./CONCEPTS/)** to see how the pieces fit together.
- Look up any class in the **[API reference](./API/)**.
  Follow a guide for common tasks like collision, particles, and camera effects.
- Open the demo source in `test/` for a fuller example with gravity, platforms, a following camera, and particle effects.
