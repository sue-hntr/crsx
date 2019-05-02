require("dotenv").config();

const express = require('express');
var favicon = require('serve-favicon')
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

const axios = require('axios');
var logger = require("morgan");
// var db = require("/models");
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

////allows mongostore to access sessions by passing it (sessions)
const MongoStore = require('connect-mongo')(session);



// Heroku Mongo DB connection
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/crsx", { useNewUrlParser: true })
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/crsx";
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true,
//   auth:{authdb:"admin"}
// });
// mongoose.set('debug', true); // turn on debug



//******THIS WORKS LOCALLY NO ERRORS. */
// var options = {
//   auth: {authdb: 'admin'},
//   // useMongoClient: true
// }
// let mongoConnectionOnline = { 
//   'url': "mongodb://heroku_g9dgh9j4:heroku_g9dgh9j4@ds151066.mlab.com:51066/heroku_g9dgh9j4"
// }; 
// let mongoConnectionLocal = { 
//     'url': `mongodb://localhost:27017/crsx`
// }; 
// mongoose.connect(mongoConnectionLocal.url, options, err => { if(err) { console.log(err); }}); 
// // mongoose.connect(mongoConnectionOnline.url, options, err => { if(err) { console.log(err); }}); 
// //****** END 

//******#2 trying to match earlier OR version. Test if goes online*/
var options = {
  auth: {authdb: 'admin'},
  // useMongoClient: true
}
let mongoConnectionOnline = { 
  'url': "mongodb://heroku_g9dgh9j4:heroku_g9dgh9j4@ds151066.mlab.com:51066/heroku_g9dgh9j4"
}; 
let mongoConnectionLocal = { 
    'url': `mongodb://localhost:27017/crsx`
}; 
mongoose.connect(mongoConnectionLocal.url || mongoConnectionOnline.url , options, err => { if(err) { console.log(err); }}); 
// mongoose.connect(mongoConnectionOnline.url, options, err => { if(err) { console.log(err); }}); 
//****** END 





// local mongodb 
// mongoose.connect("mongodb://localhost:27017/crsexpress",  { useNewUrlParser: true });
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

//use sessions for tracking logins
//store: save sessions to mongo, not RAM
//needs to be after mongoose.connect because db not yet
app.use(session({
  secret: 'beware of little expenses',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(function (req, res, next){
  res.locals.currentUser = req.session.userId;
  next();
});

// Use morgan logger for logging requests
app.use(logger("dev"));

// parse incoming requests: if problem look at app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));






// serve static files from /public
app.use(express.static('public'));


//USE IN PRODUCTION
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// include routes. 
//This changes alot in React because view routes and backend route(db, API)
// here:  app.use(routes);
// above: // const routes = require("./routes");


const routes = require('./routes');
app.use(routes);

// require("./routes/index")(app);


// require("./routes/htmlRoutes")(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// const result = dotenv.config()
// if (result.error) {
//   throw result.error
// }
// console.log(result.parsed)


// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('error here');
  res.status(500).json({
    message: err.message,
    error: err
  });
});

// listen on port 
app.listen(PORT, function () {
  console.log("Express app listening on port " + PORT + "!");
});
