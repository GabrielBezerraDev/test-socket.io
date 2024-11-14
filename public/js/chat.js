import { io } from "https://cdn.socket.io/4.8.0/socket.io.esm.min.js";
const bodyText = document.querySelector(".panelBodyText");
const input = document.querySelector("input");
const buttonSend = document.querySelector(".buttonSend");
const buttonTest = document.querySelector(".teste");
const socket = io();

buttonSend.addEventListener("click" , () => {
    bodyText.innerHTML = `${bodyText.innerHTML} ${input.value}<br>`;
    socket.emit('send-message', input.value);
});

buttonTest.addEventListener("click" , () => {
    for(let i = 0; i < 50; i++){
        bodyText.innerHTML = `${bodyText.innerHTML} teste<br>`;
    }
});

socket.on('receive-send', (message) => {
    console.log(message);
    bodyText.innerHTML = `${bodyText.innerHTML} ${message}<br>`;
});


