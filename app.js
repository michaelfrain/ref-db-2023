var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var createRouter = require('./routes/creategame');
var readRouter = require('./routes/readgame');
var editRouter = require('./routes/updategame');
var createPlayRouter = require('./routes/createplay');
var readPlayRouter = require('./routes/readplay');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));

app.use('/', indexRouter);
app.use('/creategame', createRouter);
app.use('/edit', editRouter);
app.use('/readgame', readRouter);
app.use('/createplay', createPlayRouter);
app.use('/readplay', readPlayRouter);

const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:ZD71BXo4iJfRxzj1@sciac-0.koiol.mongodb.net/ufl-demo-database?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017"
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

run().catch(console.dir);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
