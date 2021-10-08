const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name: {
    type: String,
    required: [true, 'username is required']
  },
  user_email: {
    type: String,
    required: [true,'useremail is required']
  },
  user_pass: {
    type: String,
    required: [true, 'userpassword is required']
  },
  user_status: {
      type: Number,
      required: true,
      default: 1
  },
  user_registered: {
      type: Date,
      required: [true,'user registered date is required']
  },
  user_role: {
      type: String,  
      required: [true,'user role is required']
  }
});

userSchema.path('user_email').validate(function (email) {
  //console.log(email)
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var emailRegex2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex2.test(email); // Assuming email has a text attribute
}, 'Please enter a valid email')

userSchema.pre('save', function(next) {
  var self = this;
  //console.log(self);
  User.find( { $or:[{'user_name':self.user_name}, {'user_email':self.user_email} ]}, 
  function(err,docs){
     //console.log(docs)
     //console.log(err.errors) 
      if(err) { 
        const err = new Error('User Validation Failed');
        err._message = "User Validation Failed";
        next(err);
      } else {
        if(docs.length>0){
          const err = new Error('User already exits with same username or email');
          err._message = "User already exits with same username or email";
          next(err);
        } else {
          next();
        }
      }
  });
  
});

var User = mongoose.model('User' , userSchema);
module.exports = User;

