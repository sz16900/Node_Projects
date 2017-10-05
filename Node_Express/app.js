const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Lets check connection to db
db.once('open', function(){
  console.log('Connected to mongoDB')
})

// Lets check for db errors
db.on('error', function(err){
  console.log(err);
});
// Lets initialize the app
const app = express();

// Bring in the models
let Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Sessions (more) Middleware
app.use(session({
  secret: 'keyboard cat',
  // Brad has this resave to true and no cookies
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// Express Messages (even more) Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  // Global variable called messages to the express-messages module
  // I guess this is not required at top ;)
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator (more more more...) Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// The Home route
app.get('/', function(req, res){
  // err if there's one and the response i.e(articles)
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else{
      res.render('index', {
        title:'Articles',
        // We can send more than one because we are sending an object
        articles:articles
      });
    }
  });
  // We want to send {} as an object and render
});

// Lets get the route files!
// Anything that refers to /articles/something should refer to router.js
let articles = require('./routes/articles');
app.use('/articles', articles);


// Lets start the server
app.listen(3000, function(){
  console.log('Server is listening at port 3000 ...');
});
