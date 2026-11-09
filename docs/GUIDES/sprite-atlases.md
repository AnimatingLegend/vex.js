# Sprite Atlases

How to load a packed spritesheet with an atlas file (`.xml` or `.json`), and play animations by frame name.

## Why should I use an Atlas?

A grid spritesheet needs every frame to be a same size. An atlas packs frames of any size into one image., and a data file records where each frame sits and what it's called, such as `hero_run_anim0000`, `hero_run_anim0001`, and so on. Vex.js reads Sparrow XML and TexturePacker JSON.

## 1. Load the image

Load the image with no frame size, because the atlas replaces the grid:

```js
this.hero = new VexSprite(100, 100).loadGraphic("assets/hero.png");
this.hero.visible = false; // Hide it until the atlas is ready.
this.add(this.hero);
```

Until the atlas arrives, the sprite would draw the entire sheet. Hiding it avoids that flash.

## 2. Load the atlas and assign it

`VexAtlas.load()` fetches and parses the data file. It returns a promise, so assign the frames when it resolves:

```js
VexAtlas.load("assets/hero.xml").then((atlas) => {
  this.hero.frames = atlas;
  // ...
  // Define animations here (see Step 3).
  this.hero.visible = true;
});
```

Assigning `frames` sizes the sprite to the first frame's original size and shows that frame. Atlases are fetched, so run your game through a local server.

## 3. Define animations by name

**`addByPrefix(name, prefix, framerate, looped)`**: Builds an animation from every frame whose name starts with the prefix:

```js
this.hero.animation.addByPrefix("idle", "hero_idle_anim", 24, true);
this.hero.animation.addByPrefix("run", "hero_run_anim", 24, true);
this.hero.animation.addByPrefix("jump", "hero_jump_anim", 24, false);
```

Frames play in the order they appear in the atlas. A prefix matches the start of the name, so `"idle"` also matches `"hero_idle_anim0000"`. Make prefixes specific enough to match only what you want.

To pick or reorder frames, use `addByIndices`. The indices choose from the frames that match the prefix, counting from 0:

```js
this.hero.animation.addByIndices(
  "idle-HOLD",
  "hero_idle_anim",
  [10, 11, 12, 13],
  "",
  24,
  true,
);
```

## 4. Play the animation

```js
this.hero.animation.play("run");
```

Use `animation.finished` to check whether a non-looping animation has ended.

## Final Product:

```js
create() {
  this.hero = new VexSprite(100, 100).loadGraphic("assets/hero.png");
  this.hero.visible = false;
  this.add(this.hero);

  VexAtlas.load("assets/hero.xml").then((atlas) => {
    this.hero.frames = atlas;
    this.hero.animation.addByPrefix("idle", "hero_idle_anim", 24, true);
    this.hero.animation.addByPrefix("run", "hero_run_anim", 24, true);
    this.hero.animation.addByPrefix("jump". "hero_jump_anim", 24, false);

    this.hero.animation.play("idle");
    this.hero.visible = true;
  });
}
```

## Sharing one Atlas

Atlases are cached by path, so many sprites can load the same file without fetching it again. Assign the same atlas to each sprite, and define animations on each one.

## Trimmed Atlases

Packers often crop transparent edges to save space. The atlas records how much was trimmed, and Vex.js uses it to draw each frame in the right place, so animations don't jitter between frames.

## Troubleshooting

- **Nothing is happening**: check the prefix. If it matches no frames, the animation has no frames to play. Log `this.hero.frames.map((f) => f.name)` to see the real names.
- **The whole spritesheet appears**: The sprite was drawn before the atlas was assigned. Hide it until the promise resolves.
- **A `404` in the console for the atlas**: The path is relative to the page, not to your JavaScript file.
