const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

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

// Authenticate
router.post('/authenticate', function(req, res, next){
  const username = req.body.username;
  const password = req.body.password;

  // 1) check for user with username
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    // 2) if it exists, match the password
    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
      const token = jwt.sign({data: user}, config.secret, {
        expiresIn: 604800 // 1 week
      });
        // 3) once password matches, send the following response
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      // 4) if it doesnt, send the following response
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile + protected
// any route you want to protect, add that second parameter (passport.authenticate...)
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next){
  res.json({user:req.user});
});

module.exports = router;
