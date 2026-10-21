/**
 * Caches atlases by path so each file is only fetched and parsed once.
 */
const atlasCache = new Map();

/**
 * @file VexAtlas.js
 *
 * @description Loads and parses sprite atlas data
 *  (Sparrow XML or TexturePacker JSON) into a list of frames.
 */
export default class VexAtlas {
  constructor() {
    this.frames = [];
  }

  /**
   * Loads an atlas file and returns the parsed atlas.
   * @param {string} dataPath - Path to a .xml or .json atlas file.
   * @returns {Promise<VexAtlas>} - The parsed atlas.
   */
  static async load(dataPath) {
    if (atlasCache.has(dataPath)) return atlasCache.get(dataPath);

    const promise = VexAtlas._fetchAndParse(dataPath);
    atlasCache.set(dataPath, promise);
    return promise;
  }

  /**
   * Fetches the atlas file and picks a parser from its extension.
   * @param {string} dataPath - Path to a .xml or .json atlas file.
   * @returns {Promise<VexAtlas>} - A new atlas filled with the parsed frames.
   * @throws {Error} - If the file can't be loaded or isn't .xml or .json.
   */
  static async _fetchAndParse(dataPath) {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`[ERROR] [VEX ATLAS] Could not load "${dataPath}"`);
    }

    const atlas = new VexAtlas();
    if (dataPath.endsWith(".xml")) {
      atlas._parseXml(await response.text());
    } else if (dataPath.endsWith(".json")) {
      atlas._parseJson(await response.json());
    } else {
      throw new Error(
        `[ERROR] [VEX ATLAS] Unsupported file type: "${dataPath}"`,
      );
    }

    return atlas;
  }

  /**
   * Builds a frame record so `.xml` and `.json` frames share the same shape.
   * Trim offsets default to 0 and the source size defaults to the frame size,
   * which is correct for atlases that don't trim.
   * @param {string} name - The frame's name, e.g. "idle0003".
   * @param {number} x - Left edge of the frame on the packed image.
   * @param {number} y - Top edge of the frame on the packed image.
   * @param {number} width - Frame width on the packed image.
   * @param {number} height - Frame height on the packed image.
   * @param {number} [offsetX=0] - Transparent pixels trimmed from the left.
   * @param {number} [offsetY=0] - Transparent pixels trimmed from the top.
   * @param {number} [sourceWidth=width] - Original width before trimming.
   * @param {number} [sourceHeight=height] - Original height before trimming.
   * @returns {object} - The frame record.
   */
  _makeFrame(
    name,
    x,
    y,
    width,
    height,
    offsetX = 0,
    offsetY = 0,
    sourceWidth = width,
    sourceHeight = height,
  ) {
    return {
      name,
      x,
      y,
      width,
      height,
      offsetX,
      offsetY,
      sourceWidth,
      sourceHeight,
    };
  }

  /**
   * Parses Sparrow XML, adding one frame per SubTexture element.
   * @param {string} text - The raw XML file contents.
   * @returns {void}
   */
  _parseXml(text) {
    const document = new DOMParser().parseFromString(text, "text/xml");
    document.querySelectorAll("SubTexture").forEach((anim) => {
      const width = parseInt(anim.getAttribute("width"));
      const height = parseInt(anim.getAttribute("height"));
      // frameX, frameY, frameWidth & frameHeight are all optional. so fallback to the defaults.
      const frameX = parseInt(anim.getAttribute("frameX")) || 0;
      const frameY = parseInt(anim.getAttribute("frameY")) || 0;
      const frameWidth = parseInt(anim.getAttribute("frameWidth")) || width;
      const frameHeight = parseInt(anim.getAttribute("frameHeight")) || height;

      this.frames.push(
        this._makeFrame(
          anim.getAttribute("name"),
          parseInt(anim.getAttribute("x")),
          parseInt(anim.getAttribute("y")),
          width,
          height,
          // Sparrow atlas stores the trim as a negative number.
          0 - frameX,
          0 - frameY,
          frameWidth,
          frameHeight,
        ),
      );
    });
  }

  /**
   * Parses TexturePacker JSON, adding one frame per entry. Handles both the
   * object-keyed and array "frames" export formats.
   * @param {object} data - The parsed JSON file contents.
   * @returns {void}
   */
  _parseJson(data) {
    const entries = Array.isArray(data.frames)
      ? data.frames.map((file) => [file.filename, file])
      : Object.entries(data.frames);

    entries.forEach(([name, file]) => {
      const trim = file.spriteSouceSize || { x: 0, y: 0 };
      const source = file.sourceSize || {
        w: file.frame.w,
        h: file.frame.height,
      };

      this.frames.push(
        this._makeFrame(
          name,
          file.frame.x,
          file.frame.y,
          // JSON says w/h, our frames say width/height
          file.frame.w,
          file.frame.h,
          trim.x,
          trim.y,
          source.w,
          source.y,
        ),
      );
    });
  }
}
