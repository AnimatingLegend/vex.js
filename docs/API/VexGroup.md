# `VexGroup.js`

A collection of objects that updates and draws its members together. It also supports recycling dead members instead of creating new ones.

**Extends [`VexBasic.js`](VexBasic.md)**.

## Constructor

**`new VexGroup(maxSize = 0)`**:

`maxSize` caps how many members the group can hold. `0` means no limit.

## Properties

| Name      | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| `members` | array  | The objects in the group.          |
| `maxSize` | number | The member limit, or `0` for none. |

## Methods

- **`add(object)`**: Adds an object and returns it. Does nothing if the object is already a member or the group is full.

- **`remove(object)`**: Removes an object and returns it.

- **`recycle(factoryFn)`**: Revives and returns a dead member if there is one. Otherwise it calls `factoryFn()`, adds the new object, and returns it. If the group is at `maxSize` and every member is alive, no new object is created:

  ```js
  const bullet = this.bullets.recycle(() =>
    new VexSprite().makeGraphic(4, 4, "#ffff00"),
  );
  ```

  - A recycled object keeps its old state, so reset position, velocity, and anything else you changed.

- **`forEach(fn)`**: Calls `fn(member)` for each member that exists.

- **`forEachAlive(fn)`**: Calls `fn(member)` for each member that exists and is alive.

- **`getFirstAlive()`**: Returns the first living member, or `null`.

- **`getFirstDead()`**: Returns the first dead member, or `null`.

- **`countLiving()`**: Returns the number of members that exist and are alive.

- **`countDead()`**: Returns the number of dead members.

- **`clear()`**: Removes every member without destroying them.

- **`destroy()`**: Destroys every member and empties the group.

## Example

```js
this.platforms = new VexGroup();
this.platforms.add(new VexSprite(0, 440).makeGraphic(640, 40, "#446644"));
this.add(this.platforms);

this.platforms.forEachAlive((platform) => {
  // Do something with each platform.
});
```

See "[**Groups**](../concepts/groups.md)".
