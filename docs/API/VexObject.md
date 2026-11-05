# `VexObject.js`

A base class for anything that moves and collides. It handles motion, overlap checks, point checks, collision resolution, and screen centering. `VexSprite` extends it, so every sprite has these properties and methods.

Extends **[`VexBasic.js`](VexBasic.md)**.

## Constructor

**`new VexObject(x = 0, y = 0)`**

## Properties

| Name                  | Type                      | Default          | Description                                                       |
| --------------------- | ------------------------- | ---------------- | ----------------------------------------------------------------- |
| `x`, `y`              | number                    | `0`              | Top-left corner in world space.                                   |
| `width`, `height`     | number                    | `0`              | Size in pixels.                                                   |
| `velocity`            | `{x, y}`                  | `{0, 0}`         | Speed in pixels per second.                                       |
| `acceleration`        | `{x, y}`                  | `{0, 0}`         | Change in velocity per second.                                    |
| `drag`                | `{x, y}`                  | `{0, 0}`         | Slowdown applied while acceleration on that axis is 0.            |
| `maxVelocity`         | `{x, y}`                  | `{10000, 10000}` | Speed limit per axis.                                             |
| `angle`               | number                    | `0`              | Rotation in degrees.                                              |
| `angularVelocity`     | number                    | `0`              | Rotation speed in degrees per second.                             |
| `angularAcceleration` | number                    | `0`              | Change in rotation speed per second.                              |
| `angularDrag`         | number                    | `0`              | Rotation slowdown.                                                |
| `maxAngular`          | number                    | `10000`          | Rotation speed limit.                                             |
| `last`                | `{x, y}`                  | spawn position   | Position at the start of the previous update.                     |
| `touching`            | `{left, right, up, down}` | all `false`      | Sides currently blocked by a collision. Reset every update.       |
| `immovable`           | boolean                   | `false`          | If true, collisions never push this object. Use it for platforms. |

## Methods

- **`VexObject.collide(objA, objB)`**: Static. If the two objects overlap, pushes them apart. It compares their `last` positions to work out which side the collision came from, then:

  - Pushes out whichever object isn't `immovable` (or half each, if neither is).
  - Sets the `touching` flags on both objects.
  - Sets the pushed object's velocity to 0 along that axis.

  Call it after objects have moved, once per pair per update.

- **`overlaps(other)`**: Returns true when this object's bounding box overlaps `other`'s.

- **`containsPoint(x, y)`**: Returns true when a point is inside the object's bounding box. Points on the edge count as inside. You can also pass a single object with `x` and `y` properties, such as `VexGlobal.mouse`.

  ```js
  if (VexGlobal.mouse.justPressed && button.containsPoint(VexGlobal.mouse)) {
    // Clicked the button.
  }
  ```

  The mouse position is in screen space. If the camera scrolls or zooms, convert it to world space first. See "[**The Camera**](../concepts/camera.md)".

- **`getMidpoint()`**: Returns the center as `{x, y}`.

- **`screenCenter(axes = "xy")`**: Centers the object on the canvas. Pass `"x"`, `"y"`, or `"xy"` (case doesn't matter). Returns `this`, so it chains. Set the object's size first, because the math uses `width` and `height`.

  ```js
  const title = new VexSprite().makeGraphic(200, 50, "#ffffff").screenCenter();
  ```

- **`update(dt)`**: Saves `last`, clears `touching`, and applies motion.

## Example

```js
const ground = new VexSprite(0, 440).makeGraphic(640, 40, "#446644");
ground.immovable = true;

// After this.player has moved:
VexObject.collide(this.player, ground);

if (this.player.touching.down) {
  // Standing on something.
}
```

See the "[**platformer collision guide**](../guides/platformer-collision.md)".
