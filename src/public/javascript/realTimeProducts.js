const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("add product", input.value);
        input.value = '';
    }
});
