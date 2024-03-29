const express = require('express');
// const moment = require("moment-timezone");
const upload = require(__dirname + '/upload-module');
const { generateToken, verifyToken } = require('./admin_token'); // 引入您的令牌生成和验证模块
const db = require(__dirname + '/db_connect');

const router = express.Router();

// 測試連線
// http://localhost:3009/admin/
router.get('/', (req, res) => {
  // console.log(req.session); // Pusheen
  res.send('admin login page - william - location');
});

// admin登入 | signin 使用
// http://localhost:3009/admin/login
router.post('/signin', upload.none(), (req, res) => {
  //res.render('address-book/login');
  // console.log(req.body);

  const output = {
    body: req.body,
    state: null,
    nickname: null,
    userimg: null,
    loginStatus: false,
  };
  const sql = 'SELECT * FROM admin WHERE account=? AND password=SHA1(?)';
  const upDateSql = 'UPDATE `admin` SET `loginStatus`=? WHERE `account`=?';

  db.query(sql, [req.body.account, req.body.password]).then(([result]) => {
    if (result && result.length > 0) {

      // 存取 user 登入狀態
      db.query(upDateSql, [1, result[0].account]).then(([results]) => {
        if (results.affectedRows && results.changedRows) {
          console.log('login ok');
        }
      });
      output.loginStatus = true;
      output.state = 200;
      output.sid = result[0].sid;
      output.nickname = result[0].nickname;
      output.userimg = result[0].userimg;
      // req.session.adminSession = result[0]; // adminSession 这是自己定义的，将result的资料赋值给 admin

      // 產生 JWT
      const payload = {
        id: result[0].sid,
        userName: result[0].nickname,
      };

      // 取得 API Token
      const token = generateToken(payload);
      output.token = token;

    } else {
      output.state = 404;
    }
    res.json(output);
  });
});

// 受保护的端点，需要验证令牌
router.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];; // 从请求头中获取令牌
  const decoded = verifyToken(token);
  const output = {
    state: 200,  
    message: '', 
    decoded: '' 
  };

  if (!token) {
    output.state = 401;
    output.message = '沒有提供令牌';
  }

  if (!decoded) {
    output.state = 401;
    output.message = '令牌無效';
  }

  // 在这里执行受保护资源的操作
  if(token && decoded) {
    output.state = 200;
    output.message = '存取受保護資源成功';
    output.decoded = decoded;
  }

  res.json(output);
});

// admin登出 | signOut 使用
// http://localhost:3009/admin/signOut
router.post('/signOut', upload.none(), (req, res) => {
  const output = {
    loginStatus: '',
    message: '',
  };
  const sql = 'UPDATE `admin` SET `loginStatus`=? WHERE `account`=?';
  db.query(sql, [0, req.body.account]).then(([results]) => {
    if (results.affectedRows && results.changedRows) {
      output.loginStatus = false;
      output.message = 'sign out ok';
      res.json(output);
    } else {
      output.message = 'data has been change';
      res.json(output);
    }
  });
});

// 全部admin | admin list 使用
// http://localhost:3009/admin/allAdmin
router.get('/allAdmin', (req, res) => {
  const sql = 'SELECT sid, account, nickname, userimg, loginStatus FROM admin WHERE 1';
  db.query(sql).then((results) => {
    // console.log(results);
    res.json(results[0]);
  });
});

// admin 確認是否有帳號 | signin 使用
// http://localhost:3009/admin/checkinAccount
router.post('/checkinAccount', upload.none(), (req, res) => {
  const output = {
    body: req.body,
    state: null,
    nickname: null,
  };
  const sql = 'SELECT * FROM admin WHERE account=?';
  // console.log(req.body);
  db.query(sql, [req.body.account]).then(([result]) => {
    // console.log(result);
    if (result && result.length > 0) {
      output.state = 200;
      output.nickname = result[0].nickname;
    } else {
      output.state = 404;
    }
    res.json(output);
  });
});

