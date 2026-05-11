const StructuralComponent = require("../models/StructuralComponent");
const BuildingType = require("../models/BuildingType");

// ── GET /api/components ────────────────────────────────────────────────────────
// List components with optional filters:
//   ?buildingType=<id>  — filter by building type
//   ?search=<text>      — full-text search
//   ?tag=<tag>          — filter by tag
const getAllComponents = async (req, res) => {
  try {
    const { buildingType, search, tag } = req.query;
    const query = {};

    if (buildingType) {
      query.buildingTypes = buildingType;
    }

    if (tag) {
      query.tags = tag.toLowerCase();
    }

    if (search) {
      query.$text = { $search: search };
    }

    const components = await StructuralComponent.find(query)
      .select("name code necessity imageUrl tags buildingTypes")
      .populate("buildingTypes", "name code")
      .sort({ name: 1 });

    res.json({ success: true, count: components.length, data: components });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/components/:id ────────────────────────────────────────────────────
// Full detail page for a single component (all sub-documents included)
const getComponentById = async (req, res) => {
  try {
    const component = await StructuralComponent.findById(req.params.id).populate(
      "buildingTypes",
      "name code"
    );
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/components/code/:code ────────────────────────────────────────────
// Lookup by code (e.g. FOOTING)
const getComponentByCode = async (req, res) => {
  try {
    const component = await StructuralComponent.findOne({
      code: req.params.code.toUpperCase(),
    }).populate("buildingTypes", "name code");
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/components/:id/design ────────────────────────────────────────────
// Return only the design + physics + math + engineering sections
const getComponentDesign = async (req, res) => {
  try {
    const component = await StructuralComponent.findById(req.params.id).select(
      "name code designConcept loadTransferPath physicsExplanations mathConcepts engineeringPrinciples"
    );
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/components/:id/construction ──────────────────────────────────────
// Return only the construction procedure steps
const getComponentConstruction = async (req, res) => {
  try {
    const component = await StructuralComponent.findById(req.params.id).select(
      "name code constructionSteps"
    );
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/components/:id/materials ─────────────────────────────────────────
// Return only the materials section
const getComponentMaterials = async (req, res) => {
  try {
    const component = await StructuralComponent.findById(req.params.id).select(
      "name code materials"
    );
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/components/:id/images ────────────────────────────────────────────
// Return all diagrams / CAD images for a component
const getComponentImages = async (req, res) => {
  try {
    const component = await StructuralComponent.findById(req.params.id).select(
      "name code images"
    );
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST /api/components ──────────────────────────────────────────────────────
// Create a new component and back-link it to its building types
const createComponent = async (req, res) => {
  try {
    const component = await StructuralComponent.create(req.body);

    // Back-link: add component reference to each associated building type
    if (component.buildingTypes && component.buildingTypes.length > 0) {
      await BuildingType.updateMany(
        { _id: { $in: component.buildingTypes } },
        { $addToSet: { components: component._id } }
      );
    }

    res.status(201).json({ success: true, data: component });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── PUT /api/components/:id ───────────────────────────────────────────────────
const updateComponent = async (req, res) => {
  try {
    const component = await StructuralComponent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }
    res.json({ success: true, data: component });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── DELETE /api/components/:id ────────────────────────────────────────────────
const deleteComponent = async (req, res) => {
  try {
    const component = await StructuralComponent.findByIdAndDelete(req.params.id);
    if (!component) {
      return res.status(404).json({ success: false, message: "Component not found" });
    }

    // Remove back-references from building types
    await BuildingType.updateMany(
      { components: component._id },
      { $pull: { components: component._id } }
    );

    res.json({ success: true, message: "Component deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllComponents,
  getComponentById,
  getComponentByCode,
  getComponentDesign,
  getComponentConstruction,
  getComponentMaterials,
  getComponentImages,
  createComponent,
  updateComponent,
  deleteComponent,
};
