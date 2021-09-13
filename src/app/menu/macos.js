const { appMenu, is } = require("electron-util");
const help = require("./help");
const debug = require("./debug");

module.exports = ({ handlePreferences }) => {
  return [
    appMenu([
      {
        label: "Preferences",
        accelerator: "Command+,",
        click: handlePreferences,
      },
    ]),
    {
      role: "fileMenu",
      submenu: [
        ...(is.development
          ? [
              ...debug,
              {
                type: "separator",
              },
            ]
          : []),
        {
          role: "close",
        },
      ],
    },
    help,
  ];
};
