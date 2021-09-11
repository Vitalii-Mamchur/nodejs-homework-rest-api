const { Contact } = require("../../models");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const contact = await Contact.findById(id);
    console.log(contact);
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

module.exports = getContactById;
