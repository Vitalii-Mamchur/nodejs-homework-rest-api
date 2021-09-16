const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const logout = async (req, res, _) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  if (!User) {
    throw new Unauthorized("Not authorized");
  }

  res.status(204).json({
    message: "No Content",
  });
};

module.exports = logout;
