const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3'); // Load the notification sound

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play(); // Play sound for incoming messages
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message); // Emit the message to the server
    messageInput.value = ''; // Clear the input field after sending
});

let userName;
do {
    userName = prompt("Enter your name to join");
} while (!userName || userName.trim() === '');

socket.emit('new-user-joined', userName);

socket.on('user-joined', userName => {
    append(`${userName} joined the chat`, 'right');
});
socket.on('receive', data => {
    append(`${data.userName}: ${data.message}`, 'left');
});
socket.on('left', userName => {
    append(`${userName} left the chat`, 'left');
});