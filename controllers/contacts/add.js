const { createError } = require("../../helpers");
const schemas = require("../../schemas/contacts");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
module.exports = add;
