const { app, shell } = require("electron");

module.exports = [
  {
    label: "Show App Data",
    click() {
      shell.openPath(app.getPath("userData"));
    },
  },
  {
    label: "Delete App Data",
    click() {
      shell.trashItem(app.getPath("userData"));
      app.relaunch();
      app.quit();
    },
  },
];
