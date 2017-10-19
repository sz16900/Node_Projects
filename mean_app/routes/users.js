const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// The register
router.post('/register', function(req, res, next){
  // The User object
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, function(err){
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else{
      res.json({success: true, msg:'User registered'});

    }
  });
});

// The authenticate
router.post('/authenticate', function(req, res, next){
  res.send('authenticate');
});

// Profile
router.get('/profile', function(req, res, next){
  res.send('Profile');
});

module.exports = router;
