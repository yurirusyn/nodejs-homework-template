const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const { validation, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(schemas.addContact), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(schemas.addContact),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
