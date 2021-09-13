import { mount } from "redom";
import { wire } from "redom-state";
import state from "redom-state";
import App from "./App";

const setImagesList = wire((state, list) => ({
  ...state,
  images: list,
}));
const setEnabled = wire((state) => ({
  ...state,
  enabled: true,
}));

state(mount(document.body, new App()), () => {
  const ready = false;
  const enabled = typeof window.vrskvm !== "undefined";

  if (enabled) {
    window.vrskvm
      .getImagesList()
      .then(({ code, error, data }) => {
        if (!code) {
          setImagesList(data);
          setEnabled();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return {
    ready,
    enabled,
    images: {},
    nodes: {},
  };
});
