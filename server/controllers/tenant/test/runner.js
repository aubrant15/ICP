'use strict';
process.env.NODE_ENV = 'test';

const base = process.env.PWD;
const config = require(base + '/config'),
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    Tenant = require(base + '/controllers/tenant'),
    tenant = require(base + '/models/tenant'),
    should = require('should'),
    testUtils = require(base + '/test/utils');


describe("Tenant api", function() {
  let id, dummyTenant;

  before(function(done) {
      mongoose.connect(config.testDb, function() {
          console.log('Connected to: '+ config.testDb);
          done();
      });

      dummyTenant = new Tenant({ 
        "name" : "Test Tenant 2", 
        "domain" : "testorg2", 
        "status" : "active", 
        "database" : "testorg2" 
      });
      dummyTenant.save(function(err, tenant) {
          if (err) { console.log(err); }
          id = tenant._id;
      });
  });

  describe("Create Tenant", function() {
      it("should create a new tenant", function(done) {
        let req = {body : {'name': 'tenant', 'doamin' : 'testorg2', 'status': 'active', 'database' : 'testorg2'} };

        let res = testUtils.responseValidatorAsync(200, function(tenant) {
          tenant.should.have.property('name');
          tenant.title.should.equal('Test Tenant 2');
          done();
        });

        tenant.postTenant(req, res);
      });
  });

  describe("GET Tenants", function() {
      it("should respond with an array of tenants", function(done) {
        let req = {};

        let res = testUtils.responseValidatorAsync(200, function(tenants) {
          tenants.length.should.equal(6);
          tenants[0].should.have.property('name');
          done();
        });

        tenant.getTenants(req, res);
      });
  });

  describe("GET Tenant", function() {
      it("should get a tenant by id", function(done) {
        let req = {
          params : {id: id}
        };

        let res = testUtils.responseValidatorAsync(200, function(tenant) {
         tenant.should.have.property('name');
          tenant.name.should.equal('Test Tenant 2');
          done();
        });

        tenant.getTenant(req, res);
      });

      it("should throw an error for invalid id", function(done) {
        let req = {
          params : {id: '23545'}
        };

        let res = testUtils.responseValidatorAsync(500, function(err) {
          if(err) {console.log(err);}
          done();
        });

        tenant.getTenant(req, res);
      });
  });

  describe("Update Tenant", function() {
      it("should update an existing tenant", function(done) {
        let req = {
          params: {id: id},
          body: {
            'title': 'hey there peeps'
          }
        };

        let res = testUtils.responseValidatorAsync(200, function(tenant) {
          tenant.should.have.property('title');
          tenant.title.should.equal('hey there peeps');
          done();
        });

        tenant.putTenant(req, res);
      });
  });

  describe("Delete Tenant", function() {
      it("should delete an existing tenant", function(done) {
        let req = {
          params: {id: id},
        };

        let res = testUtils.responseValidatorAsync(200, function(tenant) {
          tenant.should.have.property('deleted');
          tenant.removed.should.equal(true);
          done();
        });

        tenant.deleteTenant(req, res);
      });
  });

  after(function(done) {
      Tenant.remove({}, function(err) {
        if(err) {console.log(err);}
      });

      mongoose.disconnect(done);
  });

});
