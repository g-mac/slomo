var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// New Code
var mongo = require('mongodb');
var monk = require('monk');
// var db = monk('mongodb://slomo_mlab_user:alsterterasse1@ds127065.mlab.com:27065/slomo_mlab_db'); //production
// var db = monk('mongodb://slomo_mlab_user:alsterterasse1@ds119268.mlab.com:19268/slomo_mlab_db_dev'); //dev
var db = monk('mongodb://slomo_mlab_user:alsterterasse1@127.0.0.1:27017/slomo_mlab_db_study');

var index = require('./routes/index');

var app = express();

// view engine setup: PUG
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// view engine setup: HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);


// -------- ERROR HANDLING ------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
