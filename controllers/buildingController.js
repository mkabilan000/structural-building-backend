const BuildingType = require("../models/BuildingType");
const StructuralComponent = require("../models/StructuralComponent");

// ── GET /api/buildings ─────────────────────────────────────────────────────────
// List all building types (summary – no populated components)
const getAllBuildings = async (req, res) => {
  try {
    const buildings = await BuildingType.find().select("-components").sort({ name: 1 });
    res.json({ success: true, count: buildings.length, data: buildings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/buildings/:id ─────────────────────────────────────────────────────
// Get one building type with populated component list (name, code, necessity, imageUrl)
const getBuildingById = async (req, res) => {
  try {
    const building = await BuildingType.findById(req.params.id).populate(
      "components",
      "name code necessity imageUrl tags"
    );
    if (!building) {
      return res.status(404).json({ success: false, message: "Building type not found" });
    }
    res.json({ success: true, data: building });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/buildings/code/:code ─────────────────────────────────────────────
// Lookup by code string (e.g. RESIDENTIAL)
const getBuildingByCode = async (req, res) => {
  try {
    const building = await BuildingType.findOne({
      code: req.params.code.toUpperCase(),
    }).populate("components", "name code necessity imageUrl tags");
    if (!building) {
      return res.status(404).json({ success: false, message: "Building type not found" });
    }
    res.json({ success: true, data: building });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST /api/buildings ────────────────────────────────────────────────────────
const createBuilding = async (req, res) => {
  try {
    const building = await BuildingType.create(req.body);
    res.status(201).json({ success: true, data: building });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── PUT /api/buildings/:id ─────────────────────────────────────────────────────
const updateBuilding = async (req, res) => {
  try {
    const building = await BuildingType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!building) {
      return res.status(404).json({ success: false, message: "Building type not found" });
    }
    res.json({ success: true, data: building });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── DELETE /api/buildings/:id ──────────────────────────────────────────────────
const deleteBuilding = async (req, res) => {
  try {
    const building = await BuildingType.findByIdAndDelete(req.params.id);
    if (!building) {
      return res.status(404).json({ success: false, message: "Building type not found" });
    }
    res.json({ success: true, message: "Building type deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllBuildings,
  getBuildingById,
  getBuildingByCode,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
