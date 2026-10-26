# Vex.js Documentation

Guides and references for Vex.js, a lightweight 2D game engine for desktop, and browsers.

## Table of Contents

- **[Getting Started](#getting-started)**
- **[Game Concepts](#game-concepts)**
- **[API References](#api-references)**
- **[Guides](#guides)**
- **[Contributing](#contributing)**

## [Getting Started](./GETTING_STARTED.md)

- Learn how to install Vex.js, test demos, & build your first game!

## [Game Concepts](./CONCEPTS/)

How the pieces of the engine fit together. Read these in chronological order if you're a new user:

- **[The Game Loop](./CONCEPTS/game-loops.md)**: Fixed Timesteps, which runs for each frame using `dt` (delta time).
- **[States](./CONCEPTS/states.md)**: Game Scenes, switching between them, & substates.
- **[Sprites & Objects](./CONCEPTS/sprites-n-objects.md)**: Motion, Graphics, Animation & Lifecycle Flags.
- **[Groups](./CONCEPTS/groups.md)**: Collections of Objects & Object Pooling.
- **[The Camera](./CONCEPTS/camera.md)**: Scrolling, Following, Zoom & Screen Effects.

## [API References](./API/)

Every `VexClass`, with its properties and methods:

### Core

- **[`VexGame`](./API/VexGame.md)**: The Canvas, The Loop, & you're First State.
- **[`VexState`](./API/VexState.md)**: Your current Game Scene.
- **[`VexBasic`](./API/VexBasic.md)**: The base class with Lifestyle Flags.
- **[`VexGlobal`](./API/VexGlobal.md)**: Input, Screen Size, The Camera, & The Current State.

### Objects

- **[`VexSprite`](./API/VexSprite.md)**: A moveable, or drawable Object.
- **[`VexObject`](./API/VexSprite.md)**: Motion & Collision base class.
- **[`VexText`](./API/VexText.md)**: Text on the Game Canvas.
- **[`VexAnimationController`](./API/VexAnimationController.md)**: Frame Animation.
- **[`VexAtlas`](./API/VexAtlas.md)**: Sprite Atlas loading.

### World

- **[`VexGroup`](./API/VexGroup.md)**: Collections of Object Pooling.
- **[`VexCamera`](./API/VexCamera.md)**: Scroll, Zoom, Follow, Flash, & Fade.

### Effects & Utilities

- **[`VexEmitter`](./API/VexEmitter.md)**: Particle Bursts.
- **[`VexTween`](./API/VexTween.md)** / **[`VexEase`](./API/VexEase.md)**: Animating Properties over time.
- **[`VexSignal`](./API/VexSignal.md)**: Events

## [Guides](./GUIDES/)

Short walkthroughs for common engine tasks:

- **[Platformer Collision](./GUIDES/platormer-collision.md)**: Gravity, Platforms, & Jumping.
- **[Particle Bursts](./GUIDES/platormer-collision.md)**: Landing dust, Hit Sparks, & Explosions.
- **[Camera Modes & Transitions](./GUIDES/camera-modes-n-transitions.md)**: Locked & Smooth cameras, Fades & Flashes.
- **[Sprite Atlases](./GUIDES/sprite-atlases)**: Load an atlas and play animations frame-by-frame.

## Contributing

- **[Contributing Guide](CONTRIBUTING.md)**: How to report issues, open PRs, and work on the project!
- **[Code Style Guide](CODE_STYLE_GUIDE.md)**: Name comments, Imports, & Argument Formatting.
