const express = require("express");
const {
  createProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.post("/", createProperty);
router.get("/", getAllProperties);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
