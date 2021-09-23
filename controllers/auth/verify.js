const { NotFound } = require("http-errors");

const { User } = require("../../models");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(req.params);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
  res.status(200).send("<h2>Verification successful</h2>");
};

module.exports = verify;
