const mysql = require('mysql2'); //使用

// localhost use
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'otis',
//   password: 'otis',
//   database: 'zscss_database',
//   waitForConnections: true, // 等待连线
//   connectionLimit: 10, // 连线资料库个数设定
//   queueLimit: 0, // 无限制连线人数
//   multipleStatements: true, // 多個語句（mysql）
// });

// heroku database v2
const pool = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net' || 'localhost',
  user: 'b6f919e203c945' || 'otis',
  password: 'abe5210f' || 'otis',
  database: 'heroku_74e9d3700350a68' || 'zscss_database',
  waitForConnections: true, // 等待连线
  connectionLimit: 10, // 连线资料库个数设定
  queueLimit: 0, // 无限制连线人数
});

module.exports = pool.promise();
