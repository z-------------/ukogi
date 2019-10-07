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
| callback | <code>function</code> | Called with arguments (event, arg, reply) |

<a name="send"></a>

## send(channel, arg, callback)
Send a message through an IPC channel and receive the response

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | Name of the channel |
| arg | <code>\*</code> | Arguments to pass |
| callback | <code>function</code> | Called with arguments (event, arg) |

