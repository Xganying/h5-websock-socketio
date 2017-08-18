var app = require('http').createServer() 
var io = require('socket.io')(app);

app.listen(3003);

io.on('connection', function (socket) {
    // socketio 可以直接发送一个对象
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});