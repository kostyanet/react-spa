/* Dependecies declaration */
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

var http = require('http');

var compiler = webpack(config);
var app = express();
app.set('port', 3000);

/* Middleware stack */
// app.use(logger('dev'));
app.use(logger(':method :url :status :response-time ms - :date[web]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname));
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.sendFile(path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
    // res.sendFile(path.join(__dirname, '/static/style.css'));

    // res.sendFile(path.join(__dirname, '/styles/application.css'));
    // res.sendFile(path.join(__dirname, '/assets/**/*'));
    // res.sendFile(path.join(__dirname, '/fonts/**/*'));
});
app.use(errorHandler());

/* POST handler */
app.post('/login', function (req, res, next) {
    var name = req.body.username;
    var pass = req.body.password;

    var msg;
    var obj = {
        login:  name,
        token:  Math.random().toString(16).substring(2) + '=='
    };

    console.log('User: ' + name + '\n' + 'Pass: ' + pass);
    // console.log(Object.keys(req));

    /* Checking the credentials */
    if (name === 'User' && pass === 'Pass1') {
        replyWith(res, obj, 200);
        return;

    } else if (name !== 'User') {
        msg = 'Unknown username.';

    } else if (pass !== 'Pass1') {
        msg = 'Incorrect password.';
    }

    obj = {
        error: msg,
        statusText: msg
    };

    replyWith(res, obj, 401);
});

app.listen(3000, function (err) {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://localhost:3000/');
});


/* Sends the delayed response */
function replyWith(res, obj, status) {
    setTimeout(function () {
        res
            .set({
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'public, max-age=86400'
            })
            .status(status)
            .json(obj)
            .end();

        console.log(obj);
    }, 700);
}
