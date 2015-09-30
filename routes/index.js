var express = require('express');
var path = require('path');
var passport = require('../author');
var router = express.Router();
var mongoose = require('../db');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
}, {
  collection: 'user'
});

var notebookSchema = new Schema({
  name: String,
  order: String,
  // time: Date,
  user: String,
}, {
  collection: 'notebook'
});

var articleSchema = new Schema({
  name: String,
  order: String,
  time: Date,
  lastEdit: Date,
  notebook: String,
  user: String,
}, {
  collection: 'article'
});

var user = mongoose.model('user', userSchema);
var notebook = mongoose.model('notebook', notebookSchema);
var article = mongoose.model('article', articleSchema);

function requireAuth(req, res, next) {
  // check if the user is logged in
  console.log("isAuthenticated:" + req.isAuthenticated());
  if (!req.isAuthenticated()) {
    console.log("You need to login to view this page");
    res.redirect('/login');
  }
  next();
}

//requireAuth,
router.get('/', function(req, res) {
  console.log("login as user _id: " + req.sessionID);
  res.render('index');
});

router.get('/login', function(req, res) {
  console.log("go to login html: ");
  res.render('login');
});

router.get('/error', function(req, res) {
  res.render('error', {
    message: 'User name or password is not correct. Login fail.',
  });
});
//List all of notebook of login user
router.get('/notebook', function(req, res, next) {
  console.log("list all notebook of login user");
  notebook.find({}, function(err, data) {
    console.log(data);
    res.send(data);
  });
});

//List all of articles of current user
router.get('/notebook/:id', function(req, res, next) {
  console.log(req.params.id);
  article.find({
    "notebook": req.params.id
  }, function(err, data) {
    console.log(data);
    res.send(data);
  });
  //res.send('respond with a resource:' + req.params.id);

});
//List the article with the given id
router.get('/article/:id', function(req, res, next) {
  console.log(req.params);

  res.send('respond with a resource:' + req.params.id);

});

router.get('/users', function(req, res, next) {
  console.log("list all notebook of login user");
  user.find({}, function(err, data) {
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
