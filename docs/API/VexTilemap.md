# `VexTilemap.js`

Draws a grid of tiles from CSV map data and a tileset image. Only the tiles inside the camera's view are drawn, so large levels stay cheap to render.

Extends **[`VexBasic`](VexBasic.md)**.

## Constructor

**`new VexTilemap(x = 0, y = 0)`**: `x` and `y` set where the top-left corner of the map sits in world space.

## Properties

| Name                            | Type             | Default  | Description                                                            |
| ------------------------------- | ---------------- | -------- | ---------------------------------------------------------------------- |
| `x`, `y`                        | number           | `0`      | Top-left corner of the map in world space.                             |
| `tileWidth`, `tileHeight`       | number           | `0`      | Size of one tile in pixels. Set by `loadMapFromCSV()`.                 |
| `widthInTiles`, `heightInTiles` | number           | `0`      | Size of the map in tiles. Set by `loadMapFromCSV()`.                   |
| `width`, `height`               | number           | `0`      | Size of the map in pixels. Set by `loadMapFromCSV()`.                  |
| `data`                          | array            | `[]`     | Every tile index in the map as one flat list, row by row.              |
| `tileSet`                       | HTMLImageElement | `null`   | The tileset image.                                                     |
| `scrollFactor`                  | `{x, y}`         | `{1, 1}` | Reserved. It isn't used yet, so tilemaps always scroll with the world. |

## Methods

| Parameter                 | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `csvData`                 | The CSV text itself, not a file path. Load the file first, for example with `fetch()`. |
| `tilesetPath`             | Path to the tileset image.                                                             |
| `tileWidth`, `tileHeight` | Size of one tile in pixels.                                                            |

- **`loadMapFromCSV(csvData, tilesetPath, tileWidth, tileHeight)`**: Loads the tileset image and reads the map. Returns a promise that resolves to the tilemap, so you can chain it. The promise rejects if the image can't be loaded.

- **`getTileIndex(col, row)`**: Returns the tile index at a column and row. Returns `-1` if the position is outside the map.

- **`getTileAt(worldX, worldY)`**: Returns the tile index at a world position. Returns `-1` if the position is outside the map. Use it for gameplay queries such as collision.

- **`draw(ctx, camera)`**: Draws the visible tiles. Called by the engine.

## Map format

A map is CSV text with one row of tiles per line and commas between the cells:

```bash
0,0,0,0
0,1,2,0
3,3,3,3
```

- `0` is an empty cell, and nothing is drawn there.
- `1` is the first tile in the tileset image. Tiles are numbered left to right, then top to bottom.
- Every row needs the same number of columns. The map's width comes from the first row.
- The tileset must be a grid of equal-size tiles with no spacing or margin.
  Tiled's CSV export uses the same numbering when the map uses a single tileset.

## Example

Load the CSV, then build the scene once the map is ready:

```js
create() {
  fetch("assets/level1.csv")
    .then((response) => response.text())
    .then((csv) =>
      new VexTilemap(0, 0).loadMapFromCSV(csv, "assets/tiles.png", 16, 16),
    )
    .then((map) => {
      this.map = map;
      this.add(map);
      // Add your player and other objects here, so they draw on top of the map.
    });
}

update(dt) {
  super.update(dt);
  if (!this.map) return; // The map isn't ready yet.
}
```

The engine doesn't wait for `create()` to finish loading. Objects draw in the order they're added, so add the map first and then the objects that should appear in front of it.

## Collision

The tilemap doesn't push objects out of tiles. Use `getTileAt()` to check what's at a position, and decide which tile numbers are solid:

```js
const SOLID_TILES = [1, 2, 3];

isSolidAt(x, y) {
  return SOLID_TILES.includes(this.map.getTileAt(x, y));
}

// Is the player standing on a solid tile?
const feetY = player.y + player.height + 1;
const grounded =
  this.isSolidAt(player.x + 2, feetY) ||
  this.isSolidAt(player.x + player.width - 2, feetY);
```

Check the left and right edges of the sprite's feet separately, so the player can stand on a tile with only part of their body.

See the tilemap demo in **[`test/tilemap/`](../../test/tilemap/)**.
