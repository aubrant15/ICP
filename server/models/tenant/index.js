var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TenantSchema = new Schema ({
  _id : Object,
  name : String,
  domain : String,
  status : String,
  database : String,
},{ collection : 'tenant' });

module.exports = mongoose.model('Tenant', TenantSchema);