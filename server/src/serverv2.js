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
const ADMIN_ONLINE = "adminOnline"; // admin 上線通知
const USERS_CALL_ADMIN = "usersCallAdmin"; // 告訴admin有使用者使用聊天室

const USER_STATUS = ["ONLINE", "OFFLINE"];

io.on("connection", (socket) => {
  // console.log("user connected");
  // console.log("roomId:", socket.handshake.query);
  // Join a conversation
  const { roomId } = socket.handshake.query;
  // socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on(DIS_CONNECT, () => {
    // console.log("dis-connect:", roomId);
    socket.leave(roomId);
  });

  // socket.on("private_chat", (params, fn) => {
  //   const receiver = users[params.receiver];
  //   params.createTime = moment().format("YYYY-MM-DD HH:mm:ss");
  //   const senderData = _.findWhere(userData, { username: params.sender });
  //   params.senderPhoto = (senderData || {}).photo;

  //   if (!params.senderPhoto) {
  //     const senderLen = params.sender.length;
  //     params.senderPhotoNickname = params.sender.substr(senderLen - 2);
  //   }
  //   fn(params);
  //   if (receiver && receiver.status === USER_STATUS[0]) {
  //     socket
  //       .to(users[params.receiver].socketId)
  //       .emit("reply_private_chat", params);
  //   } else {
  //     console.log(`${params.receiver} 不在线`);
  //     // 可以在做些离线消息推送处理
  //   }
  // });

  /*送出訊息，讓 “所有” 人收到回傳 client*/
  socket.on(USERS_CALL_ADMIN, (roomId) => {
    io.sockets.emit("usersCallAdmin", roomId);
  });

  /* admin 上線通知 */
  socket.on(ADMIN_ONLINE, (username) => {
    console.log("管理者已登入:", username);
    io.sockets.emit("adminOnline", username);
    // socket.username = username;
    // users[username] = {
    //   socketId: socket.id,
    //   status: USER_STATUS[0],
    // };
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
