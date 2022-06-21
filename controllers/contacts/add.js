const { createError } = require("../../helpers");
const schemas = require("../../schemas/contacts");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
module.exports = add;
