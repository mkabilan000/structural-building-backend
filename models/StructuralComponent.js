const mongoose = require("mongoose");

/**
 * StructuralComponent
 * Core model — represents a structural element (Footing, Column, Beam, etc.)
 * Contains design concepts, construction steps, materials, physics/math concepts,
 * and image/diagram references.
 */

// ── Sub-schemas ────────────────────────────────────────────────────────────────

const constructionStepSchema = new mongoose.Schema(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tip: { type: String, default: "" },       // Beginner tip / pro-tip
    imageUrl: { type: String, default: "" },
  },
  { _id: false }
);

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, default: "" },
    role: { type: String, required: true },
    whyThisGrade: { type: String, default: "" },   // Beginner explanation of why this grade
    isCodeReference: { type: String, default: "" },
  },
  { _id: false }
);

const physicsConceptSchema = new mongoose.Schema(
  {
    concept: { type: String, required: true },
    explanation: { type: String, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  },
  { _id: false }
);

const mathConceptSchema = new mongoose.Schema(
  {
    concept: { type: String, required: true },
    formula: { type: String, default: "" },
    explanation: { type: String, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "intermediate" },
  },
  { _id: false }
);

const engineeringPrincipleSchema = new mongoose.Schema(
  {
    principle: { type: String, required: true },  // e.g. "Reinforcement Detailing"
    explanation: { type: String, required: true },
    diagramUrl: { type: String, default: "" },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: "" },
    type: {
      type: String,
      enum: ["diagram", "cad", "photo", "reinforcement", "construction"],
      default: "diagram",
    },
  },
  { _id: false }
);

// ── Main Schema ────────────────────────────────────────────────────────────────

const structuralComponentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Component name is required"],
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    // Fun emoji icon for UI display
    emoji: { type: String, default: "🏗️" },
    // Short catchy tagline shown on cards
    tagline: { type: String, default: "" },
    buildingTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BuildingType",
      },
    ],
    // Why this element is necessary (beginner-friendly paragraph)
    necessity: { type: String, required: true },
    // Simple beginner summary (shown at top of detail page)
    beginnerSummary: { type: String, default: "" },
    // High-level design overview
    designConcept: { type: String, required: true },
    // Load transfer mechanism description
    loadTransferPath: { type: String, default: "" },
    // Fun fact for engagement
    funFact: { type: String, default: "" },
    // Real-world analogy for beginners
    realWorldAnalogy: { type: String, default: "" },
    // Step-by-step site construction process
    constructionSteps: [constructionStepSchema],
    // Materials used
    materials: [materialSchema],
    // Physics concepts
    physicsExplanations: [physicsConceptSchema],
    // Mathematics / formula concepts
    mathConcepts: [mathConceptSchema],
    // Engineering principles (reinforcement detailing, etc.)
    engineeringPrinciples: [engineeringPrincipleSchema],
    // Images and diagrams
    images: [imageSchema],
    // Tags for search / filtering
    tags: [{ type: String, lowercase: true, trim: true }],
  },
  { timestamps: true }
);

// Full-text search index on name, designConcept, necessity
structuralComponentSchema.index(
  { name: "text", designConcept: "text", necessity: "text", tags: "text" },
  { name: "component_text_index" }
);

module.exports = mongoose.model("StructuralComponent", structuralComponentSchema);
