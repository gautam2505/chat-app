const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected.`)

    socket.on('message', data => {
        socket.broadcast.emit('message:received', data)
    })

    // when tab or browser window is closed
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left.`)
    })
})

server.listen(3000, () => {
    console.log('Chat server is running on 3000')
})