// chat room server

var ws = require('nodejs-websocket');

var PORT = 3001;
var clientCount = 0;

var server = ws.createServer(function(conn){
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user ' + clientCount;
    broadcast(conn.nickname + ' comes in ');
    conn.on("text", function(str){
        console.log("Received " + str);
       broadcast(str);
    });
    conn.on("close", function(code, reason){
        console.log("Connection close");
        broadcast(conn.nickname + ' leave')
    });
    conn.on('error', function(err){
        console.log("handle error")
        console.log(err);
    })
}).listen(PORT);

console.log("websocket server listening on port " + PORT);

// 广播消息
function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str);
    })
}