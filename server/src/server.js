const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("user connected");

  /*送出訊息，只有自己收到回傳 client*/
  socket.on("getMessage", (message) => {
    socket.emit("getMessage", message);
  });

  /*送出訊息，讓所有人收到回傳 client*/
  socket.on("getMessageAll", (message) => {
    io.sockets.emit("getMessageAll", message);
  });

  /*送出訊息，除了自己外所有人收到回傳 client*/
  socket.on("getMessageLess", (message) => {
    socket.broadcast.emit("getMessageLess", message);
  });

  //送出中斷申請時先觸發此事件
  socket.on("disConnection", (message) => {
    //先通知同一 room 的其他 Client
    socket.emit("leaveRoom", `${message} 已離開聊天！`);
    //再送訊息讓 Client 做 .close()
    io.sockets.emit("disConnection", `${message} 已離開聊天！`);
  });
});

//*** Start of Routes ***//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//*** End of Routes ***//
const port = 3002;

server.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
