const { Schema, model } = require("mongoose");
const yup = require("yup");

const phoneRegex = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      match: emailRegex,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const yupContactSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(14).max(14).required(),
  favorite: yup.boolean(),
});

const yupUpdateStatusSchema = yup.object({
  favorite: yup.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, yupContactSchema, yupUpdateStatusSchema };
