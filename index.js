const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname, "views")
    };
    const fileName = "index.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

io.on('connection', (socket) => {
    console.log(socket.id);
    
    socket.on('send-message', (message) => {
        socket.broadcast.emit("receive-send",message);
    })
});




http.listen(port, () => {
    console.log("server de pé");
});
