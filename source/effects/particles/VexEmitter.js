import VexEase from "../../tweens/VexEase.js";
import VexTween from "../../tweens/VexTween.js";
import VexGroup from "../../VexGroup.js";
import VexSprite from "../../VexSprite.js";

/**
 * @file VexEmitter.js
 *
 * @description Spawns short-lived particles and reuses them through VexGroup recycling to
 *  avoid repeated allocations during bursts.
 */
export default class VexEmitter extends VexGroup {
  constructor(x = 0, y = 0, maxSize) {
    super(maxSize);
    this.x = x;
    this.y = y;

    this.speedX = { min: -100, max: 100 };
    this.speedY = { min: -200, max: -50 };
    this.autoFade = true;

    this.particle = null;
    this.particleColor = "#ffaa00";
    this.particleFade = null;
    this.particleLifeSpan = 0.6;
    this.particleAge = 0;
    this.particleAlpha = 1;
    this.particleGravity = 400;
  }

  // Reuse pooled particles so repeated bursts do not allocate new sprites.
  emit() {
    const particle = this.recycle(() =>
      new VexSprite(this.x, this.y).makeGraphic(4, 4, this.particleColor),
    );
    // Call null if pool is capped and all slots are alive.
    if (!particle) return null;

    this.particle = particle;
    particle.color = this.particleColor;
    particle.x = this.x;
    particle.y = this.y;
    particle.lifeSpan = this.particleLifeSpan;
    particle.age = this.particleAge;
    particle.alpha = this.particleAlpha;
    // Spread particles horizontally so a burst does not stack in one column.
    particle.velocity.x =
      this.speedX.min + Math.random() * (this.speedX.max - this.speedX.min);
    // Negative y moves upward in canvas coordinates.
    particle.velocity.y =
      this.speedY.min + Math.random() * (this.speedY.max - this.speedY.min);
    particle.acceleration.y = this.particleGravity;
    return particle;
  }

  /**
   * Fade the current particle, replacing any existing alpha tween.
   *
   * @param {Number} particleAlpha - How transparent a particle can be.
   * @param {Number} particleDuration - How long a particle stays visible.
   */
  fadeParticle(particleAlpha = 1, particleDuration = 1, onComplete = null) {
    VexTween.cancelTweensOf(this.particle);
    VexTween.tween(
      this.particle,
      { alpha: particleAlpha },
      particleDuration,
      this.particleLifeSpan,
      {
        ease: VexEase.quadOut,
        onComplete,
      },
    );
  }

  /**
   * Emits a burst of particles.
   * @param {Number} count - The number of particles emitted.
   */
  burstParticle(count = 10) {
    // pi = particle index
    for (let pi = 0; pi < count; pi++) this.emit();
  }

  update(dt) {
    super.update(dt);

    this.forEachAlive((particle) => {
      particle.age += dt;

      if (this.autoFade) {
        particle.alpha = Math.max(
          0,
          (1 - particle.age / particle.lifeSpan) * this.particleAlpha,
        );
      }
      if (particle.age >= particle.lifeSpan) particle.kill();
    });
  }
}
