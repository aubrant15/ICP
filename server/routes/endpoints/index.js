'use strict';

const express = require('express'),
 router = express.Router(),
 user = require('../../controllers/user'),
 tenant = require('../../controllers/tenant'),
 org = require('../../controllers/org');

router.get('/user', user.home);
router.post('/user/create', user.postUser);
router.get('/user/:id', user.getUser);
router.get('/users', user.getUsers);
router.delete('/user/:id', user.deleteUser);
router.get('/user/:id', user.getUsers);
router.put('/user/:id', user.putUser);

router.get('/tenant', tenant.home);
router.post('/tenant/create', tenant.postTenant);
router.get('/tenant/:id', tenant.getTenants);
router.get('/tenants', tenant.getTenant);
router.delete('/tenant/:id', tenant.deleteTenant);
router.put('/tenant/:id', tenant.putTenant);

router.get('/org', org.home);
router.post('/org/create', org.postOrg);
router.get('/orgs', org.getOrgs);
router.get('/org/:id', org.getOrg);
router.delete('/org/:id', org.deleteOrg);
router.put('/org/:id', org.putOrg);


module.exports = router;
