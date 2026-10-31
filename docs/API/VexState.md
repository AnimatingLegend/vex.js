# `VexState.js`

Your current game scene, like a menu or a level. Extend it and override `create()` and `update()`.

## Constructor

You rarely need to write a constructor. Build your objects in `create()` instead.

## Methods

- **`create()`**: Runs once when the state becomes active.
- **`update()`**: Updates every object in the state. When you override it, call `super.update(dt)`. While a substate is open, it updates only the substate.
- **`add(object)`**: Registers an object so it's updated and drawn every frame. Returns the object.
- **`remove(object)`**: Unregisters an object. Returns the object.
- **`openSubState(subState)`**: Opens a `VexState` as an overlay and calls its `create()`. The parent's objects stop updating until it closes.
- **`closeSubState()`**: Destroys and removes the open substate, if any.
- **`draw(ctx, camera)`**: Draws the states objects, then the substate on top. Called by the engine.
- **`destroy()`**: Destroys every object in the state. Called when you switch states. If you override it, call `super.destroy()`.

## Example:

```js
class PlayState extends VexState {
  create() {
    this.player = new VexSprite().makeGraphic(32, 32 "#ffffff");
    this.add(this.player);
  }

  update(dt) {
    super.update();
  }
}
```

Switch states with `VexGlobal.switchState(new OtherState())`. See "**[States](../CONCEPTS/states.md)**".
