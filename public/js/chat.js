import { io } from "https://cdn.socket.io/4.8.0/socket.io.esm.min.js";
const bodyText = document.querySelector(".panelBodyText");
const input = document.querySelector("input");
const button = document.querySelector("button");
const socket = io('http://localhost:3000');

button.addEventListener("click" , () => {
    bodyText.innerHTML = `${bodyText.innerHTML} ${input.value}<br>`;
});




function testChat(){
    for(let i = 0; i < 50; i++){
        bodyText.innerHTML = `${bodyText.innerHTML} teste<br>`;
    }
}