const validation = require("./validation");
const validationUpdateStatusContact = require("./validation");
const controllerWrapper = require("./controllerWrapper");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validation,
  validationUpdateStatusContact,
  controllerWrapper,
  authenticate,
  upload,
};
