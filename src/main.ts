import { app, BrowserWindow, Menu, nativeImage, Tray } from "electron";
import * as path from "path";

let tray;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
      nodeIntegration: true,
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const icon16 = nativeImage.createFromPath('assets/key-16x16.png')
  const icon32 = nativeImage.createFromPath('assets/key-32x32.png')
  const github = nativeImage.createFromPath('assets/github.png')
  const google = nativeImage.createFromPath('assets/google.png')
  const settings = nativeImage.createFromPath('assets/settings.png')
  tray = new Tray(icon16);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'OTP Codes', type: 'submenu', submenu: [
      { label: 'Github', type: 'normal', icon: github },
      { label: 'Google', type: 'normal', icon: google },
    ] },
    { label: 'SSH Keys', icon: icon32, type: 'submenu', submenu: [
      { label: 'Github SSH', type: 'radio', icon: github },
    ] },
    { type: 'separator' },
    { label: 'Settings', type: 'normal', icon: settings },
  ])
  
  tray.setContextMenu(contextMenu)

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
