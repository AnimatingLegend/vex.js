# `VexText.js`

Draws a string on the canvas. It's positioned and drawn like a sprite, so it works in any state or group.

## Constructor

**`new VexText(x = 0, y = 0, text = "", options = {})`**

| Option         | Type     | Default             | Description                                                                           |
| -------------- | -------- | ------------------- | ------------------------------------------------------------------------------------- |
| `font`         | string   | `"16px sans-serif"` | A CSS font string, such as `"20px monospace"`.                                        |
| `color`        | string   | `"#ffffff"`         | Text color.                                                                           |
| `align`        | string   | `"left"`            | `"left"`, `"center"`, or `"right"`. See the note below.                               |
| `alpha`        | number   | `1`                 | Opacity from 0 to 1.                                                                  |
| `bold`         | boolean  | `false`             | Draws the text in bold.                                                               |
| `scrollFactor` | `{x, y}` | `{0, 0}`            | How much the camera moves the text. The default keeps it fixed on screen, like a HUD. |

## Properties

`x`, `y`, `text`, `font`, `color`, `align`, `alpha`, `bold`, `scrollFactor`, and `offset`. They can be changed at any time.

## Methods

- **`setText(text)`**: Changes the displayed string. Returns `this`.

- **`setColor(color)`**: Changes the color. Returns `this`.

- **`setFont(font)`**: Changes the font string. Returns `this`.

- **`setAlpha(alpha)`**: Changes the opacity. Returns `this`.

- **`setAlign(align)`**: Changes the alignment. Returns `this`.

## Alignment

`align` changes what `x` means. With `"left"`, `x` is the left edge of the text. With `"center"`, it's the horizontal center. With `"right"`, it's the right edge. To center text on the screen, set `align` to `"center"` and `x` to half the canvas width.

## Example

```js
const score = new VexText(10, 10, "Score: 0", {
  font: "20px monospace",
  bold: true,
});
this.add(score);

// Later:
score.setText(`Score: ${this.score}`);

// Centered title:
const title = new VexText(VexGlobal.width / 2, 100, "My Game", {
  align: "center",
});
```

Set `scrollFactor` to `{ x: 1, y: 1 }` for text that belongs in the world, such as a sign.
