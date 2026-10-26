# `VexAtlas.js`

Loads sprite atlas data, which describes where each frame sits on a packed image, and turns it into a list of frames. It reads Sprraow XML (`.xml`) and TexturePacker JSON (`.json`).

Connecting atlas frames to `VexAnimationController` isn't available yet, but planned!

## Functions

**`VexAtlas.load(dataPath)`**: Static. Fetches and parses an atlas file, and returns a promise for `VexAtlas`. Results are cached by path, so loading the same file again reuses the first request, and simultaneous requests share one fetch.

## Properties

- **`frames`**: An array of frame records. Every record has the same shape, whichever format it came from.

| Field                         | Description                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `name`                        | The frame's name, such as `"idle0003"`.                                                 |
| `x`, `y`                      | Top-left corner of the frame on the packed image.                                       |
| `width`, `height`             | Frame size on the packed image.                                                         |
| `offsetX`, `offsetY`          | Transparent pixels the packer trimmed from the left and top. `0` for untrimmed atlases. |
| `sourceWidth`, `sourceHeight` | The original size before trimming.                                                      |

### Example:

```js
VexAtlas.load("assets/BOYFRIEND.xml").then((atlas) => {
  console.log(atlas.frames.length, "frames");
  console.log(atlas.frames[0]);
});
```

Atlases are fetched, so run your through a local server. See "**[Getting Started](../GETTING_STARTED.md)**".
