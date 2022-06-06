const express = require("express");
const router = express.Router();
const models = require("../../models//contacts");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(0.01).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await models.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await models.getContactById(contactId);
    if (!result) {
      res.status(404).json({
        massage: `contact Id ${contactId} not found `,
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        massage: "missing required name field",
      });
    }
    const { name, email, phone } = req.body;
    const result = await models.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await models.removeContact(contactId);
    if (!result) {
      res.status(404).json({
        massage: `contact Id ${contactId} not found `,
      });
    }
    res.json({
      massage: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        massage: "missing fields",
      });
    }
    const { contactId } = req.params;
    const updatedContact = await models.updateContact(contactId, req.body);
    if (!updatedContact) {
      res.status(404).json({
        massage: "missing fields",
      });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
