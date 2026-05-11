const express = require("express");
const router = express.Router();
const {
  getAllBuildings,
  getBuildingById,
  getBuildingByCode,
  createBuilding,
  updateBuilding,
  deleteBuilding,
} = require("../controllers/buildingController");

/**
 * @route   GET /api/buildings
 * @desc    Get all building types (summary list)
 * @access  Public
 */
router.get("/", getAllBuildings);

/**
 * @route   GET /api/buildings/code/:code
 * @desc    Get building type by code (e.g. RESIDENTIAL)
 * @access  Public
 */
router.get("/code/:code", getBuildingByCode);

/**
 * @route   GET /api/buildings/:id
 * @desc    Get single building type with its components
 * @access  Public
 */
router.get("/:id", getBuildingById);

/**
 * @route   POST /api/buildings
 * @desc    Create a new building type
 * @access  Public (add auth middleware in production)
 */
router.post("/", createBuilding);

/**
 * @route   PUT /api/buildings/:id
 * @desc    Update a building type
 * @access  Public
 */
router.put("/:id", updateBuilding);

/**
 * @route   DELETE /api/buildings/:id
 * @desc    Delete a building type
 * @access  Public
 */
router.delete("/:id", deleteBuilding);

module.exports = router;
