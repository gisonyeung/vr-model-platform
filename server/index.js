var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(express.static('./src'));

var cache = {
  bundle: '',
  index: ''
}

app.get('/', function (req, res) {

  if (!cache.index) {
    cache.index = fs.readFileSync('./src/index.html', 'utf-8');
  }

  res.send(cache.index);
});

app.get('/__build__/bundle.js', function (req, res) {

  if (!cache.bundle) {
    cache.bundle = fs.readFileSync('./dist/bundle.js', 'utf-8');
  }

  res.send(cache.bundle);
});


app.listen(8080, function () {
  console.log('系统启动成功，访问 http://localhost:8080/');
});
