const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    responseView(res,"index.html");
});

app.get('/tank-game', (req,res) => {
    responseView(res,"tank-game.html");
})

function responseView(res,fileName){
    const options = {
        root: path.join(__dirname, "views")
    };
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

io.on('connection', (socket) => {
    console.log(socket.id);
});

http.listen(port, () => {
    console.log("server de pé");
});
