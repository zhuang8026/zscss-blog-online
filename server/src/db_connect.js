const mysql = require("mysql2"); //使用

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "otis",
//   password: "otis",
//   database: "zscss_database",
//   waitForConnections: true, // 等待连线
//   connectionLimit: 10, // 连线资料库个数设定
//   queueLimit: 0, // 无限制连线人数
// });

// heroku database v2
const pool = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com" || "localhost",
  user: "b9105bffb96221" || "otis",
  password: "bbdf7070" || "otis",
  database: "heroku_8c6a75983fbbceb" || "zscss_database",
  waitForConnections: true, // 等待连线
  connectionLimit: 10, // 连线资料库个数设定
  queueLimit: 0, // 无限制连线人数
});

module.exports = pool.promise();
