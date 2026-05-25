# js/client.js — Line by Line Explanation

## What is this file?
This is the frontend JavaScript file. It connects to the Socket.IO server, handles sending/receiving messages, and updates the UI in real time.

---

## Full Code Breakdown

```js
const socket = io('http://localhost:8000');
```
Creates a Socket.IO connection to the server running on port 8000.
- `io()` is provided by the Socket.IO client library loaded in `index.html`.
- `socket` is the connection object — all communication happens through it.

---

```js
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
```
Grabs references to DOM elements:
- `form` — the form element used to detect when the user hits Send.
- `messageInput` — the text input field to read and clear the typed message.
- `messageContainer` — the chat box div where messages are displayed.

---

```js
var audio = new Audio('ting.mp3');
```
Creates an Audio object loaded with the notification sound file.
- This will be played whenever a new message arrives from another user.

---

```js
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();
    }
};
```
A reusable helper function that creates and displays a message bubble.

- `document.createElement('div')` — creates a new empty `<div>`.
- `messageElement.innerText = message` — sets the text content of the div.
- `classList.add('message')` — applies the `.message` CSS class (grey bubble styling).
- `classList.add(position)` — adds either `'left'` or `'right'` class to align the bubble.
- `messageContainer.append(messageElement)` — inserts the div into the chat box.
- `if (position === 'left')` — plays the ting sound only for incoming messages (not your own).

---

```js
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
```
Handles the Send button click (form submit event).

- `e.preventDefault()` — stops the browser from reloading the page on form submit (default behavior).
- `messageInput.value` — reads what the user typed.
- `append(..., 'right')` — shows your own message on the right side immediately.
- `socket.emit('send', message)` — sends the message to the server via Socket.IO.
- `messageInput.value = ''` — clears the input field after sending.

---

```js
let userName;
do {
    userName = prompt("Enter your name to join");
} while (!userName || userName.trim() === '');
```
Prompts the user to enter their name before joining.
- Uses a `do...while` loop to keep asking until a non-empty name is entered.
- `userName.trim() === ''` — catches names that are just spaces.

---

```js
socket.emit('new-user-joined', userName);
```
Sends the username to the server once the user enters their name.
- The server stores this name linked to the socket ID and broadcasts to others.

---

```js
socket.on('user-joined', userName => {
    append(`${userName} joined the chat`, 'right');
});
```
Listens for the `user-joined` event from the server.
- Triggered when someone else connects.
- Displays a join notification in the chat.

---

```js
socket.on('receive', data => {
    append(`${data.userName}: ${data.message}`, 'left');
});
```
Listens for incoming messages from other users.
- `data` contains `{ userName, message }` sent by the server.
- Displays the message on the left side and plays the ting sound.

---

```js
socket.on('left', userName => {
    append(`${userName} left the chat`, 'left');
});
```
Listens for the `left` event when another user disconnects.
- Displays a leave notification in the chat.

---

## Interview Questions on client.js

**Q: What is Socket.IO?**
A: A JavaScript library that enables real-time, bidirectional communication between browser and server over WebSockets (with fallback to HTTP polling).

**Q: What is the difference between `socket.emit` and `socket.on`?**
A: `emit` sends an event. `on` listens for an event. Together they form the event-driven communication model.

**Q: Why use `e.preventDefault()` on form submit?**
A: By default, submitting a form causes a page reload. `preventDefault()` stops that so we can handle it with JavaScript instead.

**Q: What does `document.createElement` do?**
A: Creates a new HTML element in memory. It doesn't appear on the page until you append it to the DOM.

**Q: Why is `do...while` used for the username prompt?**
A: To guarantee the prompt runs at least once and keeps repeating until valid input is given. A regular `while` loop would need a pre-check.

**Q: What is the difference between `innerText` and `innerHTML`?**
A: `innerText` sets plain text (safe, no HTML parsing). `innerHTML` parses HTML tags — risky if the content comes from user input (XSS vulnerability).

**Q: What is an event listener?**
A: A function that waits for a specific event (like `submit`, `click`) on a DOM element and runs when that event occurs.

**Q: What is `classList.add()`?**
A: A DOM method that adds a CSS class to an element without removing existing classes. Equivalent to manually editing the `class` attribute.
