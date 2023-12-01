const express = require('express');
// const moment = require('moment-timezone');
const upload = require(__dirname + '/upload-module');
const db = require(__dirname + '/db_connect');

const router = express.Router();

/* ----- socket ----- */
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

module.exports = (io) => {
  //http://localhost:3009/chat/
  router.get('/', (req, res) => {
    res.send('user chat room start - william');
  });

  // chatroom001 ｜ 取得聊天室資料
  //http://localhost:3009/chat/chatroom/4
  router.get('/chatroom/:sid?', (req, res) => {
    let sid = req.params.sid;
    const sql = ` SELECT m1.sid, m1.uuid, m1.msg, m1.created_at
                FROM message m1
                JOIN message m2 ON m1.uuid = m2.uuid
                WHERE m2.sid = ${sid}
                ORDER BY m1.created_at ASC`;
    db.query(sql).then((results) => {
      const output = {
        body: '',
        state: null,
      };
      if (results.length > 0) {
        output.state = 200;
        output.body = results[0];
      } else {
        output.state = 404;
      }
      res.json(output);
    });
  });

  // chatroom002 ｜ 建立聊天室資料
  // http://localhost:3009/chat/createmsg
  router.post('/createmsg', upload.none(), (req, res) => {
    const result = req.body;
    // 即將response出去的資料
    const output = {
      body: '',
      state: null,
    };

    const sql = `INSERT INTO message ( uuid, sid, msg ) VALUES ( ?, ?, ? )`;

    let insert_msg = [result.uuid, result.sid, result.msg];

    // basic info data
    const basicInfo = db.query(sql, insert_msg).then(([results]) => {
      if (results.affectedRows && results.insertId) {
        // 回填資料
        output.state = 200;
        output.body = 'create message success!';

        // connect socket
        // io.sockets.in(result.roomId).emit(NEW_CHAT_MESSAGE_EVENT, result.msg);
      } else {
        output.state = 404;
      }
      return output; // 回傳資料
    });

    basicInfo.then((outRes) => {
      res.json(outRes); // 顯示給前端
    });
  });

  return router; // 返回 router，這樣它可以被主文件使用
};
// module.exports = router;
