import { app } from "electron";
import process from "node:process";

/**
 * Checks if the application was launched in development mode or with `npm run dev:desktop`.
 */
export const isDev = !app.isPackaged || process.argv.includes("--dev");

/**
 * Registers keyboard shortcuts on the game window.
 *
 * @param {import("electron").BrowserWindow} window
 */
export function _registerShortcuts(window) {
  window.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;

    //
    // STANDARD SHORTCUTS
    // Always active for players.
    //

    // F11: Toggle Fullscreen.
    if (input.key === "F11") _toggleFullscreen(window, event);

    //
    // DEVELOPER SHORTCUTS
    // Only active with `npm run dev:desktop` / in development.
    //

    // Ignore developer shortcuts if not in dev mode.
    if (!isDev) return;

    // F12 or Ctrl+Shift+I: Toggle Chrome DevTools
    if (
      input.key === "F12" ||
      (input.control && input.shift && input.key.toLowerCase() === "i")
    ) {
      _toggleDevTools(window, event);
    }

    // F5 or Ctrl+R: Reload current page.
    if (
      input.key === "F5" ||
      (input.control && input.key.toLowerCase() === "r")
    ) {
      _hotReloadState(window, event);
    }
  });
}

/**
 * Toggles to Fullscreen.
 *
 * @param {import("electron").BrowserWindow} win
 * @param {KeyboardEvent} event
 */
function _toggleFullscreen(win, event) {
  win.setFullScreen(!win.isFullScreen());
  event.preventDefault();
}

/**
 * Toggles to Chrome DevTools.
 *
 * @param {import("electron").BrowserWindow} win
 * @param {KeyboardEvent} event
 */
function _toggleDevTools(win, event) {
  win.webContents.toggleDevTools();
  event.preventDefault();
}

/**
 * Reloads the entire VexState.
 *
 * @param {import("electron").BrowserWindow} win
 * @param {KeyboardEvent} event
 */
function _hotReloadState(win, event) {
  win.reload();
  event.preventDefault();
}
