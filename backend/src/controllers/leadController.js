const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Lead = require("../models/leadModel");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to Upload Directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "leads_documents", // Folder name in Cloudinary
    resource_type: "auto", // Supports images, PDFs, DOCX, etc.
    format: async (req, file) => file.originalname.split(".").pop(), // Keep original file format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique filename
  },
});

const upload = multer({ storage });

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newLead = await Lead.create({ name, phone });
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ message: "Error creating lead", error });
  }
};

// Get All Leads (Paginated)
exports.getAllLeads = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: new RegExp(search, "i") },
          { phone: new RegExp(search, "i") },
        ],
      };
    }
    const leads = await Lead.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};

// Update Lead
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: "Error updating lead", error });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error });
  }
};

// Upload Document (Direct to Cloudinary)
exports.uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = req.file.path;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { $push: { documents: fileUrl } },
      { new: true }
    );

    res.status(200).json({ message: "Document uploaded successfully", lead });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Document URL
exports.getDocument = async (req, res) => {
  try {
    const { id, docIndex } = req.params;

    const lead = await Lead.findById(id);
    if (!lead || !lead.documents || !lead.documents[docIndex]) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Return Cloudinary URL
    res.json({ downloadUrl: lead.documents[docIndex] });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Middleware to Handle File Uploads
exports.uploadMiddleware = upload.single("document");
