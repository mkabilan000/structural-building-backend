const mongoose = require("mongoose");

/**
 * BuildingType
 * Represents a category of building (e.g. Residential, Commercial, High-rise).
 * Each building type references the structural components that belong to it.
 */
const buildingTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Building type name is required"],
      unique: true,
      trim: true,
      // e.g. "Residential Building", "Commercial Building"
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      // e.g. "RESIDENTIAL", "COMMERCIAL"
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    // List of component IDs associated with this building type
    components: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StructuralComponent",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BuildingType", buildingTypeSchema);
