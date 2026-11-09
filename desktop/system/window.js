import { BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { _registerShortcuts } from "./shortcuts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createWindow() {
  const desktop = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true, // Guarantees the canvas gets exact 800x600 inside borders.
    autoHideMenuBar: true, // Hides the default File/Edit menu bar for a clean game look.
    backgroundColor: "#111111",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // TODO: Change this in the mere future!
  // Lock to 4:3 aspect ratio so pixel art doesn't stretch.
  desktop.setAspectRatio(4 / 3);
  desktop.setMinimumSize(480, 360);

  // Attach keyboard shortcuts for developer use.
  _registerShortcuts(desktop);

  // Load the debug menu /  game.
  desktop.loadFile(path.join(__dirname, "../debug/index.html"));

  return desktop;
}
