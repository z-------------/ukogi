const isRenderer = (process && process.type === "renderer");
const ipc = require("electron")[isRenderer ? "ipcRenderer" : "ipcMain"];

let attached = [];
let listeners = {};

/**
 * Register a handler for an IPC channel
 * @param {string} channel - Name of the channel
 * @param {function} callback - Called with arguments (event, arg, reply)
 */
const on = (channel, callback) => {
  ipc.on(channel, (e, arg) => {
    callback(e, arg, (replyArg) => {
      e.reply(channel + "-reply", {
        _transactionUUID: arg._transactionUUID,
        arg: replyArg
      });
    });
  });
};

/**
 * Send a message through an IPC channel and receive the response
 * @param {string} channel - Name of the channel
 * @param {*} arg - Argument to pass
 * @param {function} callback - Called with arguments (event, arg)
 */
const send = (channel, arg, callback) => {
  const id = uuid();
  if (attached.indexOf(channel) === -1) {
    ipc.on(channel + "-reply", (e, arg) => {
      const listener = listeners[arg._transactionUUID];
      if (listener) {
        listener(e, arg.arg);
        delete listeners[arg._transactionUUID];
      }
    });
    attached.push(channel);
  }
  ipc.send(channel, { _transactionUUID: id, arg });
  listeners[id] = callback;
};

module.exports = { on, send };
