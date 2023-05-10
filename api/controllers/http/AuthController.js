const { Validator } = require("node-input-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const mailjet = require("../../services/mailjet");
const generator = require("generate-password");
const db = require("../../services/database");
const User = db.User;
const fs = require("fs");

const login = async (req, res) => {
  console.log("login");
  console.log(req.body);
  const v = new Validator(req.body, {
    email: "required",
    password: "required",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).json({
      status: 422,
      errorType: "FailValidation",
      error: v.errors,
    });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      status: 401,
      errorType: "DocumentNotFound",
      error: "Email don't match !",
    });
  }
  const compare = (req.body.password === user.password);
  if (compare) {
    const token = jwt.sign(
      {
        identity: user.email,
        role: user.role,
        premium: user.premium,
      },
      process.env.APP_JWT,
      { expiresIn: "7d" }
    );
    const { password, subscription, ...userWithoutHash } = user.toObject();
    return res.status(200).json({
      status: 200,
      data: {
        user: userWithoutHash,
        token: token,
      },
    });
  } else {
    return res.status(401).json({
      status: 401,
      errorType: "MissMatch",
      error: "Password don't match !",
    });
  }
};

const register = async (req, res) => {
  let lang = req.headers["accept-language"];
  if (lang) {
    lang = lang.split(",")[0].split("-")[0];
  } else {
    lang = "fr";
  }
  const v = new Validator(req.body, {
    email: "required|email",
    password: "required|minLength:5",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).json({
      status: 422,
      errorType: "FailValidation",
      error: v.errors,
    });
  }
  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(409).json({
      status: 409,
      errorType: "DocumentExists",
      message: "Email already exist !",
    });
  }
  const user = new User();
  user.email = req.body.email;
  user.role = ["user"];
  user.premium = false;
  user.lang = lang;
  user.password = await bcrypt.hashSync(req.body.password, 10);
  await user.save();
  // let sujetMail = "";
  // if (lang === "fr") {
  //   sujetMail = "uSlow - Bienvenu(e) !";
  // } else {
  //   sujetMail = "uSlow - Welcome !";
  // }
  // const createMail = fs
  //   .readFileSync("./files/template/new-account_" + lang + ".html")
  //   .toString();
  // mailjet.send(req.body.email, sujetMail, createMail);

  const token = jwt.sign(
    {
      identity: user.email,
      role: user.role,
      premium: user.premium,
    },
    process.env.APP_JWT,
    { expiresIn: "7d" }
  );
  const { password, subscription, ...userWithoutHash } = user.toObject();
  return res.status(200).json({
    status: 200,
    data: {
      user: userWithoutHash,
      token: token,
    },
  });
};

const forgetPassword = async (req, res) => {
  const v = new Validator(req.body, {
    email: "required|email",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).json({
      status: 422,
      errorType: "FailValidation",
      error: v.errors,
    });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      status: 401,
      errorType: "DocumentNotFound",
      error: "Email don't match !",
    });
  }
  const key = generator.generate({ length: 40, numbers: true });
  user.tokenResetPassword = key;
  await user.save();
  // let sujetMail = "";
  // if (user.lang === "fr") {
  //   sujetMail = "uSlow - Votre lien de réinitialisation de mot de passe.";
  // } else {
  //   sujetMail = "uSlow - Your password reset link.";
  // }
  // const forgetMail = fs
  //   .readFileSync("./files/template/forget-password_" + user.lang + ".html")
  //   .toString();

  // const resetLink = "https://uslow.io/reset-password?token=" + key;
  // mailjet.send(req.body.email, sujetMail, forgetMail, { resetLink });
  // return res.status(200).json({
  //   status: 200,
  //   data: req.body.email,
  // });
};

const resetPassword = async (req, res) => {
  const v = new Validator(req.body, {
    token: "required",
    password: "required|minLength:5",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).json({
      status: 422,
      errorType: "FailValidation",
      error: v.errors,
    });
  }
  const user = await User.findOne({ tokenResetPassword: req.body.token });
  if (user) {
    user.password = await bcrypt.hashSync(req.body.password, 10);
    user.tokenResetPassword = null;
    await user.save();
    // let sujetMail = "";
    // if (user.lang === "fr") {
    //   sujetMail = "uSlow - Mot de passe modifié.";
    // } else {
    //   sujetMail = "uSlow - Changed password.";
    // }
    // const successPasswordMail = fs
    //   .readFileSync("./files/template/success-password_" + user.lang + ".html")
    //   .toString();

    // mailjet.send(user.email, sujetMail, successPasswordMail);
    // return res.status(200).json({
    //   status: 200,
    //   data: req.body.email,
    // });
  }

  return res.status(403).json({
    status: 403,
    errorType: "DocumentNotFound",
    data: "access forbidden",
  });
};

const changePassword = async (req, res) => {
  const v = new Validator(req.body, {
    password: "required|minLength:5",
    newPassword: "required|minLength:5",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).json({
      status: 422,
      errorType: "FailValidation",
      error: v.errors,
    });
  }
  const user = await User.findOne({ email: req.auth.identity });
  if (!user) {
    return res.status(401).json({
      status: 401,
      errorType: "DocumentNotFound",
      error: "Email don't match !",
    });
  }
  const compare = await bcrypt.compare(req.body.password, user.password);
  if (compare) {
    user.password = bcrypt.hashSync(req.body.newPassword, 10);
    await user.save();
    // let sujetMail = "";
    // if (user.lang === "fr") {
    //   sujetMail = "uSlow - Mot de passe modifié.";
    // } else {
    //   sujetMail = "uSlow - Changed password.";
    // }
    // const successPasswordMail = fs
    //   .readFileSync("./files/template/success-password_" + user.lang + ".html")
    //   .toString();

    // mailjet.send(user.email, sujetMail, successPasswordMail);
    // return res.status(200).json({
    //   status: 200,
    //   data: req.body.email,
    // });
  }
  return res.status(401).json({
    status: 401,
    errorType: "MissMatch",
    error: "Password don't match !",
  });
};

module.exports = {
  login,
  register,
  forgetPassword,
  resetPassword,
  changePassword,
};
