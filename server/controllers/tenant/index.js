'use strict';

const base = process.env.PWD;
const Tenant = require(base + '/models/tenant');

var home = function(req, res, next) {
  res.render('index', { title: 'Aubrant Integrated Care Platform - This is Tenant' });
};

var postTenant = function(req, res) {
  let tenant= new Tenant(req.body);
  tenant.save((err, tenant) => {
      if (err) { res.send(500, err); }
      res.json(200, tenant);
  });
};

var putTenant = function(req, res) {
  Tenant.findById(req.params.id, (err, tenant) => {
    if(err) {res.send(500, err);}

    if(req.body.title) { tenant.title = req.body.title; }
    if(req.body.body) { tenant.body = req.body.body; }
    if(req.body.author) { tenant.author = req.body.author; }
    if(req.body.published) { tenant.published = req.body.published; }

    tenant.save((err, tenant) => {
      if (err) { res.send(500, err); }
      res.json(200, tenant);
    });
  });
};

var getTenant = function(req, res) {
  Tenant.findById(req.params.id, (err, tenant) => {
    if(err) { res.send(500, err); }
    if(tenant) {
      res.json(200, tenant);
    }
  });
};

var deleteTenant = function(req, res) {
  Tenant.findByIdAndRemove(req.params.id, (err, tenant) => {
    if (err) { res.send(500, err); }
    res.json(200, {'removed': true});
  });
};

var getTenants = function(req, res) {
  Tenant.find((err, tenants) => {
        if (err) { res.send(500, err); }
        res.json(200, tenants);
    });
};

module.exports = {
  home,
  postTenant,
  putTenant,
  getTenant,
  deleteTenant,
  getTenants, 
};
