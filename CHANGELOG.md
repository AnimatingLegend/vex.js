# Changelog

All notable changes to Vex.js are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - [2026-11-05]

**ACTUAL** NPM RELEASE

### Added

- `CI`: Added GitHub Actions workflow to automatically publish package releases to NPM upon release creation.

### Changed

- `Package`: Scoped package name to `@animatinglegend/vex.js` in `package.json`.
- `Chore`: Updated repository clone/installation links in README & CONTRIBUTING docs.

## [1.1.0] - [2026-11-05]

OFFICIAL NPM RELEASE!

### Added

- `VexObject`: New base class for motion and collision. `VexSprite` and `VexText` now extend it.
  - `VexObject.collide(a, b)` resolves overlaps using the new `last`, `touching`, and `immovable` fields.
  - `screenCenter()` centers an object on the X/Y axis.
  - `containsPoint(x, y)` checks whether a point, or an object with `x` and `y`, is inside an object.
- `VexAtlas`: New class for loading sprite atlases from Sparrow `.xml` and TexturePacker `.json` files, cached by path.
- `VexTimer`: New class that can delay and repeating timers with loops, countdown getters, pausing, and a static `wait()`.
- `VexTimerManager`: New class that manages and updates active timers.
  - `VexTimer.globalManager` is updated by `VexGame` every frame.
- `VexGlobal`: `mouse._overlaps(target)` helper for mouse hit checks.
- `VexAnimationController`: `setFrames()`, `addByPrefix()`, and `addByIndices()` for animating from atlas frames.
- `VexSprite`: `frames` getter and setter, and atlas trim offsets (`offsetX`, `offsetY`) applied when drawing.
- `VexSprite`: `flipX` and `flipY` for mirroring, and chainable `setPosition()` and `setSize()`.
- `VexEmitter`: Configurable, pooled particle bursts with `burstParticle()`, speed ranges, gravity, auto-fade, and a pool size limit.
- `VexEmitter`: Color customization for particles.
- `VexTween`: `sineIn`, `sineOut`, `sineInOut`, and `bounceOut` easing curves.
- `VexText`: Chainable builder methods:
  - `setColor()`
  - `setFont()`
  - `setBold()`
  - `setAlpha()`
  - `setAlign()`
