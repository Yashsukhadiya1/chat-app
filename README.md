# iChat App

A real-time chat application built with **Socket.IO** and **Node.js**.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

---

## Getting Started (After Cloning from GitHub)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "chat app"
```

### 2. Navigate to the server folder

```bash
cd nodeServer
```

### 3. Install dependencies

```bash
npm install
```

This installs both `socket.io` and `nodemon` listed in `package.json`.

### 4. Fix any vulnerabilities (optional but recommended)

```bash
npm audit fix
```

---

## Running the Server

### Option 1: Using npm start (recommended)

```bash
npm start
```

This runs `nodemon index.js` via the start script in `package.json`.

### Option 2: Using npx nodemon

```bash
npx nodemon .\index.js
```

### Option 3: Install nodemon globally, then run directly

```bash
npm install -g nodemon
nodemon index.js
```

> Note: If you run `nodemon` directly without installing it globally or using `npx`, you'll get:
> `'nodemon' is not recognized as an internal or external command`
> Use `npm start` or `npx nodemon` to avoid this.

---

## How It Works

The server runs on **port 8000** using Socket.IO.

| Event | Direction | Description |
|---|---|---|
| `new-user-joined` | Client → Server | User joins the chat with a username |
| `user-joined` | Server → Others | Broadcasts that a new user joined |
| `send` | Client → Server | User sends a message |
| `receive` | Server → Others | Broadcasts the message to all other users |
| `disconnect` | Auto | Notifies others when a user leaves |

---

## Opening the Frontend

The frontend runs via **Live Server** (VS Code extension) at:

```
http://127.0.0.1:5500/
```

Make sure the Node.js server is running on port `8000` **before** opening the chat, otherwise Socket.IO won't connect.

> To start Live Server: right-click `index.html` in VS Code → **Open with Live Server**

---

## Project Structure

```
chat app/
├── index.html          # Frontend UI
├── css/
│   └── style.css       # Styles
├── js/
│   └── client.js       # Socket.IO client logic
├── nodeServer/
│   ├── index.js        # Node + Socket.IO server
│   ├── package.json    # Dependencies and scripts
│   └── node_modules/   # Installed packages
├── logo192.png
├── certificate.jpg
└── ting.mp3            # Message sound
```
