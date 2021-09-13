const { ipcRenderer, contextBridge } = require("electron");

const callbacks = {};

ipcRenderer.on("images-list", (event, arg) => {
  if (!callbacks.getImagesList) {
    console.error("Missing signal callback");
  }
  if (arg.code) {
    callbacks.getImagesList.fail(arg.error);
  } else {
    callbacks.getImagesList.done(arg.data);
  }
  callbacks.getImagesList = null;
});

contextBridge.exposeInMainWorld("vrskvm", {
  getImagesList() {
    return new Promise((done, fail) => {
      if (callbacks.getImagesList && callbacks.getImagesList.fail) {
        callbacks.getImagesList.fail();
      }
      callbacks.getImagesList = { done, fail };
      ipcRenderer.send("get-images-list");
    });
  },
});
