var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});

var upload = multer({ storage: storage });
var app = express();

// middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/uploads/:id', function (req, res) {
  res.sendFile('/srv/http/html/nuffin/uploads/' + req.params.id);
});

app.post('/', upload.single('file'), function (req, res) {
  console.log(req.file);
  res.send('localhost:2020/' + req.file.path + '\n');
});

var server = app.listen(2020, function () {
  console.log('server is running');
});
