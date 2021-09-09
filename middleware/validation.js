const validation = (schema) => {
  return (req, res, next) => {
    const isValid = schema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ message: "missing required value field" });
    }
    next();
  };
};

const validationUpdateStatusContact = (schema) => {
  return (req, res, next) => {
    const isValid = schema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
  };
};

module.exports = { validation, validationUpdateStatusContact };
