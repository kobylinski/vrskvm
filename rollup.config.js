import bubble from "@rollup/plugin-buble";
import resolve from "@rollup/plugin-node-resolve";
import styles from "rollup-plugin-styles";
import cleaner from "rollup-plugin-cleaner";
import html from "@rollup/plugin-html";

const results = [
  {
    output: {
      dir: "./dist/window/",
      entryFileNames: "[name].[hash].js",
      assetFileNames: "[name].[hash].[ext]",
      format: "es",
      sourcemap: true,
    },
    input: {
      bundle: "src/window/index.js",
    },
    plugins: [
      cleaner({
        targets: [`./dist/window/`],
      }),
      styles({
        mode: "extract",
        minimize: true,
      }),
      resolve(),
      bubble({
        objectAssign: "Object.assign",
      }),
      html({
        title: "vrskvm",
        publicPath: "",
        fileName: "index.html",
        meta: [
          {
            "http-equiv": "Content-Security-Policy",
            content: "default-src 'self'; script-src 'self'",
          },
          {
            "http-equiv": "X-Content-Security-Policy",
            content: "default-src 'self'; script-src 'self'",
          },
        ],
      }),
    ],
  },
];

export default results;
