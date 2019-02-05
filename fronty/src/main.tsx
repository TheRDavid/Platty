import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as frontendConfig from ".././settings/frontendConfig.json";
import * as appConfig from "../settings/app.json";
class MainWindow extends BrowserWindow {
  init() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
    // Create the browser window.
    this.setSize(frontendConfig["windowWidth"], frontendConfig["windowHeight"]);
    this.setTitle(frontendConfig["appTitle"] + " ");
    if (frontendConfig["showVersionInTitle"])
      this.setTitle(this.getTitle().concat(" " + (appConfig.build + 1)));
    this.setFullScreen(frontendConfig["fullscreen"]);
    this.setPosition(0, 0);
    // and load the index.html of the app.
    this.loadFile(path.join(__dirname, "../../index.html"));
    // Open the DevTools.
    this.webContents.openDevTools();
    this.on("closed", () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      this.destroy();
    });
    // Emitted when the window is closed.
  }
}
var window;
app.on("ready", () => {
  window = new MainWindow();
  window.init();
});
app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (window === null) {
    window = new MainWindow();
    window.init();
  }
});
