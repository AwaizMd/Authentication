const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET= "authentication_key" ;  //this should be complex.
const JWT_EXPIRE="5d";

//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxlength: [20, "Cannot exceed the limit"],
        minlength: [4, "Name should have more that 5 chrs"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: [8, "Password should have more that 8 chrs"],
        select: false,
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        }
      },
      role:{
          type:String,
          default:"user"
      },
      resetPasswordToken:String,
      resetPasswordExpire:Date,

})

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password =await bcrypt.hash(this.password,10);
})

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({id:this._id},JWT_SECRET,{
    expiresIn:JWT_EXPIRE,
  });
};

//Compare Password.
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);

}

module.exports=mongoose.model("Users",userSchema);