const { BrowserWindow, app } = require("electron");
const path = require("path");

module.exports = async ({
  title,
  width = 600,
  height = 400,
  closeHandler = null,
  file,
}) => {
  const win = new BrowserWindow({
    title,
    width,
    height,
    webPreferences: {
      nativeWindowOpen: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });

  win.on("ready-to-show", () => {
    win.show();
  });
  win.on("closed", () => {
    if (null !== closeHandler) {
      closeHandler();
    }
  });

  await win.loadFile(file);
  return win;
};
