var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var filename = function (name, date) {
  var newName = name.replace(/\..+/g, '');
  var newDate = Math.floor(date / 1000) % 10000000;
  return newName + '-' + newDate.toString();
};

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, filename(file.originalname, Date.now()));
  }
});

var upload = multer({ storage: storage });
var app = express();

// middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/:id', function (req, res) {
  res.sendFile('/srv/http/html/nuffin/uploads/' + req.params.id);
});

app.post('/', upload.single('file'), function (req, res) {
  console.log(req.file);
  res.send('localhost:2020/' + req.file.filename + '\n');
});

var server = app.listen(2020, function () {
  console.log('server is running');
});
