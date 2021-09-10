const { Schema, model } = require("mongoose");
const yup = require("yup");

const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const validationSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(14).max(14).required(),
  favorite: yup.string(),
});

const validationUpdateStatusSchema = yup.object({
  favorite: yup.string().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, validationSchema, validationUpdateStatusSchema };
