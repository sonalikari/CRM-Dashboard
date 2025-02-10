const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

router.post("/", leadController.createLead);
router.get("/", leadController.getAllLeads);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

// Document Upload Route (With Middleware)
router.post(
  "/:id/upload",
  leadController.uploadMiddleware,
  leadController.uploadDocument
);
router.get("/:id/download/:docIndex", leadController.getDocument);

module.exports = router;
