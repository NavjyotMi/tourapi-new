const User = require('./../model/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined' });
};

exports.getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined' });
};
exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not yet defined' });
};

exports.deleteUser = (req, res) => {
  res
    .status(204)
    .json({ status: 'err', message: 'This route is not yet defined' });
};
