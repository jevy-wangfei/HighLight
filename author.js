var mongoose = require('./db');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


var User = mongoose.model('User', {
  _id: String,
  username: String,
  password: String,
  email: String
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username,
      password: password,
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      // if (!user.validPassword(password)) {
      //   return done(null, false, {
      //     message: 'Incorrect password.'
      //   });
      // }
      //console.log("connect to db and find one" + user);
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);

});

passport.deserializeUser(function(id, done) {

  User.find(id, function(err, user) {
    //console.log("de serial user " + user);
    done(err, user);
  });
});

module.exports = passport;

//
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//                  |
// });              |
//                  |
//                  |____________________> saved to session req.session.passport.user = {id:'..'}
//                                    |
// passport.deserializeUser(function(id, done) {
//                   ________________|
//                   |
//     User.findById(id, function(err, user) {
//         done(err, user);
//                    |______________>user object ataches to the request as req.user
//
//  });
//   });
