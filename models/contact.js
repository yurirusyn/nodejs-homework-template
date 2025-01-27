const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(0.01).required(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addContact,
  updateFavorite,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
