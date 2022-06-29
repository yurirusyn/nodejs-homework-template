const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const { validation, auth, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/register",
  validation(schemas.registerUser),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.loginUser), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.post("/current", auth, ctrlWrapper(ctrl.getCurrentUser));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
