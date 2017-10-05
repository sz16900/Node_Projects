// Now, lets move all the routers (except for the home) homedirectory
// router() comes by default
// dont forget to change router to router

const express = require('express');
const router = express.Router();

// Bring in the Article Model
// and bring us out of the file by //
let Article = require('../models/article');

// Add route
router.get('/add', function(req, res){
  res.render('add_article', {
    title:'Add articles'
  });
});

// Add submit POST route
// Notice: These have the same url but they are different requests
// Add a validator to avoid the webpage from hanging (set some rule)
router.post('/add', function(req, res){
  // Set the message if it doesnt validate correctly
  // And the title cannot be empty
  // Look at documentation in express-validator for .notEmpty(); etc
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  // ... and then get the errors
  let errors = req.validationErrors();
  // if errors, re-render the template
  if(errors){
    res.render('add_article', {
      // Dont forget title of itll be blank
      title:'Add articles',
      // set to errors variable
      errors:errors
    });
  } else{
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
          // type = success
          // have a flash with your homedirectory
          req.flash('success', 'Article Added')
          //If no error, then redirect to home directory
          res.redirect('/');
        }
      });
    }
});

// Load and Edit Form
router.get('/edit/:id', function(req, res){
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
router.post('/edit/:id', function(req, res){
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
      // It becomes easy to have messages now...
      req.flash('success', 'Article Updated');
      //If no error, then redirect to home directory?
      res.redirect('/');
    }
  });
});

router.delete('/:id', function(req, res){
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

// Get single article. : is a placeholder
// Move it to the bottom so that the others get called first
router.get('/:id', function(req, res){
  // I think this is a mongoose thing. Gets the article
  // by id.
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      article:article
    });
  });
});

// Make sure we can access this from outside
module.exports = router;
