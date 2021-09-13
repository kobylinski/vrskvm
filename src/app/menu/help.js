const {
  openUrlMenuItem,
  debugInfo,
  openNewGitHubIssue,
} = require("electron-util");

module.exports = {
  role: "help",
  submenu: [
    openUrlMenuItem({
      label: "Github: vrskvm",
      url: "https://github.com/kobylinski/vrskvm",
    }),
    openUrlMenuItem({
      label: "Github: rskvm",
      url: "https://github.com/rjsocha/rskvm",
    }),
    {
      label: "Report an Issue",
      click() {
        openNewGitHubIssue({
          user: "kobylinski",
          repo: "rskvm",
          body: "Your issue description\n\n\n---\n\n" + debugInfo(),
        });
      },
    },
  ],
};
