const WebSocket = require('ws');
const server = new WebSocket.Server({
    port: 8081
});



let sockets = [];
server.on('connection', function(socket) {
    sockets.push(socket);

    // When you receive a message, send that message to every socket.
    socket.on('message', function(msg) {
        // sockets.forEach(s => s.send(msg));
        console.log(msg.toString());

        socket.send('__pong__');
    });

    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function() {
        sockets = sockets.filter(s => s !== socket);
    });
});