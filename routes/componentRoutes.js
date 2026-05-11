const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/componentController");

/**
 * @route   GET /api/components
 * @desc    Get all components (supports ?buildingType=, ?search=, ?tag=)
 * @access  Public
 */
router.get("/", getAllComponents);

/**
 * @route   GET /api/components/code/:code
 * @desc    Get component by code (e.g. FOOTING)
 * @access  Public
 */
router.get("/code/:code", getComponentByCode);

/**
 * @route   GET /api/components/:id
 * @desc    Get full detail of a structural component
 * @access  Public
 */
router.get("/:id", getComponentById);

/**
 * @route   GET /api/components/:id/design
 * @desc    Get only the design concepts, physics, math, and engineering principles
 * @access  Public
 */
router.get("/:id/design", getComponentDesign);

/**
 * @route   GET /api/components/:id/construction
 * @desc    Get step-by-step construction procedure
 * @access  Public
 */
router.get("/:id/construction", getComponentConstruction);

/**
 * @route   GET /api/components/:id/materials
 * @desc    Get materials used for the component
 * @access  Public
 */
router.get("/:id/materials", getComponentMaterials);

/**
 * @route   GET /api/components/:id/images
 * @desc    Get all diagrams and images for a component
 * @access  Public
 */
router.get("/:id/images", getComponentImages);

/**
 * @route   POST /api/components
 * @desc    Create a new structural component
 * @access  Public
 */
router.post("/", createComponent);

/**
 * @route   PUT /api/components/:id
 * @desc    Update a structural component
 * @access  Public
 */
router.put("/:id", updateComponent);

/**
 * @route   DELETE /api/components/:id
 * @desc    Delete a structural component
 * @access  Public
 */
router.delete("/:id", deleteComponent);

module.exports = router;
