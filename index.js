var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);

// We are giving permissions individually to each file
// that will be requested on the application.
// Ideally, we would just give access to everything on their respective folders.

app.get('/', function(req, res){
  res.sendFile(__dirname + "/html/login.html");
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/script/jQuery.js", function(req, res){
    res.sendFile(__dirname + "/script/jQuery.js");
});

app.get("/script/WebWorker.js", function(req, res){
    res.sendFile(__dirname + "/script/WebWorker.js");
});

// On user connection log their connection in the server.
io.on('connection', function(socket){
  console.log('a user connected');
  // Same idea in case of disconnection.
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  // When a new message is received from the clients,
  // resend it it to them, so that they can visualize their own messages too.
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log("[%s] %s",new Date().toLocaleString(), msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
