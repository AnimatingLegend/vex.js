# `VexEase.js`

A set of easing functions for tweens. An easing function takes progress `t` from 0 to 1 and returns the eased progress, which changes how a value moves between its start and end.

`VexEase` is a plain object of functions, not a class. It's also available as `VexTween.Easing`.

## Functions

| Name                             | Feel                                            |
| -------------------------------- | ----------------------------------------------- |
| `linear`                         | Constant speed.                                 |
| `quadIn`, `cubicIn`, `sineIn`    | Starts slow, ends fast.                         |
| `quadOut`, `cubicOut`, `sineOut` | Starts fast, ends slow.                         |
| `quadInOut`, `sineInOut`         | Slow at both ends, fast in the middle.          |
| `bounceOut`                      | Reaches the end, then bounces back and settles. |

`quad` curves are the gentlest, `cubic` curves are stronger, and `sine` curves are the smoothest.

## Example

```js
VexTween.tween(sprite, { y: 300 }, 1, { ease: VexTween.Easing.bounceOut });
```

You can also write your own. Any function that takes `t` from 0 to 1 and returns a number, works:

```js
const snap = (t) => (t < 0.5 ? 0 : 1);
VexTween.tween(sprite, { x: 200 }, 1, { ease: snap });
```

See **[`VexTween.js`](VexTween.md)**.
