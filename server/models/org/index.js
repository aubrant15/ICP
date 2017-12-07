let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let debug = require('debug');

debug.log('in org model');
mongoose.Promise = global.Promise;

let OrgSchema = new Schema(

  {
    '_id': Object,
    'tenatid': Object,
    'name': String,
    'type': String,
    'POC': String,
    'account_type': String,
    'date_active': Date,
    'address': {
      'type': String,
      'Address1': String,
      'Address2': String,
      'City': String,
      'State': String,
      'Postal Code': String,
      'Country': String
    },
    'Phone1': String,
    'Phone2': String
  }, { collection: 'org' }
);
module.exports = mongoose.model('Org', OrgSchema);
