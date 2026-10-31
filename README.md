<div class="heading" align="center">
<h1> VEX.js </h1>

<p align="center">
  <a href="LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://www.npmjs.com/package/vex.js"><img src="https://img.shields.io/npm/v/vex.js.svg" alt="npm version"></a>
  <a href="docs/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>
</div>

**V**ector **E**lement **X**pansion (**VEX**) is a lightweight, modular 2D game engine for JavaScript inspired by **[HaxeFlixel](https://haxeflixel.com)**. Vex provides a fixed-timestep game loop, physics-driven sprites, object pooling, a full camera system, frame animations, easing curves, and audio management.

> [!NOTE]
> **This library is a native ES module with zero build steps required**.

## ✨ Features

- ⏱️ **Fixed-Timestep Game Loop**: Deterministic updates keep physics consistent across 60Hz, 144Hz, or variable-refresh displays.
- 👾 **Physics & Collision**: Velocity, acceleration, drag, and axis-aligned collision resolution with corner landing priority.
- 🎬 **Animations & Atlases**: Spritesheet and texture atlas support (Sparrow XML and JSON Hash) with frame-based animation control.
- 🏊 **High-Performance Pooling**: Built-in `VexGroup` recycling prevents garbage collection spikes during high-volume action.
- 🎥 **Dynamic Camera**: Framerate-independent lerp target tracking, screen shake, flash, fade transitions, and parallax scrolling.
- 💥 **Particle System**: Reusable, pool-backed particle emitters with configurable spread, velocity, and auto-fading.
- 📈 **Tweens & Easing**: Smooth property tweens with `sine`, `bounce`, `quad`, `cubic`, and `linear` curves.
- 🔤 **Text & HUDs**: Chainable canvas text builder (`setColor`, `setFont`, `setAlign`) with fixed screen-space pinning.
- 📦 **Zero-Config ESM**: Import directly into the browser via native ES Modules or bundle with modern tools.

## 📦 Installation

Install via NPM:

```bash
npm install vex.js
```

Or import directly in modern browsers via native ES Modules:

```html
<script type="module">
  import { VexGame, VexState, VexSprite } from "./index.js";
</script>
```

## 🚀 Quick Start

```javascript
import { VexGame, VexState, VexSprite, VexGlobal } from "vex.js";

class PlayState extends VexState {
  create() {
    // Create a player sprite with chainable setters
    this.player = new VexSprite()
      .makeGraphic(32, 32, "#4488ff")
      .setPosition(100, 100);

    this.player.drag.x = 800;
    this.player.maxVelocity.x = 200;
    this.add(this.player);

    // Follow the player with smooth camera lerping
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

// Initialize and start the game
const game = new VexGame({
  width: 640,
  height: 480,
  container: "#game-container",
  initialState: new PlayState(),
});
game.start();
```

## 📚 Documentation

> [!IMPORTANT]
> **The complete documentation is organized in the [`docs/`](./docs/) directory:**

| Section                                           | Description                                                                                                                                                                                                                          |
| :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🚀 **[Getting Started](docs/GETTING_STARTED.md)** | Step-by-step tutorial to setting up your first Vex.js game project.                                                                                                                                                                  |
| 🧠 **[Game Concepts](docs/CONCEPTS/)**            | In-depth breakdowns of the [Game Loop](docs/CONCEPTS/game-loops.md), [States](docs/CONCEPTS/states.md), [Sprites](docs/CONCEPTS/sprites-n-objects.md), [Groups](docs/CONCEPTS/groups.md), and the [Camera](docs/CONCEPTS/camera.md). |
| 📖 **[API Reference](docs/API/)**                 | Class specifications and method references for [`VexGame`](docs/API/VexGame.md), [`VexSprite`](docs/API/VexSprite.md), [`VexAtlas`](docs/API/VexAtlas.md), [`VexCamera`](docs/API/VexCamera.md), and more.                           |
| 🛠️ **[Guides & Recipes](docs/GUIDES/)**           | Walkthroughs for [Platformer Collision](docs/GUIDES/platormer-collision.md), [Particle Bursts](docs/GUIDES/platormer-collision.md), and [Sprite Atlases](docs/GUIDES/sprite-atlases).                                                |

## 🎮 Interactive Demos

Run the local demo suite to explore features in action:

```bash
git clone https://github.com/AnimatingLegend/vex.js.git
cd vex.js
npm install
npm run dev
```

| Demo Scene       | Location         | Highlights                                              |
| :--------------- | :--------------- | :------------------------------------------------------ |
| **Platformer**   | `test/gameplay/` | Movement, jumping, collision, landing dust particles    |
| **Tweens**       | `test/tweens/`   | Interactive easing comparisons (`sine`, `bounce`, etc.) |
| **Text & Mouse** | `test/text/`     | HUD text builder, mouse bounds queries, click effects   |
| **Tilemap**      | `test/tilemap/`  | CSV map loading, camera culling, world boundaries       |
| **Sound**        | `test/sound/`    | Audio playback, looping music tracks, volume fades      |

## 🤝 Contributing

Contributions, Bug Reports, & Suggestions are welcome!

- **[Contributing Guidelines](docs/CONTRIBUTING.md)**: PR Workflows, Issue templates, & Branch Rules.
- **[Code Style Guide](docs/CODE_STYLE_GUIDE.md)**: Formatting Standards, Linting, & Naming Conventions.

## 📄 License

Vex.js is open-source software licensed under the **[MIT License](LICENSE.md)**.
