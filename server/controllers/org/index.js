'use strict';

const base = process.env.PWD;
const Org = require(base + '/models/org');

var home = function(req, res, next) {
  res.render('index', { title: 'Aubrant Integrated Care Platform - This is Org' });
};

var postOrg = function(req, res) {
  let org= new Org(req.body);
  org.save((err, org) => {
      if (err) { res.send(500, err); }
      res.json(200, org);
  });
};

var putOrg = function(req, res) {
  Org.findById(req.params.id, (err, org) => {
    if(err) {res.send(500, err);}

    if(req.body.title) { org.title = req.body.title; }
    if(req.body.body) { org.body = req.body.body; }
    if(req.body.author) { org.author = req.body.author; }
    if(req.body.published) { org.published = req.body.published; }

    org.save((err, org) => {
      if (err) { res.send(500, err); }
      res.json(200, org);
    });
  });
};

var getOrg = function(req, res) {
  Org.findById(req.params.id, (err, org) => {
    if(err) { res.send(500, err); }
    if(org) {
      res.json(200, org);
    }
  });
};

var deleteOrg = function(req, res) {
  Org.findByIdAndRemove(req.params.id, (err, org) => {
    if (err) { res.send(500, err); }
    res.json(200, {'removed': true});
  });
};

var getOrgs = function(req, res) {
  Org.find((err, orgs) => {
        if (err) { res.send(500, err); }
        res.json(200, orgs);
    });
};

module.exports = {
  home,
  postOrg,
  putOrg,
  getOrg,
  deleteOrg,
  getOrgs,
};