// backend 後台管理使用 | backend001 ｜ 新增(inert into)
// http://localhost:3009/admin/backendCreate
router.post('/backendCreate', upload.none(), (req, res) => {
  const requestList = req.body;

  // 即將response出去的資料
  const output = {
    body: '',
    state: null,
  };

  const sql = `INSERT INTO penDetail ( penId, penTitle, penImg, penStyle, penStar ) VALUES ( ?, ?, ?, ?, ? )`;
  const sql2 = `INSERT INTO penBlock ( bId, pen_title, pen_code, is_text ) VALUES ?`;

  if (
    requestList.title === '' &&
    requestList.style === '' &&
    requestList.star === ''
  ) {
    output.state = 404;
    res.json(output);
    return;
  }

  let insert_detail = [
    requestList.penId,
    requestList.title,
    requestList.img,
    requestList.style,
    requestList.star,
  ];

  /**
   * insert到pen_block
   * 數據結構: [[],[],[]....]
   */
  let insert_block = requestList.blockData.map((reqData, index) => {
    let penCode = 0;
    if (reqData.pen_code) {
      penCode = 1;
    }
    return [requestList.penId, reqData.pen_title, penCode, reqData.is_text];
  });

  // basic info data
  const basicInfo = db.query(sql, insert_detail).then(([results]) => {
    if (results.affectedRows && results.insertId) {
      output.state = 200;
    } else {
      output.state = 404;
    }
    return output;
  });

  // note info data
  const noteInfo = db.query(sql2, [insert_block]).then(([results]) => {
    if (results.affectedRows && results.insertId) {
      output.state = 200;
    } else {
      output.state = 404;
    }
    return output;
  });

  Promise.all([basicInfo, noteInfo]).then((arrVal) => {
    res.json(output);
  });
});

// backend 後台管理使用 | backend002 ｜ 修改(Edit)
// http://localhost:3009/admin/backendEdit
router.post('/backendEdit', upload.none(), (req, res) => {
  const output = {
    body: req.body,
    state: null,
  };

  const sql_v1 =
    'UPDATE penDetail SET penStar=?, penImg=?, penStyle=?, penTitle=? WHERE penId=?';
  const sql_v2 =
    'UPDATE penBlock SET pen_title=?, pen_code=?, is_text=? WHERE id=?';
  const result = req.body;

  let update_detail = [
    result.star,
    result.img,
    result.style,
    result.title,
    result.penId,
  ];

  /**
   * insert到pen_block
   * 數據結構: [[],[],[]....]
   */
  let update_block = result.blockData.map((data, index) => {
    let penCode = 0;
    if (data.pen_code) {
      penCode = 1;
    }
    return [data.pen_title, penCode, data.is_text, data.id];
  });

  let detail = db.query(sql_v1, update_detail).then(([result]) => {
    if (result && result.affectedRows) {
      output.state = 200;
    } else {
      output.state = 404;
    }
  });

  let block = update_block.map((item, index) => {
    db.query(sql_v2, item).then(([result]) => {
      if (result && result.affectedRows) {
        output.state = 200;
      } else {
        output.state = 404;
      }
    });
  });

  Promise.all([detail, block]).then((pre) => {
    res.json(output);
  });
});

// backend 後台管理使用 | backend003 ｜ 刪除(delete)
// http://localhost:3009/admin/backendDelete
router.post('/backendDelete', upload.none(), (req, res) => {
  const output = {
    body: req.body,
    state: null,
    detailStatus: '',
    blockStatus: '',
  };

  const sql_v1 = `DELETE FROM penDetail WHERE penId=?`; // note title
  const sql_v2 = `DELETE FROM penBlock WHERE bId=?`; // note detail

  const penDetail = db.query(sql_v1, [req.body.penId]).then(([results]) => {
    if (results.affectedRows) {
      output.state = 200;
      output.detailStatus = 'completed';
    } else {
      output.state = 404;
      output.detailStatus = 'failed';
    }
    return output;
  });

  const penBlock = db.query(sql_v2, [req.body.penId]).then(([results]) => {
    if (results.affectedRows) {
      output.state = 200;
      output.blockStatus = 'completed';
    } else {
      output.state = 404;
      output.blockStatus = 'failed';
    }
    return output;
  });

  Promise.all([penDetail, penBlock]).then((reqList) => {
    res.json(output);
  });
});

module.exports = router;
