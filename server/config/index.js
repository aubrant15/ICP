let debug = require('debug');
const config = {
  localdb: 'mongodb://icpUser:london01@localhost/icpDB',
  db: 'mongodb://icpUser:london01@18.220.51.117:27017/icpDB',
  testDb: 'mongodb://icpUserTest:london01@18.220.51.117:27017/icpDB_test'
};
debug.log('Config setup DB info: ' + config.localdb.toString());
module.exports = config;
