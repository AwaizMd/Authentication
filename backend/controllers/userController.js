const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");


//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepic",
    },
  });

  // const token = user.getJWTToken();
  // // console.log(token);

  // res.status(201).json({
  //   success: true,
  //   token,
  // });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both.

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  // find user                       because we had falsed password so using select.
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  // const token = user.getJWTToken();
  // // console.log(token);

  // res.status(200).json({
  //   success: true,
  //   token,
  // });

  // -----------------  or --------------------

  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "Logout successfully",
  });
});