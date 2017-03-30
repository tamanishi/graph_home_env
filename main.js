require('dotenv').config();
require('newrelic');
const gs = require('google-spreadsheet');
const express = require('express');
const app = express();

const my_book = new gs(process.env.gs_id);
// const credentials = require(__dirname + '/gs_credentials.json');
const credentials = JSON.parse(process.env.gs_credentials);

app.get('/lastday', (req, res) => {
  my_book.useServiceAccountAuth(credentials, (err) => {
    my_book.getInfo( (err, data) => {
      let my_sheet = data.worksheets[0];
      // console.log(my_sheet);
      const row_count = my_sheet.rowCount;
      var result = [];
      my_sheet.getRows({offset: row_count - 96 > 0 ? row_count - 96 : 0, limit: 96}, (err, rows) => {
        for (let row of rows) {
          let elm = {
            timestamp: row.timestamp,
            temperature: row.temperature,
            pressure: row.pressure,
            humidity: row.humidity
          };
          result.push(elm);
        }
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
      });
    });
  });
});

app.use(express.static('pages'));

app.listen(process.env.PORT || 3000);

