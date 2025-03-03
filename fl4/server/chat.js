// /server/chat.js
const socketIo = require('socket.io');

module.exports = function(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');
        
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('chatMessage', (msg) => {
            io.emit('chatMessage', msg);
        });
    });
};