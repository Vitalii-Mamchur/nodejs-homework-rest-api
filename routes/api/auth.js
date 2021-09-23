const express = require("express");
const { controllerWrapper, authenticate, upload } = require("../../middleware");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", controllerWrapper(ctrl.signup));
router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));
router.post("/verify", controllerWrapper(ctrl.controlVerify));
router.post("/login", controllerWrapper(ctrl.login));
router.get(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout)
);
router.get(
  "/current",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.current)
);
router.patch(
  "/avatars",
  controllerWrapper(authenticate),
  upload.single("image"),
  controllerWrapper(ctrl.updateAvatars)
);

module.exports = router;
