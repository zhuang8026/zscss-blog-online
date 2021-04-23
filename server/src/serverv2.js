const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const DIS_CONNECT = "disconnect";

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("roomId:", socket.handshake.query);
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on(DIS_CONNECT, () => {
    console.log("dis-connect:", roomId);
    socket.leave(roomId);
  });

  /*送出訊息，讓所有人收到回傳 client*/
  socket.on("usersCallAdmin", (roomId) => {
    io.sockets.emit("usersCallAdmin", roomId);
  });
});

//*** Start of Routes ***//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//*** End of Routes ***//
const PORT = 3002;

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
