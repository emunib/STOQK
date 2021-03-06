var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var englishRouter = require('./routes/english');
var urduRouter = require('./routes/urdu');
var vocabularyRouter = require('./routes/vocabulary');

var app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));
// helper to compare two value
hbs.registerHelper('ifEq', function (arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery.scrollto/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/select2/dist/js/')));

app.use('/', indexRouter);
app.use('/english', englishRouter);
app.use('/urdu', urduRouter);
app.use('/vocabulary', vocabularyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
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
