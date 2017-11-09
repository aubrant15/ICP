'use strict';
process.env.NODE_ENV = 'test';

const base = process.env.PWD;
const config = require(base + '/config'),
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    User = require(base + '/controllers/user'),
    user = require(base + '/models/user'),
    should = require('should'),
    testUtils = require(base + '/test/utils');


describe("User api", function () {
  let id, dummyUser, org;

  before(function (done) {
      mongoose.connect(config.testDb, function() {
          console.log('Connected to: '+ config.testDb);
          done();
      });

      dummyUser = new User({ 
    "userid" : "ac99999999", 
    "orgid" : Object("59e3fee2462a9d56e9099eaa"), 
    "type" : "org_user", 
    "role" : "admin", 
    "fname" : "Test", 
    "lname" : "User", 
    "ssn" : 222546359, 
    "sex" : "F", 
    "dob" : Date("1970-01-01T00:00:00.000+0000"), 
    "email" : "test.user@acme.com", 
    "password" : "password1", 
    "addresses" : [
        {
            "type" : "Home", 
            "Address1" : "123 Street One", 
            "Address2" : "Suite 100", 
            "City" : "Minneapolis", 
            "State" : "MN", 
            "Postal Code" : "55418", 
            "Country" : "USA"
        }, 
        {
            "type" : "Work", 
            "Address1" : "123 Work Address", 
            "Address2" : "Suite 100", 
            "City" : "Minneapolis", 
            "State" : "MN", 
            "Postal Code" : "55418", 
            "Country" : "USA"
        }
    ], 
    "phones" : [
        {
            "type" : "Home", 
            "Country code" : 1, 
            "number" : "6125550000"
        }, 
        {
            "type" : "Work", 
            "Country code" : 1, 
            "number" : "6125552222"
        }, 
        {
            "type" : "mobile", 
            "Country code" : 1, 
            "number" : "6125551111"
        }
    ]
}, { collection : 'acme' });
      dummyUser.save(function (err, user) {
          if (err) { console.log(err); }
          id = user._id;
          org = user.orgid;
      });
  });

  describe("Create User", function() {
      it("should create a new user", function(done){
      
      
        let req = { 
          body : { "userid" : "ac99999999",  "orgid" : Object("59e3fee2462a9d56e9099eaa"), "type" : "org_user", "role" : "admin", "fname" : "Test", "lname" : "User", "ssn" : 222546359,  "sex" : "F",  "dob" : Date("1970-01-01T00:00:00.000+0000"),  "email" : "test.user@acme.com", "password" : "password1", "addresses" : [{ "type" : "Home",  "Address1" : "123 Street One",  "Address2" : "Suite 100", "City" : "Minneapolis", "State" : "MN", "Postal Code" : "55418", "Country" : "USA" }, { "type" : "Work",  "Address1" : "123 Work Address", "Address2" : "Suite 100", "City" : "Minneapolis", "State" : "MN", "Postal Code" : "55418", "Country" : "USA"} ], "phones" : [ {"type" : "Home", "Country code" : 1,  "number" : "6125550000"}, {"type" : "Work", "Country code" : 1, "number" : "6125552222"}, { "type" : "mobile", "Country code" : 1, "number" : "6125551111"} ]}
        };

        let res = testUtils.responseValidatorAsync(200, function(user) {
          user.should.have.property('fname');
          user.title.should.equal('Test');
          user.should.have.property('role');
          user.title.should.equal('org_user');
          done();
        });

        user.postUser(req, res);
      });
  });

  describe("GET Users", function() {
      it("should respond with an array of users", function(done) {
        let req = {};

        let res = testUtils.responseValidatorAsync(200, function(users) {
         //what should the length of the array be
          users.length.should.equal(4);
          users[0].should.have.property('fname');
          done();
        });

        user.getUsers(req, res);
      });
  });

  describe("GET User", function() {
      it("should get a user by id", function(done) {
        let req = {
          params : {id: id}
        };

        let res = testUtils.responseValidatorAsync(200, function(user) {
          user.should.have.property('fname');
          user.fname.should.equal('Test');
          done();
        });

        user.getUser(req, res);
      });

      it("should throw an error for invalid id", function(done) {
        let req = {
          params : {id: '23545'}
        };

        let res = testUtils.responseValidatorAsync(500, function(err) {
           if(err) {console.log(err);}
          done();
        });

        user.getUser(req, res);
      });
  });

  describe("Update User", function() {
      it("should update an existing user", function(done) {
        let req = {
          params: {id: id},
          body: {
            'fname': 'new test'
          }
        };

        let res = testUtils.responseValidatorAsync(200, function(user) {
          user.should.have.property('fname');
          user.fname.should.equal('new test');
          done();
        });

        user.putUser(req, res);
      });
  });

  describe("Delete User", function() {
      it("should delete an existing user", function(done) {
        let req = {
          params: {id: id},
        };

        let res = testUtils.responseValidatorAsync(200, function(obj) {
          obj.should.have.property('deleted');
          obj.removed.should.equal(true);
          done();
        });

        user.deleteUser(req, res);
      });
  });

  after(function(done) {
      User.remove({}, function(err) {
        if(err) {console.log(err);}
      });

      mongoose.disconnect(done);
  });

});
