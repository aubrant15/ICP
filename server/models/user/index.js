var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var UserSchema   = new Schema(
{ 
    "_id" : Object, 
    "userid" : String, 
    "orgid" : Object, 
    "type" : String, 
    "role" : String, 
    "fname" : String, 
    "lname" : String, 
    "ssn" : Number, 
    "sex" : String,
    "dob" : Date, 
    "email" : String, 
    "password" : String, 
    "addresses" : [
        {
            "type" : String, 
            "Address1" : String, 
            "Address2" : String, 
            "City" : String, 
            "State" : String, 
            "Postal Code" : String, 
            "Country" : String
        }, 
        {
            "type" : String, 
            "Address1" : String, 
            "Address2" : String, 
            "City" : String, 
            "State" : String, 
            "Postal Code" : String, 
            "Country" : String
        }
    ], 
    "phones" : [
        {
            "type" : String, 
            "Country code" : Number, 
            "number" : String
        }, 
        {
            "type" : String, 
            "Country code" : Number, 
            "number" : String
        }, 
        {
            "type" : String, 
            "Country code" : Number, 
            "number" : String
        }
    ]
});
module.exports = mongoose.model('User', UserSchema);
