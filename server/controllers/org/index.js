'use strict';

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}
let base = process.env.PWD;
let Org = require(base + '/models/org');
let debug = require('debug');

debug.log('in org controller');
let home = function (req, res, next) {
  debug.log('Rendering Org home');
  res.render('index', { title: 'Aubrant Integrated Care Platform This is Org' });
};

let postOrg = function (req, res) {
  let org = new Org(req.body);
  org.save((err, org) => {
    if (err) { res.send(500, err); }
    res.json(200, org);
  });
};

let putOrg = function (req, res) {
  Org.findById(req.params.id, (err, org) => {
    if (err) { res.send(500, err); }

    if (req.body.title) { org.title = req.body.title; }
    if (req.body.body) { org.body = req.body.body; }
    if (req.body.author) { org.author = req.body.author; }
    if (req.body.published) { org.published = req.body.published; }

    org.save((err, org) => {
      if (err) { res.send(500, err); }
      res.json(200, org);
    });
  });
};

let getOrg = function (req, res) {
  Org.findById(req.params.id, (err, org) => {
    if (err) { res.send(500, err); }
    if (org) {
      res.json(200, org);
    }
  });
};

let deleteOrg = function (req, res) {
  Org.findByIdAndRemove(req.params.id, (err, org) => {
    if (err) { res.send(500, err); }
    res.json(200, {'removed': true});
  });
};

let getOrgs = function (req, res) {
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
  getOrgs
};
