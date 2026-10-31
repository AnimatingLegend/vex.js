# Platformer Collision

How to build a player that falls with gravity, lands on platforms and jumps.

> [!NOTE]
> This guide uses **[`VexObject`](../../source/VexObject.js)**.

## Requirements

- Platforms that never get pushed: set `immovable = true` on them.
- Gravity: constant downward `acceleraction.y` on the player.
- `VexObject.collide(a, b)` to push the player out of the platform.
- `player.touching.down` to know when the player is standing on something.

### 1. Build the level

```js
create() {
  this.player = new VexSprite()
    .makeGraphic(32, 32, "#ffffff")
    .setPosition(100, 100);
  this.add(this.player);

  this.platforms = new VexGroup();

  var ground = new VexSprite(0, 440)
    .makeGraphic(640, 40, "#446644");
  ground.immovable = true;
  this.platforms.add(ground);

  var ledge = new VexSprite(300, 340)
    .makeGraphic(150, 20, "#446644");
  ledge.immovable = true;
  this.platforms.add(ledge);

  this.add(this.platforms);
}
```

### 2. Move, Jump, & Collide

```js
update(dt) {
  var player = this.player;

  // Read this first. super.update() clears the touching flags.
  var wasGrounded = player.touching.down;

  player.acceleration.y = 800; // Gravity.
  player.velocity.x = 0;
  if (VexGlobal.keys.pressed("ArrowLeft")) player.velocity.x = -150;
  if (VexGlobal.keys.pressed("ArrowRight")) player.velocity.x = 150;

  if (VexGlobal.keys.justPressed("Space") && wasGrounded)
    player.velocity.y = -320;

  super.update(dt); // Applies motion to everything in the state.

  this.platforms.forEachAlive((platform) => {
    VexObject.collide(player, platform);
  });
}
```

## Reacting to the landing

To trigger an effect only on the update the player lands, compare the flag before and after collision:

```js
// After motion, before collide() zeros it.
var fallSpeed = player.velocity.x;

this.platforms.forEachAlive((platform) => {
  VexObject.collide(player, platform);
});

// Just landed from a real fall. Spawn dust particles, and whatver else you want!
if (!wasGrounded && player.touching.down && fallSpeed > 100) {
  /* ... */
}
```

Capture `fallSpeed` before `collide()`, because collision set the vertical velocity to 0.

## Respawning

To reset a player who falls off the world, check their position and reset it:

```js
if (player.y > 1000) {
  player.setPosition(100, 100);
  player.velocity.x = 0;
  player.velocity.y = 0;
}
```

Set the `velocity` to zero also. If you don't the player will keep its `fallSpeed` and will continue to fall.
