# iChat — Documentation Index

All code explanations and placement prep material for the iChat real-time chat app.

---

| File | Contents |
|---|---|
| `01_html_explanation.md` | index.html line by line + interview Q&A |
| `02_css_explanation.md` | style.css line by line + interview Q&A |
| `03_clientjs_explanation.md` | js/client.js line by line + interview Q&A |
| `04_serverjs_explanation.md` | nodeServer/index.js line by line + interview Q&A |
| `05_placement_prep.md` | Project intro, core concepts, all interview Q&A, scaling & security |

---

## Quick Revision — How the App Works

```
Browser (index.html + client.js)
        |
        | Socket.IO connection on port 8000
        |
Node.js Server (nodeServer/index.js)
        |
        | broadcast.emit to all other clients
        |
Other Browsers
```

1. User opens `index.html`, enters name → `socket.emit('new-user-joined', name)`
2. Server stores name, broadcasts `user-joined` to others
3. User types message, clicks Send → `socket.emit('send', message)`
4. Server broadcasts `receive` event with `{ userName, message }` to all others
5. User closes tab → server fires `disconnect`, broadcasts `left` event
