const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/", ctrl.addContact);
router.get("/", ctrl.listContacts);
router.get("/:id", ctrl.getContactById);
router.delete("/:id", ctrl.removeContact);
router.put("/:id", ctrl.updateContact);
router.patch("/:id/favorite", ctrl.updateStatusContact);

module.exports = router;