- `VexSignal`: `hasListeners` getter.
- `VexGame`: `container` option, used to create and attach a canvas when none is found.
- `Demo`: Endless runner demo. ([`04b490f`](https://github.com/AnimatingLegend/vex.js/commit/04b490f41130679e3222866d6c8957ca39805135)) - by @F4LDR in [#4](https://github.com/AnimatingLegend/vex.js/pull/4)
- `Demo`: Tween demo comparing the new easing curves side by side.
- `Docs`: User documentation in `docs/` with a getting started guide, concepts, an API reference, and how-to guides. ([`0c8c33c`](https://github.com/AnimatingLegend/vex.js/commit/0c8c33cbfb598d4ce2124d39c5db968cf1eeb926)) - by @AaronAugustin & @AnimatingLegend in [#5](https://github.com/AnimatingLegend/vex.js/pull/5).
  - `Docs`: README with features, installation, a quick start, a demo catalog, and API documentation.
- `Package`: `exports` map and expanded keywords for discoverability.
- `Package`: `docs/` included in the published files.
- `Tests`: Unit tests for `VexTimer` and `VexTimerManager`.

### Changed

- **Breaking:** `Source`: Reorganized `source/` into `core/` (`VexGame`, `VexState`, `VexBasic`, `VexGlobal`), `objects/` (entities and animation), and `utils/` (utilities and tweens).
  - `Demo`: Updated the `VexGame` import paths across the test demos.
  - The `index.js` exports are updated.
- **Breaking:** `VexSprite`: `loadGraphic()` is now synchronous and returns the sprite immediately so it can be chained.
- `VexTween`: Easing functions moved into a separate `VexEase` module. (NOTE: `VexTween.Easing` still works.)
- `VexSound`: `VexGlobal.playSound()` no longer builds a sound with `null` audio first.
- `VexEmitter`: Fade easing uses `VexEase` directly.
- `Demo`: Complete Gameplay demo rewrite:
  - WASD alongside the arrow keys + Shift to sprint
  - HUD control instructions
  - A landing dust effect
  - Platform collision through `VexObject.collide()`
  - And a cleaner level and HUD structure.
- `Demo`: Text demo updated to use the builder methods & generic point checks.
- `Docs`: Refreshed the code snippets in the style guide.

### Fixed

- `VexGroup`: `recycle()` now revives the dead members it reuses, making recycled particles and pooled objects update and render again.
- `VexEmitter`: Fixed the value `emit()` returns, `autoFade` scaling, and the `fadeParticle()` tween.

---

## [1.0.3] - [2026-10-07]

### Added

- `VexGroup`: Added the following group members:
  - `getFirstAlive()` - Returns the first active, living member.
  - `getFirstDead` - Returns the first inactive member in the pool.
  - `countDead` - Returns the number of dead pool members.

### Fixed

- `VexState`: `destroy()` now destroys active subState's instead of leaking into a new state.
- `VexGroup`: `recycle()` now guards pool capacity before calling.
- `VexCamera`: Replaced direct `followLerp` multiplication with exponential decay, fixing framerate-dependent camera speed.
- [`test/gameplay/PlayState.js`](./test/gameplay/PlayState.js): Fixed side-collision teleport but falling from a platform.

---

## [1.0.2] - [2026-09-30]

Minor additions and tweaks to [`VexEmitter.js`](/source/effects/particles/VexEmitter.js)!

### Added

- `VexEmitter`: Particles now fade in, and out, via alpha tween over their lifespan instead of disappearing instantly.

```js
// Fade-out
this.particle.fadeParticle(0, 1.5, () => {
  console.log("particle fade-out complete!");
});

// Fade-in
this.particle.alpha = 0;
this.particle.fadeParticle(1, 1.5 () => {
  console.log("particle fade-in complete!");
});
```

### Fixed

- `VexEmitter`: `particle.lifeSpan` now properly assigns the emitter's lifespan to each particle that's currently active.
- `VexEmitter`: `particle.age` now age each frame, and are killed once they reach their lifespan.

---

## [1.0.1] - [2026-09-28]

### Added

- `Docs`: Added [`CONTRIBUTING.md`](./docs/CONTRIBUTING.md) for Issue / PR templates.
- `Docs`: Added [`CODE_STYLE_GUIDE.md`](./docs/CODE_STYLE_GUIDE.md) for contributors.
- `Chore(deps-dev)`: Added project tooling and package metadata.
  - Added `eslint` (`@eslint/js`, `globals`)
  - Added `serve`
  - Added `vitest`
- `VexSprite`: `animation` getter alias for `animationController`.

### Changed

- Added smooth camera lerping to [gameplay demo](./test/gameplay/PlayState.js).
- Clarified code comments in the `source/` directory.

### Fixed

- `CI`: Resolved `YAML` formatting for bug reports.
- `Docs`: Fix a plethora of grammar mistakes in the contribution guide. ([ec5ad92](https://github.com/AnimatingLegend/VexJS/commit/ec5ad929912d1faa0326b4fe16f2eccd170af33d)) - by @F4LDR
- `VexSprite`: `draw()` referenced `this.animation` instead of `this.animationController`.
- `VexSprite`: `draw()` using `frame.w`/`frame.h` instead of `frame.width`/`frame.height`, throwing `DOMException` errors on spritesheet draws.
- `VexSprite`: `anglularAcceleration` typo -> `angularAcceleration`.
- `VexCamera`: Removed duplicate `_flashAlpha` initialization in the constructor.
  - Added the missing `_fadeAlpha` initialization.
- `VexCamera`: Fixed `camera.flash()` timer from resetting every frame, instead of accumulating.
- `VexGlobal`: Mouse coordinates not scaled for CSS-resized canvas's.
- `VexTilemap`: Zoom culling: `endCol` & `endRow` not dividing by `camera.zoom`.

## New Contributors for 1.0.1

- @F4LDR made their first contribution in [ec5ad92](https://github.com/AnimatingLegend/VexJS/commit/ec5ad929912d1faa0326b4fe16f2eccd170af33d)

---

## [1.0.0] - [2026-09-25]

### Added

- `Core`:
  - VexAnimationController
  - VexEmitter
  - VexText
  - VexTilemap
  - VexSound
  - VexTween
  - VexBasic
  - VexCamera
  - VexGame
  - VexGlobal
  - VexGroup
  - VexSignal
  - VexSprite
  - VexState
- `Loop`: Fixed-timestep game loop.
- `Sprite`: Drag-limited acceleration integration for motion.

```js
sprite.acceleration.x = 800;
sprite.drag.x = 600;
sprite.maxVelocity.x = 200;
```

- `Animation`: Spritesheet-based frame animation.

```js
sprite.animation.add("run", [0, 1, 2, 3], 12, true);
sprite.animation.play("run");
```

- `Camera`: Follow, Flash, & Fade functions.

```js
camera.follow(player);
camera.flash(0.2, 0xff0000);
camera.fade(1, 0.5, () => console.log("done"));
```

- `Camera`: Follow Modes - `lock` (instant, Mario-style) & `lerp` (smoothed chase, Sonic-Style).

```js
camera.follow(player); // lock (default)
camera.follow(player, { mode: "lerp", lerp: 0.1 }); // smoothed chase
```

- `Input`: Keyboard/Mouse input via VexGlobal

```js
if (VexGlobal.keys.justPressed("Space")) player.velocity.y = -320;
if (VexGlobal.mouse.justPressed) {
  /* ... */
}
```

- `Tween`: Tween manager with basic easing curves.

```js:
VexTween.tween(sprite, { x: 300 }, 1, { ease: Tween.Easing.quadOut });
```

- `Tilemap`: CSV-based map parsing and camera-culled rendering.

```js
const tilemap = new VexTilemap(0, 0);
await tilemap.loadMapFromCSV(csvData, "tileset.png", 32, 32);
this.add(tilemap);
```

- `Sound`: Background music streaming and volume via `VexSound`.

```js
const music = VexGlobal.playMusic("vexTheme.wav");
if (music !== null) music.fadeIn(2, 0.8);
VexGlobal.stopMusic(2); // Smoothly fades out over 2 seconds.
```

- `PlayState`:
  - [Gameplay Demo](./test/gameplay/PlayState.js) with gravity, platform collision, & camera follow.
  - [Click Counter Demo](./test/text/PlayState.js) with live text rendering, and particle spawning.
  - [Tilemap Demo](./test/tilemap/PlayState.js) with CSV level loading & camera-culled tile rendering.
  - [Sound Demo](./test/sound/PlayState.js) with background music playback, looping, and volume fading.
- `Deps`: `package-lock.json` for reproducible installs.

### Changed

- `CI`: Removed `npm test` from the workflow, (no test suite exists yet; it was running the dev server & hanging.)

### Fixed

- `PlayState(temp)`: Score incrementing on any click instead of only clicks inside the target's sprite's bounds.
- `Camera`: Vertical centering using sprite width instead of height.
- `Sprite`: Draw position double-applying `camera.scroll`, causing drift instead of a locked view.
- `Loop`: Fixed timestep accumulator incrementing instead of decrementing, freezing the game.
- `PlayState`: Inverted platform collision logic causing the player to never fall.
- `Text`: Missing `ctx.fillText()` call in VexText's draw method.
- `CI`: Fixed Node.js CI from failing on every push due to missing `package-lock.json`.
