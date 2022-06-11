const Joi = require("joi");

const addContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(0.01).required(),
});

module.exports = {
  addContact,
};
