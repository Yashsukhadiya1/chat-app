# nodeServer/index.js — Line by Line Explanation

## What is this file?
This is the backend Node.js server. It manages all socket connections, tracks connected users, and relays messages between clients in real time.

---

## Full Code Breakdown

```js
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});
```
Creates and starts the Socket.IO server on port 8000.

- `require('socket.io')` — imports the Socket.IO library from `node_modules`.
- `(8000, {...})` — immediately calls it with port 8000 and config options.
- `cors: { origin: '*' }` — allows connections from any origin (any URL). In production you'd restrict this to your frontend's domain for security.
- No separate `http` server is needed here — Socket.IO creates one internally.

---

```js
const users = {};
```
An object used as a dictionary to map socket IDs to usernames.

- Key: `socket.id` (a unique string assigned by Socket.IO to each connection)
- Value: the username the user entered
- Example: `{ "abc123": "Yash", "xyz789": "Gauri" }`

---

```js
io.on('connection', socket => {
```
Listens for new client connections.
- Fires every time a browser opens the chat page and connects.
- `socket` is the individual connection object for that specific user — each user gets their own `socket`.

---

```js
    socket.on('new-user-joined', userName => {
        console.log(`${userName} joined the chat`);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });
```
Handles the event when a new user enters their name and joins.

- `socket.on('new-user-joined', ...)` — listens for this event emitted by the client.
- `console.log(...)` — logs to the server terminal for debugging.
- `users[socket.id] = userName` — stores the username linked to this socket's ID.
- `socket.broadcast.emit('user-joined', userName)` — sends the `user-joined` event to **all other connected clients** except the sender.

---

```js
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            userName: users[socket.id]
        });
    });
```
Handles an incoming message from a user and broadcasts it to everyone else.

- `socket.on('send', ...)` — listens for the `send` event emitted by the client when they click Send.
- `socket.broadcast.emit('receive', {...})` — sends the `receive` event to all other clients.
- The payload is an object with `message` (the text) and `userName` (looked up from the `users` dictionary using `socket.id`).
- The sender does NOT receive this — `broadcast` excludes the sender. The sender already sees their own message via `append()` in `client.js`.

---

```js
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
```
Handles when a user closes the tab or loses connection.

- `disconnect` is a built-in Socket.IO event — fires automatically when a socket disconnects.
- `socket.broadcast.emit('left', users[socket.id])` — notifies all other users with the disconnected user's name.
- `delete users[socket.id]` — removes the user from the dictionary to free memory.

---

## Data Flow Summary

```
Client A types message → socket.emit('send', msg)
        ↓
Server receives 'send' event
        ↓
Server does socket.broadcast.emit('receive', { userName, message })
        ↓
All other clients receive 'receive' event → append to chat UI
```

---

## Interview Questions on nodeServer/index.js

**Q: What is Node.js?**
A: A JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript on the server side, outside the browser.

**Q: What is Socket.IO?**
A: A library that enables real-time, event-based bidirectional communication between server and clients. It uses WebSockets with HTTP long-polling as fallback.

**Q: What is the difference between `emit` and `broadcast.emit`?**
A: `socket.emit(...)` sends to that specific client only. `socket.broadcast.emit(...)` sends to all connected clients except the sender. `io.emit(...)` sends to everyone including the sender.

**Q: What is CORS and why is `origin: '*'` used here?**
A: CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from different origins. `origin: '*'` disables this restriction. In production, replace `'*'` with your actual frontend URL.

**Q: Why use `socket.id` as the key in the `users` object?**
A: Each socket connection gets a unique ID assigned by Socket.IO. It's the most reliable way to identify a specific user's connection, even if two users have the same name.

**Q: What happens if you don't `delete users[socket.id]` on disconnect?**
A: The `users` object keeps growing with stale entries for disconnected users, causing a memory leak over time.

**Q: What is `require()` in Node.js?**
A: The CommonJS module system function used to import packages or files. Equivalent to `import` in ES Modules.

**Q: What is the difference between WebSocket and HTTP?**
A: HTTP is request-response — the client must ask, the server responds. WebSocket is a persistent two-way connection — either side can send data at any time without a new request.

**Q: What is an event-driven architecture?**
A: A pattern where the flow of the program is determined by events (user actions, messages, connections). Node.js and Socket.IO are built on this model — code runs in response to events, not in a sequential top-to-bottom flow.

**Q: What does `nodemon` do?**
A: Watches your Node.js files for changes and automatically restarts the server when you save. Useful during development so you don't have to manually stop and restart.
