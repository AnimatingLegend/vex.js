import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { BrowserWindow } from "electron";
import { _registerShortcuts } from "./shortcuts.js";

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

  const projectIndex = path.join(process.cwd(), "index.html");
  // Load your project, or fallback to your debug menu if its not found.
  if (fs.existsSync(projectIndex)) {
    desktop.loadFile(projectIndex);
  } else {
    desktop.loadFile(path.join(import.meta.dirname, "../debug/index.html"));
  }

  return desktop;
}
