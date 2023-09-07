const { promisify } = require('util');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/AppError');
const secret = 'i-want-to-improve-myself-to-like-myself';
const signToken = (id) => {
  return jwt.sign({ id: id._id }, secret, {
    expiresIn: '90d',
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (Err) {
    res.status(400).json({
      status: 'fail',
      message: Err,
    });
  }
  // next();
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    // console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return new AppError('Incorrect email or password ' || 401);
    }
    const token = signToken(user._id);
    res.status(200).json({ status: 'success', token });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  // Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError("You're not logged in", 401));
  }
  // make this more clear
  // let freshUser;
  try {
    const decoded = await promisify(jwt.verify)(token, secret);
    console.log(decoded);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(new AppError("The user doesn't exit", 401));
    }

    // console.log('this is also done');
    // if (freshUser.changedPasswordAfter(decoded.id)) {
    //   return next(new AppError('User recently changed password'));
    // }
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Please log in again',
    });
  }
  // req.user = freshUser;
  next();
};

// exports.restricTo = (...roles) => {
//   return (req, res, next) => {};
// };
