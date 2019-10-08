# ukogi

A wrapper for Electron IPC for both main and renderer processes.

## Functions

<dl>
<dt><a href="#on">on(channel, callback)</a></dt>
<dd><p>Register a handler for an IPC channel</p>
</dd>
<dt><a href="#send">send(channel, arg, callback)</a></dt>
<dd><p>Send a message through an IPC channel and receive the response</p>
</dd>
</dl>

<a name="on"></a>

## on(channel, callback)
Register a handler for an IPC channel

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | Name of the channel |
| callback | <code>function</code> | Callback to run when a message is received on this channel, called with arguments (event, arg, reply). Arguments passed to reply(arg) will be received by the callback in the corresponding `ukogi.send` call. |

**Example**  
```js
ukogi.on("my-channel", (event, arg, reply) => {
  if (arg.flag) reply(42);
});
```
<a name="send"></a>

## send(channel, arg, callback)
Send a message through an IPC channel and receive the response

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | Name of the channel |
| arg | <code>\*</code> | Argument to pass |
| callback | <code>function</code> | Callback to run when a reply is received on this channel, called with arguments (event, arg). Arguments passed to the corresponding `ukogi.on` call's reply(arg) will be received here. |

**Example**  
```js
ukogi.send("my-channel", { flag: true }, (event, arg) => console.log(arg)); // -> 42
```

## License

MIT License
