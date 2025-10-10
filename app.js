//path: app.js
require('dotenv').config();

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

const chatHandler = require('./api');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/build')));

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

app.post('/api/chat', chatHandler);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});