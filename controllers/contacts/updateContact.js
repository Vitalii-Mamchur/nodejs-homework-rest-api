const { Contact } = require("../../models");
const { yupContactSchema } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  try {
    const isValid = await yupContactSchema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
