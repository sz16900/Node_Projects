const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  // ExtractJwt.fromAuthHeader was throwing an error because its depricated
  // use the one bellow
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);
    // I guess it went from jwt_payload._id
    // to jwt_payload._doc._id
    // to jwt_payload.data._id
    // :) Ah, new versions and debugging!
    User.getUserById(jwt_payload.data._id, function(err, user){
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
