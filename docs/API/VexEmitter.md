# `VexEmitter.js`

Spawns short-lived particles. Particles are recycled through the group, so bursts don't create new sprites every time.

Extends **[`VexGroup.js`](VexGroup.md)**.

## Constructor

**`new VexEmitter(x = 0, y = 0, maxSize)`**:

`x` and `y` are where particles spawn. `maxSize` caps how many particles can exist at once. Leave it out for no limit.

## Properties

| Name               | Type         | Default              | Description                                                                                                    |
| ------------------ | ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `x`, `y`           | number       | from the constructor | The spawn position. Change them to move the emitter.                                                           |
| `speedX`           | `{min, max}` | `{-100, 100}`        | Range of horizontal speed in pixels per second.                                                                |
| `speedY`           | `{min, max}` | `{-200, -50}`        | Range of vertical speed. Negative is upward.                                                                   |
| `particleColor`    | string       | `"#ffaa00"`          | Color of new particles.                                                                                        |
| `particleLifeSpan` | number       | `0.6`                | How long each particle lives, in seconds.                                                                      |
| `particleAlpha`    | number       | `1`                  | Opacity of new particles. It only has a lasting effect when `autoFade` is off.                                 |
| `particleAge`      | number       | `0`                  | Starting age of new particles. Rarely needs changing.                                                          |
| `particleGravity`  | number       | `400`                | Downward acceleration in pixels per second squared. Set it to `0` for particles that drift in a straight line. |
| `autoFade`         | boolean      | `true`               | Fades each particle from opaque to transparent over its lifespan.                                              |
| `particle`         | VexSprite    |                      | The most recently emitted particle.                                                                            |

## Methods

- **`emit()`**: Spawns one particle at the emitter's position with a random velocity inside `speedX` and `speedY`. The particle is killed after `particleLifeSpan` seconds and reused by later calls. If the emitter has a `maxSize` and every particle is alive, nothing is spawned and `null` is returned.

- **`burstParticle(count = 10)`**: Calls `emit()` `count` times. Use it for explosions, dust, and sparks.

- **`fadeParticle(particleAlpha = 1, particleDuration = 1, onComplete = null)`**: Tweens the alpha of the most recently emitted particle toward `particleAlpha` over `particleLifeSpan` seconds, replacing any tween already on it. Call it right after `emit()`. `particleDuration` is currently unused. `onComplete` runs when the tween finishes.

- **`update(dt)`**: Ages every living particle, applies `autoFade`, and kills the particles that have expired. Called by the engine.

## Example

```js
const sparks = new VexEmitter(0, 0, 50); // At most 50 particles at once.
sparks.particleColor = "#ffff66";
sparks.speedX = { min: -200, max: 200 };
sparks.particleGravity = 0;
this.add(sparks);

// On a hit:
sparks.x = enemy.x + enemy.width / 2;
sparks.y = enemy.y + enemy.height / 2;
sparks.burstParticle(12);
```

See the "**[particle bursts guide](../guides/particle-bursts.md)**".
