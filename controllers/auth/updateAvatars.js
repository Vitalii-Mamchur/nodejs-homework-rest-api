const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");

const updateAvatars = async (req, res) => {
  console.log(req.file);
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const newNameAvatar = `${Date.now().toString()}-${originalname}`;
  const uploadPath = path.join(
    __dirname,
    "../../",
    "public/avatars",
    newNameAvatar
  );
  try {
    const file = await Jimp.read(tempPath);
    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = `/avatars/${newNameAvatar}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      data: {
        avatarURL: avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateAvatars;
