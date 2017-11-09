'use strict';

const base = process.env.PWD;
const User = require(base + '/models/user');

var home = function(req, res, next) {
  res.render('index', { title: 'Aubrant Integrated Care Platform - This is User' });
};

var postUser = function(req, res) {
  let user= new User(req.body);
  user.save((err, user) => {
      if (err) { res.send(500, err); }
      res.json(200, user);
  });
};

var putUser = function(req, res) {
  User.findById(req.params.id, (err, user) => {
    if(err) {res.send(500, err);}

    if(req.body.title) { user.title = req.body.title; }
    if(req.body.body) { user.body = req.body.body; }
    if(req.body.author) { user.author = req.body.author; }
    if(req.body.published) { user.published = req.body.published; }

    user.save((err, user) => {
      if (err) { res.send(500, err); }
      res.json(200, user);
    });
  });
};

var getUser = function(req, res) {
  User.findByIDandOrg(req.params.id, (err, user) => {
    if(err) { res.send(500, err); }
    if(user) {
      res.json(200, user);
    }
  });
};

var deleteUser = function(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) { res.send(500, err); }
    res.json(200, {'removed': true});
  });
};

var getUsers = function(req, res) {
  User.find((err, users) => {
        if (err) { res.send(500, err); }
        res.json(200, users);
    });
};

module.exports = {
  home,
  postUser,
  putUser,
  getUser,
  getUsers,
  deleteUser,
};
