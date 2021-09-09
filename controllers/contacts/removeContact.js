const { Contact } = require("../../models");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
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

module.exports = removeContact;
