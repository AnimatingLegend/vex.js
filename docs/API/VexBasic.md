# `VexBasic.js`

The base class for everything that lives in a state. It provides lifecycle flags and empty `update()` and `draw()` methods for subclasses to fill in.

## Properties

| Name      | Type    | Default | Description                               |
| --------- | ------- | ------- | ----------------------------------------- |
| `exists`  | boolean | `true`  | If false, the object is skipped entirely. |
| `active`  | boolean | `true`  | If false, `update()` is skipped.          |
| `visible` | boolean | `true`  | If false, `draw()` is skipped.            |
| `alive`   | boolean | `true`  | Game-logic flag, set false by `kill()`.   |
| `ID`      | number  | `-1`    | A free-to-use identifier.                 |

## Methods

- **`update(dt)`**: Does nothing. Override it in subclasses.
- **`draw(ctx, camera)`**: Does nothing. Override it in subclasses.
- **`kill()`**: Sets `alive` and `exists` to false. The object stays in its group, ready to be reused.
- **`revive()`**: Sets `alive` and `exists` back to true.
- **`destroy()`**: Releases references. Override it in subclasses that hold resources.

## Example:

```js
class VexTimer extends VexBasic {
  constructor(seconds) {
    super();
    this.remaining = seconds;
  }

  update(dt) {
    this.remaining -= dt;
    if (this.remaining <= 0) this.kill();
  }
}
```

See "**[Sprites & Objects](../CONCEPTS/sprites-n-objects.md)**".
