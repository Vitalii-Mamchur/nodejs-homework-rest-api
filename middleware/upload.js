const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, tmpDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
