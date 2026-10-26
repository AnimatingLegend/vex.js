# `VexSprite.js`

A moveable, drawable game object. It combines motion, drawing (a solid color, or an image), and frame animation.

Extends [`VexObject`](./VexObject.md), and the motion properties and methods below and inherited. The sprite API doesn't change.

## Constructor

**`new VexSprite(x = 0, y = 0)`**

## Properties

### Position & Size

| Name              | Type   | Default | Description                                                              |
| ----------------- | ------ | ------- | ------------------------------------------------------------------------ |
| `x`, `y`          | number | `0`     | Top-left corner in world space.                                          |
| `width`, `height` | number | `0`     | Size in pixels. Set by `makeGraphic()`, `loadGraphic()`, or `setSize()`. |

### Motion

| Name                  | Type     | Default          | Description                                            |
| --------------------- | -------- | ---------------- | ------------------------------------------------------ |
| `velocity`            | `{x, y}` | `{0, 0}`         | Speed in pixels per second.                            |
| `acceleration`        | `{x, y}` | `{0, 0}`         | Change in velocity per second.                         |
| `drag`                | `{x, y}` | `{0, 0}`         | Slowdown applied while acceleration on that axis is 0. |
| `maxVelocity`         | `{x, y}` | `{10000, 10000}` | Speed limit per axis.                                  |
| `angle`               | number   | `0`              | Rotation in degrees.                                   |
| `angularVelocity`     | number   | `0`              | Rotation speed in degrees per second.                  |
| `angularAcceleration` | number   | `0`              | Change in rotation speed per second.                   |
| `angularDrag`         | number   | `0`              | Rotation slowdown.                                     |
| `maxAngular`          | number   | `10000`          | Rotation speed limit.                                  |

### Appearance

## Methods

- **`makeGraphic(width, height, color = "#ffffff")`**: Gives the sprite a solid rectangle. Returns `this`.

- **`loadGraphic(path, frameWidth = 0, frameHeight = 0)`**: Loads an image.

> [!TIP]
>
> If you pass a frame size, the image is sliced into a grid of frames for animation, numbered left to right and then top to bottom, starting at 0. Returns `this`. The image loads in the background, and until it's ready the sprite draws as its `color` rectangle. To animate from an atlas instead of a grid, call `loadGraphic(path)` without a frame size and assign the atlas to `frames`.

- **`setPosition(x, y)`**: Sets the position. Returns `this`.

- **`setSize(width, height)`**: Sets the size. Returns `this`.

- **`overlaps(other)`**: Returns true when this sprite's bounding box overlaps `other`'s.

- **`getMidpoint()`**: Returns the center as `{x, y}`.

- **`containsPoint(x, y)`**: Returns true when a point is inside the sprite's bounding box. You can also pass an object with `x` and `y`, such as `VexGlobal.mouse`. See **"[VexObject](./VexObject.md)"**.

- **`screenCenter(axes = "xy")`**: Centers the sprite on the canvas along `"x"`, `"y"`, or `"xy"`. Returns `this`. See **"[VexObject](./VexObject.md)"**.

- **`update(dt)` and `draw(ctx, camera)`**: Called by the engine. `update` applies motion and advances animation.

## Example

```js
const hero = new VexSprite(100, 100).loadGraphic("assets/hero.png", 32, 32);
hero.animation.add("run", [0, 1, 2, 3], 12, true);
hero.animation.play("run");
hero.velocity.x = 80;
```

See **"[Sprites and objects](../CONCEPTS/sprites-n-objects.md)"**.
