const Property = require("../models/propertyModel");

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: "Error creating property", error });
  }
};

// Get All Properties (Paginated)
exports.getAllProperties = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (search) {
      filter = { location: new RegExp(search, "i") };
    }
    const properties = await Property.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: "Error updating property", error });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};
