const { Contact } = require("../../models");
const { yupContactSchema } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const isValid = await yupContactSchema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
