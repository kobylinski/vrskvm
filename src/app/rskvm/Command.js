const { spawn } = require("child_process");

function command(command) {
  this.command = command;
  this.handlers = {};
  this.process = null;
  this.data = [];
  this.error = [];
}

command.prototype = Object.assign(command.prototype, {
  on(type, callback) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(callback);
    return this;
  },
  call(type, data) {
    if (this.handlers[type] && this.handlers[type].length) {
      let i = this.handlers[type].length;
      for (; i--; ) {
        this.handlers[type][i](data);
      }
    }
  },

  run() {
    this.process = spawn(process.env.npm_package_vrskvm_command, this.command);
    this.process.stdout.on("data", (buff) => {
      const data = buff.toString("utf8");
      this.data.push(data);
      this.call("data", data);
    });
    this.process.stderr.on("data", (buff) => {
      const error = buff.toString("utf8");
      this.error.push(error);
      this.call("error", error);
    });
    this.process.on("exit", (code) => {
      this.call("exit", {
        code,
        data: this.data.map((line) => line.trim()).join("\n"),
        error: this.error.map((line) => line.trim()).join("\n"),
      });
      this.process = null;
    });
  },
});

module.exports = command;
