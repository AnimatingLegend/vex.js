# Sprites & Objects

Everything you put in a state is built from a few small classes.

## `VexBasic`: lifecycle flags

| Flags     | Meaning                                                                     |
| --------- | --------------------------------------------------------------------------- |
| `exists`  | If false, the object is skipped completely; meaning no updates, or drawing. |
| `active`  | If false, `update()` is skipped.                                            |
| `visible` | If false, `draw()` is skipped.                                              |
| `alive`   | A game-logic flag, set to false by `kill()`.                                |

- **`kill()`**: Sets `alive` and `exists` to false without removing the object from its group.
- **`revive()`**: Sets both back to `true`. This is what make the object pooling work. See "**[Groups](./groups.md)**".

## `VexSprite`: a moveable, drawable object

A sprite has a position (`x`, `y`, the top-left corner in world space), a size and motion properties.

### Motion

Set `velocity` in pixels per second and the engine moves the sprite each update:

```js
sprite.velocity.x = 100;
```

For smoother movement, use `acceleration`, `drag`, and `maxVelocity`:

```js
sprite.acceleration.x = 800; // speed up
sprite.drag.x = 600; // slow down when acceleration is 0
sprite.maxVelocity.x = 200; // never faster than this
```

Drag only applies on an axis while its acceleration is zero. Rotation works the same way with `angularVelocity`, `angularAcceleration`, `angularDrag`, and `maxAngular`, in degrees.

Gravity is constant downward acceleration: `sprite.acceleration.y = 500`.

### Graphics

- **`makeGraphic(width, height, color)`**: Gives the sprite a solid rectangle, which is useful for prototyping.
- **`loadGraphic(path, frameWidth, framehHeight)`**: Loads an image. With a frame size, the image is sliced into a grid for animation.

### Animation

Load a spritesheet with a frame size, then define and play animations:

```js
sprite.animation.run("run", [0, 1, 2, 3], 12, true);
sprite.animation.play("run");
```

See **"[`VexAnimationController`](../API/VexAnimationController.md)"**, and the **"[Sprite Atlases](../GUIDES/sprite-atlases)"** guide for packed spritesheets.

### Appearance

`scale`, `alpha`, `angle` (degrees), `flipX`, `flipY`, and `offset` change how the sprite is drawn. `scrollFactor`, controls how much the camera moves it: `1` moves with the world, `0` stays fixed on the screen (AMAZING for HUD elements!!), and values in between give a parallax effect.

## Collision

**`sprite.overlaps(other)`**: Returns true when two bounding boxes overlap.

Sprites extend `VexObject`, which adds `VexObject.collide(a, b)` to push objects apart, `touching` flags that report which sides are blocked, and a `immovable` flag for platforms. See the **"[`VexObject`](../API/VexObject.md)"** API reference, and the **"[platformer collision guide](../GUIDES/platormer-collision.md)"**.
