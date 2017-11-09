'use strict';
process.env.NODE_ENV = 'test';

const base = process.env.PWD;
const config = require(base + '/config'),
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    Org = require(base + '/models/org'),
    orgs = require(base + '/controllers/org'),
    should = require('should'),
    testUtils = require(base + '/test/utils');

describe("Org api", () => {
  let id, dummyOrg;
 console.log("Im in 1");
  before((done) => {
    console.log("Im in 2");
      mongoose.connect(config.testDb, () => {
          console.log('Connected to: '+ config.testDb);
          done();
      });
      console.log("Im in 3");
      dummyOrg = new Org({ 
        "tenatid" : Object("59e3d8f09c26d7e9a21c39aa"), 
        "name" : "Test Hospital", 
        "type" : "Provider", 
        "POC" : "Jack Ryan", 
        "account_type" : "p3", 
        "date_active" : Date("2016-04-30T00:00:00.000+0000"), 
        "address" : {
            "type" : "work", 
            "Address1" : "123 Street One", 
            "Address2" : "Suite 100", 
            "City" : "Minneapolis", 
            "State" : "MN", 
            "Postal Code" : "55418", 
            "Country" : "55418"
        }, 
        "Phone1" : "000-000-0000", 
        "Phone2" : "000-000-0000"
      });
      console.log("Im in 4");
      dummyOrg.save((err, org) => {
          if (err) { console.log(err); }
          console.log("Im in 1.1");
          id = org._id;
      });
  });
  
  console.log("Im in 5");
  describe("Create Org", () => {
      it("should create a new org", (done) => {
        let req = {
          body : {"tenatid" : Object("59e3d8f09c26d7e9a21c39aa"),"name" : "Test Hospital 2","type" : "Provider","POC" : "Jack Ryan","account_type" : "p3","date_active" : Date("2016-04-30T00:00:00.000+0000"),"address" : {"type" : "work","Address1" : "123 Street One","Address2" : "Suite 100","City" : "Minneapolis", "State" : "MN", "Postal Code" : "55418","Country" : "55418"}, "Phone1" : "000-000-0000", "Phone2" : "000-000-0000"}
        };
        console.log("Im in 6");
        let res = testUtils.responseValidatorAsync(200, (org) => {
          org.should.have.property('name');
          org.title.should.equal('Test Hospital 2');
          done();
        });
        orgs.postOrg(req, res);
      });
  });


  describe("GET Orgs", () => {
    console.log("Im in 7");
      it("should respond with an array of orgs", (done) => {
       console.log("Im in 8");
        let req = {};
        let res = testUtils.responseValidatorAsync(200, (orgs) => {
          //what should the length of th array be?
          orgs.length.should.equal(9); 
          orgs[0].should.have.property('namefgfgf');
          done();
        });
       orgs.getOrgs(req, res);
      });
  });

  describe("GET Org", () => {
      it("should get a org by id", (done) => {
        let req = {
          params : {id: id}
        };

        let res = testUtils.responseValidatorAsync(200, (org) => {
           org.should.have.property('name');
          org.title.should.equal('Test Hospital');
          done();
        });

        orgs.getOrg(req, res);
      });

      it("should throw an error for invalid id", (done) => {
        let req = {
          params : {id: '23545'}
        };

        let res = testUtils.responseValidatorAsync(500, (err) => {
          if(err) {console.log(err);}
          done();
        });

        orgs.getOrg(req, res);
      });
  });

  describe("Update Org", () => {
      it("should update an existing org", (done) => {
        let req = {
          params: {id: id},
          body: {
            'name': 'New Test org'
          }
        };

        let res = testUtils.responseValidatorAsync(200, (org) => {
          org.should.have.property('name');
          org.title.should.equal('New Test Org');
          done();
        });

        orgs.putOrg(req, res);
      });
  });

  describe("Delete Org", () => {
      it("should delete an existing org", (done) => {
        let req = {
          params: {id: id},
        };

        let res = testUtils.responseValidatorAsync(200, (obj) => {
          obj.should.have.property('deleted');
          obj.removed.should.equal(true);
          done();
        });

        orgs.deleteOrg(req, res);
      });
  });

  after((done) => {
      Org.remove({}, (err) => {
        if(err) {console.log(err);}
      });

      mongoose.disconnect(done);
  });

});
