// NODE SERVER WHICH WILL HANDLE SOCKET.IO CONNECTIONS

const io = require('socket.io')(8000, {
    cors: {
        origin: '*', // Allow any origin (you can restrict it if needed)
    }
});

const users = {}; // To keep track of connected users

io.on('connection', socket => {

    // When a new user joins
    socket.on('new-user-joined', userName => {
        console.log(`${userName} joined the chat`);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    // When a user sends a message
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            userName: users[socket.id]
        });
    });

    // Handle disconnection
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        });
});

