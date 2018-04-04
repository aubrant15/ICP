
'use strict';
// process.env.NODE_ENV = 'development';

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}
let base = process.env.PWD;
let config = require(base + '/config');
let mongoose = require('mongoose');
let Org = require(base + '/models/org');
let orgC = require(base + '/controllers/org');
let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();
let testUtils = require(base + '/test/utils');
let debug = require('debug');

chai.use(chaiHttp);
debug.log('Entered Org Runner');
describe('Org api test suite', function () {
  let id, dummyOrg;
  before(function (done) {
    debug.log('Entered Org Before');
    mongoose.connect(config.localDb, function () {
      console.log('Connected to: ' + config.testDb);
    });
    debug.log('DummyOrg  after connections');
    dummyOrg = new Org({
      'tenatid': Object('59e3d8f09c26d7e9a21c39aa'),
      'name': 'Test Hospital',
      'type': 'Provider',
      'POC': 'Jack Ryan',
      'account_type': 'p3',
      'date_active': new Date('2016-04-30T00:00:00.000+0000'),
      'address': {
        'type': 'work',
        'Address1': '123 Street One',
        'Address2': 'Suite 100',
        'City': 'Minneapolis',
        'State': 'MN',
        'Postal Code': '55418',
        'Country': '55418'
      },
      'Phone1': '000-000-0000',
      'Phone2': '000-000-0000'
    });
    debug.log('DummyOrg before save');
    dummyOrg.save(function (err, org) {
      if (err) { console.log(err); }
      id = org._id;
      debug.log('DummyOrg id:' + id);
      done();
    });
  });
  after(function (done) {
    debug.log('Entered Org After');
    Org.remove({}, function (err) {
      if (err) { console.log(err); }
    });
    mongoose.disconnect(done);
  });
  describe('Create Org /postOrg', function () {
    debug.log('Entered Create Org Describe');
    it('should create a new org', function (done) {
      debug.log('Entered Create Org It');
      let org = {
        body: {'tenatid': Object('59e3d8f09c26d7e9a21c39aa'), 'name': 'Test Hospital 2', 'type': 'Provider', 'POC': 'Jack Ryan', 'account_type': 'p3', 'date_active': Date('2016-04-30T00:00:00.000+0000'), 'address': {'type': 'work', 'Address1': '123 Street One', 'Address2': 'Suite 100', 'City': 'Minneapolis', 'State': 'MN', 'Postal Code': '55418', 'Country': '55418'}, 'Phone1': '000-000-0000', 'Phone2': '000-000-0000'}
      };
      chai.request(server)
        .post('/book')
        .send(org)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eqaul('Test Hospital 2');
          done();
        });
    });
  });

  describe('GET Orgs', function () {
    it('should respond with an array of orgs', function (done) {
      debug.log('Entered Get Orgs It');
      let req = {};
      let res = testUtils.responseValidatorAsync(200, function (orgs) {
        // what should the length of th array be?
        orgs.length.should.equal(9);
        orgs[0].should.have.property('namefgfgf');
        done();
      });
      orgC.getOrgs(req, res);
    });
  });

  describe('GET Org', function () {
    it('should get a org by id', function (done) {
      let req = {
        params: {id: id}
      };

      let res = testUtils.responseValidatorAsync(200, function (org) {
        org.should.have.property('name');
        org.title.should.equal('Test Hospital');
        done();
      });
      orgC.getOrg(req, res);
    });

    it('should throw an error for invalid id', function (done) {
      let req = {
        params: {id: '23545'}
      };

      let res = testUtils.responseValidatorAsync(500, function (err) {
        if (err) { console.log(err); }
        done();
      });
      orgC.getOrg(req, res);
    });
  });

  describe('Update Org', function () {
    it('should update an existing org', function (done) {
      let req = {
        params: {id: id},
        body: {
          'name': 'New Test org'
        }
      };

      let res = testUtils.responseValidatorAsync(200, function (org) {
        org.should.have.property('name');
        org.title.should.equal('New Test Org');
        done();
      });
      orgC.putOrg(req, res);
    });
  });

  describe('Delete Org', function () {
    it('should delete an existing org', function (done) {
      let req = {
        params: {id: id}
      };

      let res = testUtils.responseValidatorAsyncresponseValidatorAsync(200, function (obj) {
        obj.should.have.property('deleted');
        obj.removed.should.equal(true);
        done();
      });
      orgC.deleteOrg(req, res);
    });
  });
});
