const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json({
    massage: "Product deleted successfully",
  });
};
module.exports = removeById;