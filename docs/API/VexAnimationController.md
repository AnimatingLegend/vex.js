# `VexAnimationController.js`

Plays frame animation for a sprite. Every sprite has one, available as `sprite.animation` (or `sprite.animationController`). You don't create it yourself.

Frames come from one of two places:

- **A grid**: `loadGraphic(path, frameWidth, frameHeight)` slices the image into equal frames, numbered left to right and top to bottom. starting at `-`.
- **An atlas**: Assign a `VexAtlas` to `sprite.frames`, or call `setFrame()`. Each frame then has a name, so you can build animations from name prefixes.

## Properties

| Name           | Type                                | Description                                               |
| -------------- | ----------------------------------- | --------------------------------------------------------- |
| `currentFrame` | `{ x, y, width, height }` or `null` | The frame rectangle currently being drawn.                |
| `finished`     | boolean                             | True once a non-looping animation reaches its last frame. |

## Methods

| Parameter   | Description                      |
| ----------- | -------------------------------- |
| `name`      | The name you'll play it by.      |
| `frames`    | An array of frame numbers.       |
| `frameRate` | Frames per second.               |
| `looped`    | Whether to repeat the animation. |

- **`add(name, frame, frameRate = 12, looped = true)`**: Defines an animation from a list of frame numbers.
- **`addByPrefix()`**: Defines an animation from every atlas frame whose name starts with "`prefix`"., in the order they appear in the atlas:

```js
sprite.animation.addByPrefix("hero_run", "hero_run_anim", 24, true);
```

Choose a prefix that matches ONLY the frames you want. `"hero_idle"` also matches `"hero_idle_anim0000"`.

- **`addByIndices(name, prefix, indices, postFix = "", framerate=30, looped = true)`**: Defines an animation from selected frames. First the frames whose names start with "`prefix`" (and end with "`postFix`") are collected. Then `indices` picks from that list, counting from `0`. Use it to reorder frames, skip some, or play only part of a sequence:

```js
sprite.animation.addByIndices(
  "hero_idle_HOLD",
  "hero_idle_anim",
  [10, 11, 12, 13],
  "",
  24,
  true,
);
```

- **`setFrames(atlasFrames)`**: Uses atlas frames instead of grid. Accepts a `VexAtlas` or plain array of frames records. It also sizes the sprite to the first frame's original (untrimmed) size, and shows the frame until an animation plays. Assigning `sprite.frames = atlas` does the same thing.

- **`play(name, force = false)`**: Starts an animation. Playing the animation that's already running does nothing, unless `force` is true, which resets it.

### Example:

```js
// From the grid:
var hero = new VexSprite().loadGraphic("assets/hero.png", 32, 32);
hero.animation.add("hero_idle", [0, 1], 4, true);
hero.animation.add("hero_jump", [4, 5, 6], 10, false);

hero.animation.play("hero_idle");

// ...

hero.animation.play("hero_jump");
if (hero.animation.finished) hero.animation.play("hero_idle");
```

For atlases, see the "**[Sprite-Atlases](<>)**" guide!
