"use strict";
const { app, Menu, shell } = require("electron");
const { is } = require("electron-util");
const macosMenu = require("./menu/macos");
const otherosMenu = require("./menu/otheros");

module.exports = (config) => {
  if (is.macos) {
    return Menu.buildFromTemplate(macosMenu(config));
  }
  return Menu.buildFromTemplate(otherosMenu(config));
};
