const { Contact } = require("../../models");
const { validationUpdateStatusSchema } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { favorite } = req.body;
    const isValid = await validationUpdateStatusSchema.isValid({ favorite });
    if (!isValid) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );
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

module.exports = updateStatusContact;
