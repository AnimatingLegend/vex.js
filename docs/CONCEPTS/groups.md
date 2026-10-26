# Groups

A `VexGroup` holds a collection of objects and updates and draws them together. A state is built around one, and you can nest groups inside a state to organize things like platforms, enemies, and HUD elements.

## Using a group

```js
this.enemies = new VexGroup();
this.enemies.add(new VexSprite(100, 100).makeGraphic(24, 24, "#ff5555"));
this.add(this.enemies); // Add the group to the state so it updates and draws.
```

Loop over members with `forEach()`, which skips objects that no longer exist, or `forEachAlive()`, which also skips dead once:

```js
this.enemies.forEachAlive((enemy) => {
  enemy.velocity.x = -50;
});
```

## `kill()` Vs. `remove()`

- **`remove(object)`**: Take the object out of the group for good.
- **`kill()`**: On the object keeps it in the group, but dormant: not updated, not redrawn, and ready to be reused.

For things that appear and disappear constantly, such as bullets, particles, and enemies, prefer `kill()` and reuse them.

## Object pooling with `recycle()`

Creating and discarding object every frame is wasteful. `recycle()` reuses a dead member if there is one, and ONLY builds a new one when it has to:

```js
var bullet = this.bullets.recycle(() =>
  new VexSprite().makeGraphic(4, 4, "#ffff00"),
);
bullet.setPosition(x, y);
bullet.velocity.x = 400;
```

When the bullet leaves the screen, call `bullet.kill()`. The next `recycle()` call revives it.

A recycled object keeps whatever state it had when it died, so reset position, velocity, and anything else you changed.

## Limiting size

`new VexGroup(maxSize)` caps how many members the group can hold. With the default of `0`, there's no limit.

## Counting & Finding

| Method            | Returns                                     |
| ----------------- | ------------------------------------------- |
| `countLiving()`   | Number of members that exist and are alive. |
| `coundDead()`     | Number of dead members in the pool.         |
| `getFirstAlive()` | The first living member, or `null`.         |
| `getFirstDead()`  | The first dead member, or `null`.           |
