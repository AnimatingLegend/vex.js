# States

A state is your current game scene, like a menu, a level, or a game over screen. Only one runs at a time.

## Write a State

Extend `VexState` and override the methods you need:

```js
class MainMenuState extends VexState {
  // This method runs once when the state becomes active. Build your objects here.
  create() { ... }

  update(dt) {
    // This is required! This is what updates the states's objects.
    super.update(dt);
  }
}
```

- **`create()`**: Runs once when the state starts.
- **`update(dt)`**: Runs every update. Always call `super.update(dt)`, or NONE of the states objects will update.
- **`destroy`**: Runs when the state is switched away from. You rarely need to override it, but if you do, use `super.destroy()`.

## Adding & Removing Objects

`this.add(object)` registers an object so it's updated and drawn every frame. Objects draw in the order they were added, so later objects appear on top. `this.remove(object)` unregisters one.

Anything that extends `VexBasic` can be added: sprites, text, groups, and emitters.

## Switching States

```js
VexGlobal.switchState(new GameState());
```

This destroys the current state, and starts a new one. `VexGame` uses the same call for your `initialState`.

### Substates

A substate is an overlay, such as a pause menu, or a game over screen. It runs on top of your current state.

```js
this.openSubState(new PauseSubState());
this.closeSubState();
```

While a substate is open, `super.update(dt)` in the parent updates only the substate, so the parent's object freeze. The parent still draws underneath, with the substate drawn on top. A substate is a `VexState` itself, with its own `create()`, `add()` and `update()` methods.
