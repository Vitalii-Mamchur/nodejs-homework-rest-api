// const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { yupUserSchema } = require("../../models/user");

const signup = async (req, res, _) => {
  const isValid = await yupUserSchema.isValid(req.body);
  // console.log(isValid);
  if (!isValid) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { email, password } = req.body;
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  // const newUser = await User.create({ email, password: hashPassword });
  const newUser = new User({ email });
  newUser.setPassword(password);
  const gravatarURL = gravatar.url(`${newUser.email}`);
  newUser.avatarURL = "https:" + gravatarURL;
  // console.log(newUser.avatarURL);
  await newUser.save();
  res.status(201).json({
    user: {
      email: `${newUser.email}`,
      subscription: "starter",
    },
  });
};
module.exports = signup;
