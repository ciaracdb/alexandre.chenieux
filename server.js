var express = require('express');
var compression = require('compression');
var path = require('path');
var otText = require('ot-text');

var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

var ShareDB = require('sharedb');
ShareDB.types.register(otText.type);
const dbConfig = require('./db.json');
const db = require('sharedb-mongo')('mongodb://'+dbConfig.user+':'+dbConfig.pwd+'@'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.database);
var share = new ShareDB({db});

var expressWs = require('express-ws')(app);
app.ws('/ws', function(ws, req) {
    console.log('Websocket request');
    var WebSocketJSONStream = require('websocket-json-stream');
    var stream = new WebSocketJSONStream(ws);
    share.listen(stream);
});

app.get('/document/get', function(req, res) {
    var connection = share.connect();
    var doc = connection.get('documents', 'test');
    doc.fetch(function(err) {
        if (err)
            throw err;
        if (doc.type === null) {
            doc.create('', otText.type.name);
        }
        res.json({'test':'test'});
    });
});

app.get('/:anything', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.listen(3000, function () {
    console.info('Server started on port : '+3000)
});







