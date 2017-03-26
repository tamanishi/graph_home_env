const gs = require('google-spreadsheet');
const app = require('express')();

const my_book = new gs('18PygxLjeC2AvxMe-vW1vG1V0M8TcrSV7-ycGm4FSPws');
const credentials = require(__dirname + '/gs_credentials.json');

app.get('/', (req, res) => {
  let my_sheet;
  my_book.useServiceAccountAuth(credentials, (err) => {
    my_book.getInfo( (err, data) => {
      my_sheet = data.worksheets[0];
      console.log(my_sheet);
      res.send(JSON.stringify(my_sheet));
    });
  });
});

app.listen(3000);

