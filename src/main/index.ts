import { app, BrowserWindow, session } from "electron";
import path from "path";
import os from "os";

let mainWindow: BrowserWindow | null;

function createWindow() {
  // create the browser window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    webPreferences: {
      nodeIntegration: true
      //   preload: path.resolve(__dirname, "./preload.ts")
    }
  });

  const url = process.env.ELECTRON_ENV === "dev" ? "http://localhost:7000" : path.resolve(__dirname, "./dist/index.html");

  mainWindow.loadURL(url);

  // devtools
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// app.on("ready", async () => {
//   await session.defaultSession.loadExtension(path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Profile 1/Extensions/pfgnfdagidkfgccljigdamigbcnndkod/0.9.26_0'));
//   await session.defaultSession.loadExtension(path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Profile 1/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.13.4_0'));
// });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (mainWindow === null) createWindow();
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
});
