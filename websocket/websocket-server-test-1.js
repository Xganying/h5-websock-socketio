// wsServer : npm install nodejs-websocket

var ws = require('nodejs-websocket');

var PORT = 3000;

// Stream server example : "hi" -> "HI"
var server = ws.createServer(function(conn){
    console.log("New connection");
    conn.on("text", function(str){
        console.log("Received " + str);
        conn.sendText(str); // .toUpperCase() + "!!!"
    });
    conn.on("close", function(code, reason){
        console.log("Connection close");
    });
    conn.on('error', function(err){
        console.log("handle error")
        console.log(err);
    })
}).listen(PORT);

console.log("websocket server listening on port " + PORT)