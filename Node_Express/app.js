const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// The Home route
app.get('/', function(req, res){
  // err if there's one and the response i.e(articles)
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else{
      res.render('index', {
        title:'Articles',
        // We can sand more than one because we are sending an object
        articles:articles
      });
    }
  });
  // We want to send {} as an object and render
});

// Get single article. : is a placeholder
app.get('/article/:id', function(req, res){
  // I think this is a mongoose thing. Gets the article
  // by id.
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      article:article
    });
  });
});

// Add route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title:'Add articles'
  });
});

// Add submit POST route
// Notice: These have the same url but they are different requests
app.post('/articles/add', function(req, res){
  let article = new Article();
  // These have been parsed already?
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  // console.log(req.body.title);
  article.save(function(err){
    if(err){
      console.log(err);
    } else{
      //If no error, then redirect to home directory?
      res.redirect('/');
    }
  });
});

// Load and Edit Form
app.get('/article/edit/:id', function(req, res){
  // I think this is a mongoose thing. Gets the article
  // by id.
  Article.findById(req.params.id, function(err, article){
    res.render('edit_article', {
      // Dynamic title :)
      title: 'Edit Article',
      article:article
    });
  });
});

// Add update submit POST route
// Notice: These have the same url but they are different requests
app.post('/articles/edit/:id', function(req, res){
  // not creating a new object
  let article = {};
  // These have been parsed already?
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  // Create a query because we have to specify which to update
  let query = {_id:req.params.id}
  // Notice that instead of using the article variable (or let)
  // we use the model (Article) to send to the DB. Then update
  Article.update(query, article, function(err){
    if(err){
      console.log(err);
    } else{
      //If no error, then redirect to home directory?
      res.redirect('/');
    }
  });
});

app.delete('/article/:id', function(req, res){
  let query = {_id:req.params.id}

  // Take the model and pass the query and function
  Article.remove(query, function(err){
    if(err){
      console.log(err);
    }
    // Since we made a request from main.js script, we need to send a response
    // res.send by default will send a 200 status
    res.send('Success');
  });
});

// Lets start the server
app.listen(3000, function(){
  console.log('Server is listening at port 3000 ...');
});
