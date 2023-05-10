const mongoose = require("mongoose");
const { Schema } = mongoose;
// get object id
// const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema(
  {
    email: String,
    role: [{ type: String }],
    password: String,
    tokenResetPassword: String,
    lang: String,
    image: String,
    state: Object,
    skills: [String],
    money: Number,
    items: [String],
    description: String,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const model = mongoose.model("User", User);
User.index({ email: 1 });

module.exports = model;
