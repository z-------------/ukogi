const uuid = require("uuid/v4");

const isRenderer = (process && process.type === "renderer");
const ipc = require("electron")[isRenderer ? "ipcRenderer" : "ipcMain"];

const REPLY_CHANNEL_SUFFIX = "__UKOGI-REPLY__";

let attached = [];
let listeners = {};

/**
 * Register a handler for an IPC channel
 * @param {string} channel - Name of the channel
 * @param {function(Event, *, function(*))} callback - Callback to run when a message is received on this channel, called with arguments (event, arg, reply). Arguments passed to reply(arg) will be received by the callback in the corresponding `ukogi.send` call.
 * @example
 * ukogi.on("my-channel", (event, arg, reply) => {
 *   if (arg.flag) reply(42);
 * });
 */
const on = (channel, callback) => {
  ipc.on(channel, (e, arg) => {
    callback(e, arg, (replyArg) => {
      e.reply(channel + REPLY_CHANNEL_SUFFIX, {
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
 * @param {function(Event, *)} callback - Callback to run when a reply is received on this channel, called with arguments (event, arg). Arguments passed to the corresponding `ukogi.on` call's reply(arg) will be received here.
 * @example
 * ukogi.send("my-channel", { flag: true }, (event, arg) => console.log(arg)); // -> 42
 */
const send = (channel, arg, callback) => {
  const id = uuid();
  if (attached.indexOf(channel) === -1) {
    ipc.on(channel + REPLY_CHANNEL_SUFFIX, (e, arg) => {
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
