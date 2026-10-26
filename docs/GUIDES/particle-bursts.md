# Particle Bursts

How to spawn a short burst of particles, such as landing dust, hit sparks, or an explosion with `VexEmitter`.

### 1. Create the emitter

Create one emitter when the state starts and add it to the state:

```js
create() {
  this.dust = new VexEmitter(0, 0);
  this.dust.particleColor = "#714f00";
  this.dust.particleLifeSpan = 0.5; // Seconds each particle lives
  this.add(this.dust);
}
```

Reuse the same emitter for every burst. Don't create a new one each time.

### 2. Move it, and BURST

`burstParticle(count)` spawns a group of particles at the emitter's position. Move the emitter to where the effect should happen first:

```js
_burst(x, y) {
  this.dust.x = x;
  this.dust.y = y;
  this.dust.burstParticle(8);
}
```

Each particle gets a random velocity, so the burst spreads out on its own.

### 3. Trigger it

Call it from wherever the event happens:

```js
if (VexGlobal.mouse.justPressed) {
  this._burst(VexGlobal.mouse.x, VexGlobal.mouse.y);
}
```

The mouse position is in screen space. If your camera scrolls, convert it first. See "**[The Camera](../CONCEPTS/camera.md)**".

## Shaping the effect

Change these properties on the emitter before you burst:

| Property           | What it does                                                                |
| ------------------ | --------------------------------------------------------------------------- |
| `speedX`, `speedY` | The range of starting speeds, as `{ min, max }`. Negative `speedY` goes up. |
| `particleGravity`  | Pulls particles down. `0` makes them drift in a straight line.              |
| `particleColor`    | The color of new particles.                                                 |
| `particleLifeSpan` | How long particles live, in seconds.                                        |
| `autoFade`         | Fades particles out over their lifespan. On by default.                     |

For example: Sparks that fly outward in every direction:

```js
this.sparks = new VexEmitter(0, 0);
this.sparks.particleColor = "#ffff66";
this.sparks.speedX = { min: -200, max: 200 };
this.sparks.speedY = { min: -200, max: 200 };
this.sparks.particleGravity = 0;
```

## How it works

Particles are sprites in a group. When a particle's lifespan runs out, the emitter kills it instead of deleting it, and the next `emit()` revives the same particle. After the first few bursts, no new objects are created at all.

## Tips:

- 6 - 12 particles is usually enough for small effects.
- Shorter lifespans feel "snappier". Longer ones feel "floaty".
- Use one emitter per effect type, so each can have its own color, speed, and lifespan.
