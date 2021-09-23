const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const { yupUserSchema } = require("../../models/user");

const login = async (req, res) => {
  const isValid = await yupUserSchema.isValid(req.body);
  if (!isValid) {
    throw new Unauthorized("Missing required name field");
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email is wrong");
  }
  if (!user.verify) {
    throw new Unauthorized("Email is not verify");
  }

  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);

  if (!compareResult) {
    throw new Unauthorized("Password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

module.exports = login;
