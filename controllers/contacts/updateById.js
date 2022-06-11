const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");
const schemas = require("../../schemas/contacts");
const updateById = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!updatedContact) {
    throw createError(404);
  }
  res.json(updatedContact);
};
module.exports = updateById;
