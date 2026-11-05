# `VexSignal.js`

A simple event dispatcher. Listeners subscribe to a signal, and calling `dispatch()` runs all of them.

## Constructor

**`new VexSignal()`**

## Properties

- **`hasItems`**: A read-only boolean that is true when at least one listener is subscribed.

- **`add(listener)`**: Subscribes a function. Returns the function, so you can pass it to `remove()` later.

- **`addOnce(listener)`**: Subscribes a function that runs on the next dispatch only, then removes itself.

- **`remove(listener)`**: Unsubscribes a function.

- **`dispatch(...args)`**: Calls every listener with the given arguments. Listeners can safely add or remove listeners while a dispatch is running.

- **`removeAll()`**: Unsubscribes every listener.

## Example

```js
const onScore = new VexSignal();

onScore.add((points) => {
  scoreText.setText(`Score: ${points}`);
});

if (onScore.hasItems) onScore.dispatch(150);
```
