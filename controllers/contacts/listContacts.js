const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  try {
    const allContact = await Contact.find({});
    res.json({
      allContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
