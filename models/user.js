var mongoose = require('mongoose');

//It's a schema which consists of two fields name and password
const UserSchema = mongoose.Schema({
   name:{
     type:String,
     require:true
   },
   password:{
     type:String,
     require:true
   }
});
module.exports = User = mongoose.model('UserSchema',UserSchema);