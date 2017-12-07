'use strict';
// process.env.NODE_ENV = 'development';

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}
let base = process.env.PWD;
let config = require(base + '/config');
let logger = require('mocha-logger');
let mongoose = require('mongoose');
let Tenant = require(base + '/models/tenant');
let tenantC = require(base + '/controllers/tenant');
let mocha = require('mocha');
let describe = mocha.describe;
let it = mocha.it;
let before = mocha.before;
let after = mocha.after;
let should = require('chai').should();

describe('Tenant api', function () {
  let id, dummyTenant;
  console.log('Tenant 1');
  before(function (done) {
    console.log('Tenant 2');
    mongoose.connect(config.localDb, function () {
      console.log('Connected to: ' + config.testDb);
      done();
    });

    dummyTenant = new Tenant({
      'name': 'Test Tenant 2',
      'domain': 'testorg2',
      'status': 'active',
      'database': 'testorg2'
    });
    dummyTenant.save(function (err, tenant) {
      if (err) { console.log(err); }
      id = tenant._id;
    });
  });

  describe('Create Tenant', function () {
    console.log('Tenant 3');
    it('should create a new tenant', function (done) {
      console.log('Tenant 4');
      let req = {body: {'name': 'tenant', 'doamin': 'testorg2', 'status': 'active', 'database': 'testorg2'} };

      let res = testUtils.responseValidatorAsync(200, function (tenant) {
        tenant.should.have.property('name');
        tenant.title.should.equal('Test Tenant 2');
        done();
      });

      tenantC.postTenant(req, res);
    });
  });

  describe('GET Tenants', function () {
    it('should respond with an array of tenants', function (done) {
      let req = {};

      let res = testUtils.responseValidatorAsync(200, function (tenants) {
        tenants.length.should.equal(6);
        tenants[0].should.have.property('name');
        done();
      });

      tenantC.getTenants(req, res);
    });
  });

  describe('GET Tenant', function () {
    it('should get a tenant by id', function (done) {
      let req = {
        params: {id: id}
      };

      let res = testUtils.responseValidatorAsync(200, function (tenant) {
        tenant.should.have.property('name');
        tenant.name.should.equal('Test Tenant 2');
        done();
      });

      tenantC.getTenant(req, res);
    });

    it('should throw an error for invalid id', function (done) {
      let req = {
        params: {id: '23545'}
      };

      let res = testUtils.responseValidatorAsync(500, function (err) {
        if (err) { console.log(err); }
        done();
      });

      tenantC.getTenant(req, res);
    });
  });

  describe('Update Tenant', function () {
    it('should update an existing tenant', function (done) {
      let req = {
        params: {id: id},
        body: {
          'title': 'hey there peeps'
        }
      };

      let res = testUtils.responseValidatorAsync(200, function (tenant) {
        tenant.should.have.property('title');
        tenant.title.should.equal('hey there peeps');
        done();
      });

      tenantC.putTenant(req, res);
    });
  });

  describe('Delete Tenant', function () {
    it('should delete an existing tenant', function (done) {
      let req = {
        params: {id: id}
      };

      let res = testUtils.responseValidatorAsync(200, function (tenant) {
        tenant.should.have.property('deleted');
        tenant.removed.should.equal(true);
        done();
      });

      tenantC.deleteTenant(req, res);
    });
  });

  after(function (done) {
    Tenant.remove({}, function (err) {
      if (err) { console.log(err); }
    });

    mongoose.disconnect(done);
  });
});
