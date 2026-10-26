# `VexTween.js`

Animates number properties on any object over time, with an easing curve. `VexGame` advances all active tweens every update, so you never update them yourself.

`VexTween` is an object with static functions, not a class.

## Functions

**`VexTween.tween(target, properties, duration, options = {})`**

Starts a tween and returns it.

| Parameter            | Description                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `target`             | The object whose properties will change.                                                                                |
| `properties`         | An object of end values, such as `{ x: 300, alpha: 0 }`. The start values are read from `target` when the tween begins. |
| `duration`           | Length in seconds.                                                                                                      |
| `options.ease`       | An easing function. Defaults to `linear`.                                                                               |
| `options.onComplete` | A function called when the tween finishes.                                                                              |

The returned tween has a `done` property that becomes true when it finishes.

- **`VexTween.cancelTweensOf(target)`**: Stops every active tween on `target`. Use it before starting a new tween on the same properties, so the two don't fight.

- **`VexTween.updateTweens(dt)`**: Advances all tweens. Called by `VexGame`.

## Easing

`VexTween.Easing` holds the easing functions:

- `linear`
- `quadIn`, `quadOut`, `quadInOut`
- `cubicIn`, `cubicOut`
- `sineIn`, `sineOut`, `sineInOut`
- `bounceOut`.

See **[`VexEase.js`](VexEase.md)** for what each one feels like.

## Example

```js
VexTween.tween(this.title, { y: 100, alpha: 1 }, 0.8, {
  ease: VexTween.Easing.sineOut,
  onComplete: () => console.log("Title is in place."),
});
```

Don't tween a property that physics is also changing, such as the `x` of a sprite with `velocity.x` set. They will fight each other.
