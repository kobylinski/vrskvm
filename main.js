"use strict";
const { app, Menu, ipcMain } = require("electron");
const { is } = require("electron-util");
const { createMainWindow, createMenu } = require("./src/app");
const path = require("path");
const unhandled = require("electron-unhandled");
const debug = require("electron-debug");
const reload = require("electron-reload");
const call = require("./src/app/rskvm/call");

unhandled();
debug();

const instance = {
  main: null,
};

app.setAppUserModelId(process.env.npm_package_name);
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on("second-instance", () => {
  if (instance.main) {
    if (instance.main.isMinimized()) {
      instance.main.restore();
    }
    instance.main.show();
  }
});

app.on("window-all-closed", () => {
  if (!is.macos) {
    app.quit();
  }
});

app.on("activate", async () => {
  if (!instance.main) {
    instance.main = await createMainWindow();
  }
});

app.whenReady().then(async () => {
  Menu.setApplicationMenu(
    createMenu({
      handlePreferences: () => {
        instance.main.webContents.send("show_preferences");
      },
    })
  );

  ipcMain.on("get-images-list", (event) => {
    call(["list:images"], {
      result: ({ code, data, error }) => {
        event.reply("images-list", {
          code,
          error,
          data: data
            .split("\n")
            .filter((line) => /^\s{2}\b/.test(line))
            .map((line) => {
              const res = /^\s*([a-z0-9\-\.]+)\s*\(.+\/\s*([^\)]+)\)/.exec(
                line
              );
              console.log(res);
              if (!res) {
                return false;
              }
              return res;
            })
            .reduce((all, item) => {
              all[item[1]] = item[2];
              return all;
            }, {}),
        });
      },
    });
  });

  ipcMain.on("open-external-link", (event, href) => {
    shell.openExternal(href);
  });

  instance.main = await createMainWindow({
    title: "vrskvm",
    width: 1400,
    height: 600,
    file: path.join(app.getAppPath(), "dist/window/index.html"),
    closeHandler: () => {
      instance.main = null;
    },
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

if (is.development) {
  reload(path.join(__dirname, "dist/window"), {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}
