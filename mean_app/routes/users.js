const express = require('express');
const router = express.Router();

// The register
router.get('/register', function(req, res, next){
  res.send('Register');
});

// The authenticate
router.post('/authenticate', function(req, res, next){
  res.send('authenticate');
});

// Profile
router.get('/profile', function(req, res, next){
  res.send('Profile');
});

// validate: check if the token matches
router.get('/validate', function(req, res, next){
  res.send('validate');
});

module.exports = router;
