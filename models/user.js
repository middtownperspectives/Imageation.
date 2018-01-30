const  mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const  UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    }
});
//user authentication for sign in
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({email : email})
  .exec(function (error, user){ 
    if (error) {
      return callback(error);
    } else if (!user) {
      let err = new Error('User not found');
      err.status = 401;
      return callback(error);
    }
    bcrypt.compare(password, user.password, function (error, result){
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })  
  });
};



// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this; //mongo save the object user data in the "this" word. 
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
