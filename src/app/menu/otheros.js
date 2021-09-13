const { is } = require("electron-util");
const help = require("./help");
const debug = require("./debug");

module.exports = ({ handlePreferences }) => {
  return [
    {
      role: "fileMenu",
      submenu: [
        {
          label: "Settings",
          accelerator: "Control+,",
          click: handlePreferences,
        },
        {
          type: "separator",
        },
        {
          role: quit,
        },
      ],
    },
    ...(is.development
      ? {
          label: "Debug",
          submenu: debug,
        }
      : {}),
    help,
  ];
};
