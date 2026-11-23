# `VexSound.js`

Wraps an audio element with play, pause, stop, volume, looping, and fades, so music and sound effects share one interface.

## Constructor

**`new VexSound(source = null)`**

| `source`         | Result                                                            |
| ---------------- | ----------------------------------------------------------------- |
| A string         | The path to an audio file. A new audio element is created for it. |
| An audio element | The element is used as it is.                                     |
| `null`           | A silent sound. Every method does nothing.                        |

## Properties

| Name     | Type                       | Description                                                                                                     |
| -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `audio`  | HTMLAudioElement or `null` | The underlying audio element. Use it for anything `VexSound` doesn't wrap, such as `currentTime` or `duration`. |
| `volume` | number                     | Volume from 0 to 1. Values outside that range are clamped.                                                      |
| `loop`   | boolean                    | Whether the sound repeats when it ends.                                                                         |

## Methods

- **`play(forceReset = false)`**: Starts or resumes playback. With `forceReset` set to true, it restarts from the beginning first.

- **`pause()`**: Pauses playback. Calling `play()` resumes from the same spot.

- **`stop()`**: Pauses playback and rewinds to the start.

- **`fade(toVolume, duration = 1, onComplete = null)`**: Changes the volume to `toVolume` over `duration` seconds. `onComplete` runs when the fade finishes. Starting a new fade cancels the one in progress, and the cancelled fade's `onComplete` never runs.

- **`fadeIn(duration = 1, toVolume = 1)`**: Sets the volume to 0, starts playback, and fades up to `toVolume`.

- **`fadeOut(duration = 1, onComplete = null)`**: Fades to silence and then calls `stop()`, so the sound doesn't keep playing silently. `onComplete` runs after it stops.

## Behavior to know

- **Browsers block sound until the player interacts with the page.** Calling `play()` before a click or key press fails. Start music from an input handler, or after a title screen that waits for a key.
- **Playing a sound that's already playing does nothing**, so the same effect won't overlap itself. For effects that should overlap, such as gunshots, use `VexGlobal.playSound(path, volume)`, which creates a new sound on every call.
- **Sounds keep playing when the state changes.** Stop or fade out your music before you call `VexGlobal.switchState()`.
- **Fades use **[`VexTween`](VexTween.md)**, so they run on game time and stop advancing if the game is stopped.

## Example

```js
create() {
  this.music = new VexSound("assets/music/level1.mp3");
  this.music.loop = true;
}

update(dt) {
  super.update(dt);

  // Start on the first input, because browsers block autoplay.
  const pressed = VexGlobal.mouse.justPressed || VexGlobal.keys.justPressed("Space");
  if (!this.musicStarted && pressed) {
    this.musicStarted = true;
    this.music.fadeIn(2, 0.6);
  }
}

leaveLevel() {
  this.music.fadeOut(1.5, () => VexGlobal.switchState(new MenuState()));
}
```
