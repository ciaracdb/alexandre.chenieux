var express = require('express');
var compression = require('compression');
var path = require('path');

var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:anything', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

var ShareDB = require('sharedb');
const dbConfig = require('./db.json');
const db = require('sharedb-mongo')('mongodb://'+dbConfig.user+':'+dbConfig.pwd+'@'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.database);
var share = new ShareDB({db});

var expressWs = require('express-ws')(app);
app.ws('/ws', function(ws, req) {
    console.log('Websocket request');
    var WebSocketJSONStream = require('websocket-json-stream');
    ws.on('connection', function(ws, req) {
        console.log('ShareDB connection');
        var stream = new WebSocketJSONStream(ws);
        share.listen(stream);
    });
});

app.listen(3000, function () {
    console.info('Server started on port : '+3000)
});







