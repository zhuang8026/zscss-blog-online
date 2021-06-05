// 引入
const express = require("express"); // es5 // express => npm install --save express

// 建立 web server 物件
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session
const session = require("express-session"); // npm install express-session
const MysqlStore = require("express-mysql-session")(session); // npm install express-mysql-session
const db = require(__dirname + "/db_connect");
const sessionStore = new MysqlStore({}, db);

var credentials = require("./credential.js");
var cookieParser = require("cookie-parser");
app.use(cookieParser(credentials.cookieSecret));

app.use(express.static("public"));

app.use(
  session({
    saveUninitialized: false,
    resave: false, // 沒變更內容是否強制回存
    // secret = 加密用的字串，透過這個值去比對，可以自訂
    secret: "加密用的字串",
    store: sessionStore,
    cookie: {
      maxAge: 1200000, // session的存活時間 單位毫秒
    },
  })
);

const cors = require("cors");

const whitelist = [undefined, "http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    // 方法一
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
    // 方法二
    // callback(null, true); // 这样是允许全部IP使用，这样就不用 whitelist
  },
  // methods: ["GET", "POST"],
  // allowedHeaders: ["my-custom-header"],
  // credentials: true,
};
app.use(cors(corsOptions));

//*** Start of Routes - CROS ***//
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

/* ----- socket ----- */
const server = require("http").createServer(app, (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://zscss.com:*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
});
const io = require("socket.io")(server, {
  cors: {
    origin: corsOptions,
    methods: ["GET", "POST"],
  },
}); // 請參考 https://socket.io/docs/v3/handling-cors/

app.get("/", (req, res) => {
  // req=> 请求 res => 響應
  res.send(
    "hello! welcome to william node.js api. this api use zscss blog web. - v2"
  );

  // 測試 session
  req.session.userName = "Pusheen";
  var colorScheme = req.session.colorScheme || "dark";

  console.log(req.session); // Pusheen
  console.log(req.session.userName); // Pusheen
  console.log(colorScheme); // Dark
});

// 存储session
app.use((req, res, next) => {
  res.locals.sess = req.session || {}; // sess 是自己定义的session名称

  next();
});

// admin
app.use("/admin", require(__dirname + "/admin.js"));

// products
app.use("/products", require(__dirname + "/products.js"));

// products_detail.js
app.use("/products_detail", require(__dirname + "/products_detail.js"));

// socket.js
// app.use("/socket", require(__dirname + "/socket.js"));

// 404
app.use((req, res) => {
  res.type("text/html"); // 类型
  res.status(404); // 状态码
  res.send(
    `<img src="https://media3.giphy.com/media/jpWFza0noYgb6fOucQ/source.gif" alt="404">`
  );
});

/* ----- socket ----- */
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const DIS_CONNECT = "disconnect";
const ADMIN_ONLINE = "adminOnline"; // admin 上線通知
const USERS_CALL_ADMIN = "usersCallAdmin"; // 告訴admin有使用者使用聊天室

io.on("connection", (socket) => {
  console.log("user connected - socket");
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
  //   io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  // });

  socket.on(NEW_CHAT_MESSAGE_EVENT, (msg) => {
    io.sockets.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, msg);
  });

  // Leave the room if the user closes the socket
  socket.on(DIS_CONNECT, () => {
    socket.leave(roomId);
  });

  /* 送出訊息，讓 “所有” 人收到回傳 client */
  socket.on(USERS_CALL_ADMIN, (roomId) => {
    io.sockets.emit("usersCallAdmin", roomId);
  });

  /* admin 上線通知 */
  socket.on(ADMIN_ONLINE, (username) => {
    console.log("管理者已登入:", username);
    io.sockets.emit("adminOnline", username);
  });
});

// server 侦听 3009
const PORTS = process.env.PORT || 3009; // 符號修改
server.listen(PORTS, () => {
  console.log(
    `server work - app is running on port ${PORTS} - William-server control`
  );
});
