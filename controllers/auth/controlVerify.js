const { BadRequest } = require("http-errors");

const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const controlVerify = async (req, res) => {
  const { email } = req.body;
  //   console.log(email);
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("missing required field email");
  }

  const { verify, verificationToken } = user;

  if (verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Registration on site",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm registration</a>`,
  };

  await sendMail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = controlVerify;
