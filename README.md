# Vex.js

> **Vector Element Xpansion**: A lightweight, modular 2D game engine for JavaScript inspired by **[HaxeFlixel](www.haxeflixel.com)**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/vex.js.svg)](https://www.npmjs.com/package/vex.js)

Vex provides a fixed-timestep game loop, physics-driven sprites, object pooling, a full camera system, frame animations, easing curves, and audio management.

> [!NOTE]
> **This is a native ES module with zero build steps required**.

---

## Features

- ⏱️ **Fixed-Timestep Game Loop**: Deterministic updates keep physics consistent across 60Hz, 144Hz, or variable-refresh displays.
- 👾 **Physics & Sprites**: Position, velocity, acceleration, drag, axis-aligned collision resolution, and point queries (`containsPoint(x, y)`).
- 🏊 **Object Pooling (`VexGroup`)**: Built-in recycling system prevents garbage collection spikes during high-volume bursts.
- 🎥 **Camera System** (`VexCamera` / `VexGlobal`): Framerate-independent lerp following, screen shake, flash, fade transitions, and parallax scroll factors.
- 📈 **Tweening & Easing (`VexTween` / `VexEase`)**: Smooth tween animations featuring `linear`, `quad`, `cubic`, `sine`, and `bounce` curves.
- 💥 **Particle Emitter**: Reusable, pool-backed particle systems with configurable lifespans, colors, and alpha fades.
- 🔤 **Text & HUDs**: Canvas-rendered text with chainable builder syntax (`setColor`, `setFont`, `setAlign`) and fixed screen-space rendering.
- 🗺️ **Tilemaps**: Fast CSV-based tilemap rendering with camera culling.
- 📦 **Zero-Config ESM**: Import directly in the browser or bundle with Vite, Webpack, Rollup, or esbuild.

---

## 📦 Installation

```bash
npm install vex.js
```

Or clone the repository to run locally:

```bash
git clone https://github.com/AnimatingLegend/VexJS.git
cd VexJS
npm install
npm run dev
```

---

## 🚀 Quick Start

```javascript
import { VexGame, VexState, VexSprite, VexGlobal } from "vex.js";

class PlayState extends VexState {
  create() {
    // Create a player sprite with chainable setters
    this.player = new VexSprite()
      .makeGraphic(32, 32, "#ff4444")
      .setPosition(100, 100);

    this.player.drag.x = 800;
    this.player.maxVelocity.x = 200;
    this.add(this.player);

    // Follow with camera
    VexGlobal.camera.follow(this.player, { mode: "lerp", lerp: 0.1 });
  }

  update(dt) {
    super.update(dt);

    // WASD and Arrow key input
    if (VexGlobal.keys.pressed("KeyA") || VexGlobal.keys.pressed("ArrowLeft")) {
      this.player.acceleration.x = -800;
    } else if (
      VexGlobal.keys.pressed("KeyD") ||
      VexGlobal.keys.pressed("ArrowRight")
    ) {
      this.player.acceleration.x = 800;
    } else {
      this.player.acceleration.x = 0;
    }
  }
}

// Boot the game
const game = new VexGame({
  width: 640,
  height: 480,
  container: "#game-container",
  initialState: new PlayState(),
});
game.start();
```

---

## 🎮 Interactive Demo Scenes

Explore the interactive test demos in the `test/` directory by running `npm run dev`:

| Demo             | Path             | Description                                                                       |
| :--------------- | :--------------- | :-------------------------------------------------------------------------------- |
| **Gameplay**     | `test/gameplay/` | Platformer movement, jumping, sprinting, platform collision, and landing dust     |
| **Tweens**       | `test/tweens/`   | Live side-by-side comparison of `sineIn`, `sineOut`, `sineInOut`, and `bounceOut` |
| **Text & Mouse** | `test/text/`     | Chainable HUD text, point-in-bounds click detection, and burst particles          |
| **Tilemap**      | `test/tilemap/`  | CSV map loading, camera culling, and world bounds                                 |
| **Sound**        | `test/sound/`    | Audio playback, looping music, and volume fades                                   |

---

## 📖 API Overview

Vex.js is built around modular, focused classes inspired by the Flixel architecture:

| Module                                                                              | Description                                                                                                                                                |
| :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[`VexGame`](source/VexGame.js)**                                                  | Initializes the canvas, input listeners, and orchestrates the fixed-timestep game loop.                                                                    |
| **[`VexState`](source/VexState.js)**                                                | Represents a game scene or screen. Supports child overlays via `openSubState()` and `closeSubState()`.                                                     |
| **[`VexBasic`](source/VexBasic.js)**                                                | Base class providing core lifecycle flags (`exists`, `alive`, `active`, `visible`) and hooks (`update`, `draw`, `kill`, `revive`).                         |
| **[`VexObject`](source/VexObject.js)**                                              | Extends `VexBasic` with 2D physics (`velocity`, `acceleration`, `drag`, `maxVelocity`), collision resolution, and point checks (`containsPoint()`).        |
| **[`VexSprite`](source/VexSprite.js)**                                              | Visual entities supporting images, colors, spritesheet animations, axis flipping (`flipX`, `flipY`), and chainable setters (`setPosition()`, `setSize()`). |
| **[`VexGroup`](source/VexGroup.js)**                                                | Object container and high-performance pooling manager with automatic recycling (`recycle()`, `getFirstAlive()`, `countDead()`).                            |
| **[`VexCamera`](source/VexCamera.js)**                                              | Viewport controller featuring framerate-independent target tracking (`follow()`), parallax scroll factors, screen `fade()`, and `flash()`.                 |
| **[`VexTween`](source/tweens/VexTween.js) / [`VexEase`](source/tweens/VexEase.js)** | Tween manager and reusable easing curves (`sineIn`, `sineOut`, `sineInOut`, `bounceOut`, `quad`, `cubic`, `linear`).                                       |
| **[`VexEmitter`](source/effects/particles/VexEmitter.js)**                          | Pool-backed particle bursts with customizable particle colors, lifespans, and alpha fades.                                                                 |
| **[`VexText`](source/text/VexText.js)**                                             | Canvas text rendering with HUD screen-space pinning and chainable builder methods (`setColor()`, `setFont()`, `setAlign()`).                               |
| **[`VexSound`](source/sound/VexSound.js)**                                          | Audio wrapper with playback control, looping, and volume fading.                                                                                           |
| **[`VexSignal`](source/VexSignal.js)**                                              | Lightweight event dispatcher supporting `add()`, `addOnce()`, `dispatch()`, and `hasListeners`.                                                            |
| **[`VexGlobal`](source/VexGlobal.js)**                                              | Shared engine singleton providing access to keyboard (`keys`), mouse (`mouse`), the active camera, and scene switching (`switchState()`).                  |

---

## 🛠️ Scripts

- `npm run dev` / `npm start`: Start the local development server to test demos
- `npm test`: Run the Vitest unit test suite
- `npm run lint`: Lint code using ESLint
- `npm run fmt`: Format files using Prettier

---

## Documentation

- 🤝 **[Contributing Guidelines](docs/CONTRIBUTING.md)**: Pull request workflow, issue templates, and branch rules.
- 🎨 **[Code Style Guide](docs/CODE_STYLE_GUIDE.md)**: Formatting standards, linting, and naming conventions.
- 📄 **[MIT License](LICENSE.MD)**: animatinglegend.github.io © 2026
