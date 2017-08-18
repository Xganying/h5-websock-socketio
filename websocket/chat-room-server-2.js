// chat room server

var ws = require('nodejs-websocket');

var PORT = 3002;
var clientCount = 0;

var server = ws.createServer(function(conn){
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user ' + clientCount;
    let msg = {};
    msg.type = "enter";
    msg.data = conn.nickname + ' comes in ';
    broadcast(JSON.stringify(msg));
    conn.on("text", function(str){
        console.log("Received  " + str);
        let msg = {};
        msg.type = "message";
        msg.data = conn.nickname +" : "+ str;
        broadcast(JSON.stringify(msg));
    });
    conn.on("close", function(code, reason){
        console.log("Connection close");
        let msg = {};
        msg.type = "leave";
        msg.data = conn.nickname + ' leave';
        broadcast(JSON.stringify(msg));
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