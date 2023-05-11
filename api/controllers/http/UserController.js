const db = require("../../services/database");
const User = db.User;
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  const email = req.query.email || req.auth.identity;
  console.log(email);
  let user = await User.findOne({ email: email });
  if (req.body.email && req.body.email !== email) {
    const newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
      return res.status(409).json({
        status: 409,
        errorType: "DocumentAlreadyExist",
        error: "Email already exist !",
      });
    }
  }
  user = Object.assign(user, req.body);
  // save user
  await user.save();

  const { password, subscription, ...userWithoutHash } = user.toObject();
  res.status(200).json({
    status: 200,
    data: userWithoutHash,
  });
};

const info = async (req, res) => {
  const user = await User.findOne({ email: req.auth.identity });
  const { password, subscription, ...userWithoutHash } = user.toObject();
  res.status(200).json({
    status: 200,
    data: userWithoutHash,
  });
};

const getOne = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const { password, subscription, ...userWithoutHash } = user.toObject();
  res.status(200).json({
    status: 200,
    data: userWithoutHash,
  });
};

const deleteOne = async (req, res) => {
  await User.findOneAndRemove({ email: req.auth.identity });
  res.status(200).json({
    status: 200,
    data: "User deleted",
  });
};

const updateOne = async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  // update user from body
  if (req.body.email != user.email) {
    const newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
      return res.status(409).json({
        status: 409,
        errorType: "DocumentAlreadyExist",
        error: "Email already exist !",
      });
    }
  }
  user = Object.assign(user, req.body);
  if (req.body.password) {
    user.password = bcrypt.hashSync(req.body.password, 10);
  }
  user = await user.save();
  const { password, subscription, ...userWithoutHash } = user.toObject();

  res.status(200).json({
    status: 200,
    data: userWithoutHash,
  });
};

const getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 200,
    data: users,
  });
};

module.exports = {
  update,
  info,
  getOne,
  deleteOne,
  updateOne,
  getAll,
};
