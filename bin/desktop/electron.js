import { app, BrowserWindow } from "electron";
import { createWindow } from "./system/window.js";
import process from "node:process";

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
