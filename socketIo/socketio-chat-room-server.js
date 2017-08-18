var app = require('http').createServer() // handler
var io = require('socket.io')(app);

var PORT = 3004;

app.listen(PORT);

var clientCount = 0;

io.on('connection', function (socket) {
    clientCount++;
    socket.nickname = 'user ' + clientCount;

    io.emit('enter', socket.nickname + ' comes in ');

    socket.on('message', function(str){
        io.emit('message', socket.nickname +" : " + str);
    })

    socket.on('disconnect', function(){
        io.emit('leave', socket.nickname + ' leave ');
    })
});

console.log("websocket server listening on port " + PORT);
