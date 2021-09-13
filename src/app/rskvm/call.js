const Command = require("./command");
const state = {
  queue: [],
  current: null,
  call() {
    if (this.queue.length && null === this.current) {
      this.current = this.queue.shift();
      this.current.run();
    }
  },
};

module.exports = (command, { data = () => {}, error = () => {}, result }) => {
  const cmd = new Command(command);
  cmd
    .on("data", data)
    .on("error", error)
    .on("exit", result)
    .on("exit", () => {
      state.current = null;
      state.call();
    });
  state.queue.push(cmd);
  state.call();
};
