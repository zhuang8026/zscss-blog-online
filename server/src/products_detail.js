const express = require('express');
const moment = require('moment-timezone');
// const upload = require(__dirname + '/upload-module');
const db = require(__dirname + '/db_connect');

const router = express.Router();

//http://localhost:3009/products/
router.get('/', (req, res) => {
  res.send('javaScript detail pages - william');
});

// 細節頁面資料
// localhost:3009/products_detail/detail/P00001
router.get('/detail/:id', (req, res) => {
  let id = req.params.id;
  let output = {};
  let penBlock = [];
  const sql = `
                SELECT PD.pId, PD.penTitle, PD.penStar, PD.penImg, PD.penStyle, PB.pen_title, PB.id, PB.pen_code, PB.is_text, PD.created_at 
                FROM penDetail AS PD 
                INNER JOIN penBlock AS PB 
                ON PD.penId = PB.bId 
                WHERE penId = "${id}" 
                ORDER BY PB.id
              `;
  db.query(sql).then(([results]) => {
    // console.log(results[0]);
    if (results.length > 0) {
      results.map((data, index) => {
        let resData = {
          id: data.id,
          pen_code: data.pen_code,
          pen_title: data.pen_title,
          is_text: data.is_text,
        };
        penBlock.push(resData);
      });

      output.results = {
        pId: results[0].pId,
        penImg: results[0].penImg,
        penStar: results[0].penStar,
        penTitle: results[0].penTitle,
        penStyle: results[0].penStyle,
        penBlock, // array
      };
    } else {
      output.results = {
        status: 'ND001',
      };
    }

    res.json(output);
  });
});

module.exports = router;
