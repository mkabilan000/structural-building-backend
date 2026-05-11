/**
 * Seed script – populates DB with:
 *   • 2 Building Types  : Residential RCC, High-Rise Framed Structure
 *   • 10 Structural Components : Footing, Column, Beam, Slab, Shear Wall,
 *                                Staircase, Retaining Wall, Lintel, Plinth Beam, Tie Beam
 *
 * Run: node seed/seedData.js
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const BuildingType = require("../models/BuildingType");
const StructuralComponent = require("../models/StructuralComponent");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/structural_explorer";

// ── Component seed data ────────────────────────────────────────────────────────

const componentSeeds = [
  {
    name: "Footing",
    code: "FOOTING",
    necessity:
      "Footings distribute the entire superstructure load safely to the bearing soil, preventing differential settlement and structural failure.",
    designConcept:
      "A footing is designed based on the safe bearing capacity (SBC) of soil. The area of the footing is calculated as: A = P / SBC. Isolated footings are designed for axial loads, while combined footings handle two or more columns. The design follows IS 456:2000.",
    loadTransferPath:
      "Slab → Beam → Column → Footing → Soil",
    constructionSteps: [
      { stepNumber: 1, title: "Excavation", description: "Dig the pit to the required depth as per soil investigation report." },
      { stepNumber: 2, title: "PCC Laying", description: "Lay 75 mm plain cement concrete (1:4:8) as bed/leveling course." },
      { stepNumber: 3, title: "Reinforcement Placement", description: "Place bottom mesh reinforcement with correct cover blocks (50 mm)." },
      { stepNumber: 4, title: "Shuttering", description: "Erect formwork (shuttering) around the footing dimensions." },
      { stepNumber: 5, title: "Concreting", description: "Pour M25 concrete and compact using a needle vibrator." },
      { stepNumber: 6, title: "Curing", description: "Wet-cure for a minimum of 7 days to achieve design strength." },
    ],
    materials: [
      { name: "RCC Concrete", grade: "M25", role: "Structural body of the footing", isCodeReference: "IS 456:2000" },
      { name: "Steel Reinforcement Bars", grade: "Fe500", role: "Resist tension and bending", isCodeReference: "IS 1786" },
      { name: "Formwork (Shuttering)", grade: "", role: "Mould the shape of the footing" },
      { name: "Cover Blocks", grade: "", role: "Maintain 50 mm clear cover" },
    ],
    physicsExplanations: [
      { concept: "Load Transfer", explanation: "The column load is spread over a larger base area, reducing stress intensity on the soil." },
      { concept: "Bearing Pressure", explanation: "Upward soil pressure acts on the soffit of the footing, inducing bending and shear." },
    ],
    mathConcepts: [
      { concept: "Area of Footing", formula: "A = P / q_a", explanation: "P = column load (kN), q_a = safe bearing capacity of soil (kN/m²)." },
      { concept: "Bending Moment at Column Face", formula: "M = (q_u × l²) / 2", explanation: "q_u = factored upward soil pressure, l = projection from column face." },
    ],
    engineeringPrinciples: [
      { principle: "Two-way Shear (Punching)", explanation: "Critical perimeter is checked at d/2 from column face to prevent punching shear failure." },
      { principle: "Development Length", explanation: "Column bars must extend into the footing by the development length (L_d) to transfer forces safely." },
    ],
    images: [
      { url: "/images/footing_diagram.png", caption: "Isolated Footing Section", type: "diagram" },
      { url: "/images/footing_reinforcement.png", caption: "Reinforcement Layout", type: "reinforcement" },
    ],
    tags: ["foundation", "footing", "substructure", "rcc"],
  },
  {
    name: "Column",
    code: "COLUMN",
    necessity:
      "Columns carry vertical compressive loads from beams and slabs down to the foundations. They are the primary vertical load-bearing members of a building.",
    designConcept:
      "Columns are designed as short or slender compression members per IS 456:2000. The design considers factored axial load (Pu) and bending moments (Mux, Muy). Minimum eccentricity is ensured. Longitudinal bars carry load; lateral ties/stirrups prevent buckling.",
    loadTransferPath:
      "Roof Slab → Beams → Column → Footing",
    constructionSteps: [
      { stepNumber: 1, title: "Reinforcement Cage Fabrication", description: "Fabricate longitudinal bars and bind lateral ties at specified spacing." },
      { stepNumber: 2, title: "Positioning", description: "Position the cage with correct cover blocks and plumb it vertically." },
      { stepNumber: 3, title: "Shuttering", description: "Erect column formwork ensuring it is vertical, leak-proof, and well-oiled." },
      { stepNumber: 4, title: "Concreting", description: "Pour M25/M30 concrete in layers and compact with a needle vibrator." },
      { stepNumber: 5, title: "De-shuttering & Curing", description: "Remove formwork after 24–48 hrs and cure exposed surfaces for 7 days." },
    ],
    materials: [
      { name: "High-strength Concrete", grade: "M25–M40", role: "Resist compressive load", isCodeReference: "IS 456:2000" },
      { name: "Longitudinal Steel Bars", grade: "Fe500", role: "Carry axial load and bending", isCodeReference: "IS 1786" },
      { name: "Lateral Ties / Stirrups", grade: "Fe415", role: "Prevent buckling of longitudinal bars and resist shear" },
    ],
    physicsExplanations: [
      { concept: "Axial Compression", explanation: "Columns primarily resist compressive forces directed along their axis." },
      { concept: "Lateral Stability", explanation: "Lateral ties confine the concrete core and prevent sudden buckling." },
    ],
    mathConcepts: [
      { concept: "Axial Load Capacity", formula: "Pu = 0.4 × fck × Ac + 0.67 × fy × Asc", explanation: "fck = characteristic compressive strength of concrete, fy = yield strength of steel." },
      { concept: "Slenderness Ratio", formula: "λ = l_eff / i", explanation: "l_eff = effective length; i = radius of gyration. Columns with λ > 12 are slender." },
    ],
    engineeringPrinciples: [
      { principle: "Minimum Eccentricity", explanation: "IS 456 mandates design for a minimum eccentricity of l/500 + D/30 ≥ 20 mm." },
      { principle: "Reinforcement Limits", explanation: "Longitudinal steel: 0.8%–6% of gross cross-section area." },
    ],
    images: [
      { url: "/images/column_section.png", caption: "Column Cross Section with Ties", type: "diagram" },
    ],
    tags: ["column", "vertical member", "compression", "rcc"],
  },
  {
    name: "Beam",
    code: "BEAM",
    necessity:
      "Beams transfer floor/roof loads from slabs to columns. They resist bending and shear, forming the horizontal framework of a building.",
    designConcept:
      "Beams are flexural members designed for bending moment (Mu) and shear force (Vu) as per IS 456:2000. T-beam or rectangular section is chosen based on location. Tension steel at bottom resists sagging; stirrups resist diagonal tension (shear).",
    loadTransferPath:
      "Slab → Beam → Column",
    constructionSteps: [
      { stepNumber: 1, title: "Centering & Shuttering", description: "Erect props and horizontal planks (centering) to support the beam mould." },
      { stepNumber: 2, title: "Bottom Bar Placement", description: "Place main tension reinforcement at the bottom with required cover." },
      { stepNumber: 3, title: "Stirrup Binding", description: "Bind stirrups at the specified spacing along the beam length." },
      { stepNumber: 4, title: "Top Bar & Hanger Bars", description: "Place compression steel (top bars) and hanger bars to hold stirrups." },
      { stepNumber: 5, title: "Concreting", description: "Cast concrete monolithically with the slab above where possible." },
      { stepNumber: 6, title: "Curing", description: "Cure for 14 days minimum, especially for post-cast exposed surfaces." },
    ],
    materials: [
      { name: "Concrete", grade: "M25", role: "Resist compressive stresses in the compression zone", isCodeReference: "IS 456:2000" },
      { name: "Main Steel (Tension)", grade: "Fe500", role: "Resist bending tension at the bottom" },
      { name: "Stirrups (Shear Links)", grade: "Fe415", role: "Resist diagonal tension / shear force" },
    ],
    physicsExplanations: [
      { concept: "Bending", explanation: "A beam bends under transverse load — the bottom fibres go into tension and the top fibres into compression." },
      { concept: "Shear Force", explanation: "Shear force creates diagonal tension cracks; stirrups stitch these cracks to prevent failure." },
    ],
    mathConcepts: [
      { concept: "Bending Moment (UDL)", formula: "M = wl² / 8", explanation: "w = uniformly distributed load per unit length, l = span." },
      { concept: "Shear Force (UDL)", formula: "V = wl / 2", explanation: "Maximum shear occurs at supports." },
    ],
    engineeringPrinciples: [
      { principle: "Moment Redistribution", explanation: "In continuous beams, moments can be redistributed up to 30% from elastic values, saving steel." },
      { principle: "Development Length", explanation: "Bars must be anchored beyond the point of zero moment by the development length L_d." },
    ],
    images: [
      { url: "/images/beam_section.png", caption: "Beam Section and Reinforcement", type: "diagram" },
    ],
    tags: ["beam", "horizontal member", "flexure", "shear", "rcc"],
  },
  {
    name: "Slab",
    code: "SLAB",
    necessity:
      "Slabs form the floors and roofs of buildings. They distribute occupancy loads (live loads) over the beams and act as horizontal diaphragms to transmit lateral forces to shear walls.",
    designConcept:
      "Slabs are plate elements designed as one-way or two-way depending on the aspect ratio (ly/lx). One-way slabs span in one direction; two-way slabs have reinforcement in both directions. Effective depth is chosen to control deflection.",
    loadTransferPath:
      "Live Load / Dead Load on Slab → Beams → Columns → Footings → Soil",
    constructionSteps: [
      { stepNumber: 1, title: "Centering", description: "Erect props and horizontal shuttering boards at slab soffit level." },
      { stepNumber: 2, title: "Main Steel Placement", description: "Lay main bars along the shorter span (lx) at bottom with 15 mm cover." },
      { stepNumber: 3, title: "Distribution Steel", description: "Lay distribution bars perpendicular to main bars to distribute load." },
      { stepNumber: 4, title: "Electrical / Plumbing Conduits", description: "Embed conduits before concreting if required." },
      { stepNumber: 5, title: "Concreting & Finishing", description: "Pour and compact concrete; level the top surface." },
      { stepNumber: 6, title: "Curing", description: "Pond cure the slab for 14 days for best results." },
    ],
    materials: [
      { name: "Concrete", grade: "M20–M25", role: "Structural body", isCodeReference: "IS 456:2000" },
      { name: "Main Reinforcement", grade: "Fe500", role: "Resist bending tension along shorter span" },
      { name: "Distribution Steel", grade: "Fe415", role: "Distribute concentrated loads and control shrinkage cracks" },
    ],
    physicsExplanations: [
      { concept: "One-way vs Two-way Action", explanation: "When ly/lx > 2, loads are transferred mainly in the shorter direction (one-way). Below 2, both spans share the load (two-way)." },
      { concept: "Diaphragm Action", explanation: "In-plane stiffness of the slab transfers lateral wind/seismic loads to vertical shear walls." },
    ],
    mathConcepts: [
      { concept: "Effective Span", formula: "l_eff = clear span + d  (or centre-to-centre, whichever is less)", explanation: "d = effective depth of slab." },
      { concept: "Limiting Span-Depth Ratio", formula: "l/d ≤ 26 (simply supported), 32 (continuous)", explanation: "Controls deflection without detailed calculation (IS 456 Cl. 23.2)." },
    ],
    engineeringPrinciples: [
      { principle: "Minimum Reinforcement", explanation: "Ast_min = 0.12% of bD for HYSD bars (IS 456 Cl. 26.5.2.1)." },
      { principle: "Punching Shear", explanation: "Around column supports, punching shear is checked on a critical perimeter at d/2 from column face." },
    ],
    images: [
      { url: "/images/slab_one_way.png", caption: "One-Way Slab Reinforcement", type: "diagram" },
      { url: "/images/slab_two_way.png", caption: "Two-Way Slab Reinforcement", type: "diagram" },
    ],
    tags: ["slab", "floor", "roof", "diaphragm", "rcc"],
  },
  {
    name: "Shear Wall",
    code: "SHEAR_WALL",
    necessity:
      "Shear walls resist lateral loads from earthquakes and wind, preventing the building from swaying. They provide the primary lateral load-resisting system in high-rise structures.",
    designConcept:
      "Shear walls act as vertical cantilever beams fixed at the foundation. They are designed for in-plane bending moment, shear force, and axial load. Boundary elements (zones of concentrated reinforcement) are provided at edges for ductility.",
    loadTransferPath:
      "Lateral Load (Wind / EQ) → Floor Slab (Diaphragm) → Shear Wall → Foundation",
    constructionSteps: [
      { stepNumber: 1, title: "Boundary Element Reinforcement", description: "Fabricate closely-spaced ties at boundary elements for confinement." },
      { stepNumber: 2, title: "Web Reinforcement", description: "Place horizontal and vertical web steel within specified spacing." },
      { stepNumber: 3, title: "Shuttering", description: "Erect two-sided formwork for the wall panel." },
      { stepNumber: 4, title: "Concreting", description: "Pour self-compacting or vibrated concrete in lifts not exceeding 600 mm." },
      { stepNumber: 5, title: "Curing", description: "Cure using hessian cloth kept wet for 14 days." },
    ],
    materials: [
      { name: "High-Grade Concrete", grade: "M30–M40", role: "Resist compressive and shear stresses", isCodeReference: "IS 13920" },
      { name: "Horizontal Web Bars", grade: "Fe500", role: "Resist in-plane shear" },
      { name: "Vertical Web Bars", grade: "Fe500", role: "Resist bending and axial load" },
      { name: "Boundary Element Ties", grade: "Fe415", role: "Provide ductile confinement at extreme fibres" },
    ],
    physicsExplanations: [
      { concept: "In-plane Shear", explanation: "Lateral forces create shear in the plane of the wall; horizontal reinforcement carries this shear." },
      { concept: "Overturning Moment", explanation: "Lateral loads create large overturning moments at the base; boundary elements resist the resulting tension and compression." },
    ],
    mathConcepts: [
      { concept: "Shear Stress", formula: "τv = Vu / (t × d_w)", explanation: "Vu = factored shear, t = wall thickness, d_w = effective depth of wall." },
      { concept: "Nominal Shear Reinforcement", formula: "ρh ≥ 0.0025 (horizontal), ρv ≥ 0.0025 (vertical)", explanation: "Minimum reinforcement ratios per IS 13920." },
    ],
    engineeringPrinciples: [
      { principle: "Ductile Detailing", explanation: "IS 13920 mandates ductile detailing for shear walls in seismic zones III, IV, and V." },
      { principle: "Boundary Element Design", explanation: "Boundary elements are required when extreme fibre compressive stress > 0.2 × fck." },
    ],
    images: [
      { url: "/images/shear_wall_plan.png", caption: "Shear Wall Plan and Elevation", type: "diagram" },
    ],
    tags: ["shear wall", "lateral load", "earthquake", "high-rise"],
  },
  {
    name: "Staircase",
    code: "STAIRCASE",
    necessity:
      "Staircases provide the means of vertical circulation between floors. They must be safe, durable, and meet fire-escape requirements.",
    designConcept:
      "RCC staircases are designed as inclined slabs spanning between landing beams. The waist slab and steps carry the dead load of the staircase plus live load (5 kN/m² as per IS 875 Part 2). The effective span is the horizontal distance between supports.",
    loadTransferPath:
      "Step Load → Waist Slab → Landing Beam → Column / Wall",
    constructionSteps: [
      { stepNumber: 1, title: "Centering & Shuttering", description: "Construct inclined formwork for the waist slab and step risers." },
      { stepNumber: 2, title: "Reinforcement", description: "Lay main bars along the inclined soffit; provide distribution bars." },
      { stepNumber: 3, title: "Riser & Tread Formwork", description: "Fix riser boards to create step profiles." },
      { stepNumber: 4, title: "Concreting", description: "Cast waist slab and steps monolithically; compact well at step angles." },
      { stepNumber: 5, title: "Finishing", description: "Apply finishing coat on treads; provide non-slip nosing strips." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Structural waist slab and steps" },
      { name: "Main Steel", grade: "Fe500", role: "Resist tension in the waist slab" },
      { name: "Distribution Steel", grade: "Fe415", role: "Transverse distribution" },
      { name: "Non-slip Nosing", grade: "", role: "Safety on tread edges" },
    ],
    physicsExplanations: [
      { concept: "Inclined Slab Action", explanation: "The waist slab spans between landings as an inclined simply-supported or continuous slab." },
    ],
    mathConcepts: [
      { concept: "Step Geometry", formula: "2R + T = 600 mm (Rule of Thumb)", explanation: "R = riser height (≈ 150 mm), T = tread width (≈ 300 mm) for comfortable walking." },
      { concept: "Load on Horizontal Plan", formula: "w = (DL + LL) / cos α", explanation: "α = angle of inclination of the waist slab." },
    ],
    engineeringPrinciples: [
      { principle: "Effective Span", explanation: "Taken as the horizontal distance between centres of landing beams (or supports)." },
    ],
    images: [
      { url: "/images/staircase_section.png", caption: "Staircase Section and Reinforcement", type: "diagram" },
    ],
    tags: ["staircase", "vertical circulation", "waist slab", "rcc"],
  },
  {
    name: "Retaining Wall",
    code: "RETAINING_WALL",
    necessity:
      "Retaining walls hold back soil on sloped terrain, road embankments, or basement excavations, preventing slope failure and soil erosion.",
    designConcept:
      "Cantilever retaining walls act as vertical cantilevers fixed at the base. They are designed against sliding, overturning, and bearing failure. The stem resists lateral earth pressure (Rankine / Coulomb); the base slab and heel counteract overturning.",
    loadTransferPath:
      "Lateral Earth Pressure → Stem (Cantilever) → Base Slab → Foundation Soil",
    constructionSteps: [
      { stepNumber: 1, title: "Excavation & PCC", description: "Excavate to foundation level and lay PCC bed." },
      { stepNumber: 2, title: "Base Slab Reinforcement & Casting", description: "Place reinforcement and cast the base slab first." },
      { stepNumber: 3, title: "Stem Reinforcement", description: "Erect starter bars and full stem reinforcement cage." },
      { stepNumber: 4, title: "Stem Shuttering & Casting", description: "Erect double-sided formwork and cast the stem in lifts." },
      { stepNumber: 5, title: "Backfilling", description: "Backfill behind the wall in compacted layers; provide weep holes for drainage." },
    ],
    materials: [
      { name: "Concrete", grade: "M25", role: "Stem and base slab structural body" },
      { name: "Steel Reinforcement", grade: "Fe500", role: "Resist bending in stem and base" },
      { name: "Weep Hole Pipes", grade: "", role: "Drain hydrostatic water pressure" },
      { name: "Drainage Layer (Gravel)", grade: "", role: "Relieve pore water pressure behind wall" },
    ],
    physicsExplanations: [
      { concept: "Active Earth Pressure", explanation: "Lateral soil pressure acting on the stem; Ka = (1 - sin φ) / (1 + sin φ) by Rankine's theory." },
      { concept: "Overturning vs Restoring Moment", explanation: "Factor of safety against overturning = Restoring Moment / Overturning Moment ≥ 2." },
    ],
    mathConcepts: [
      { concept: "Rankine's Active Pressure", formula: "Pa = ½ × Ka × γ × H²", explanation: "Ka = active earth pressure coefficient, γ = unit weight of soil, H = height of wall." },
      { concept: "FS against Sliding", formula: "FS = μ × W / Pa ≥ 1.5", explanation: "μ = friction coefficient, W = total vertical load." },
    ],
    engineeringPrinciples: [
      { principle: "Drainage", explanation: "Hydrostatic pressure can double lateral loads; weep holes and gravel drains are essential." },
    ],
    images: [
      { url: "/images/retaining_wall.png", caption: "Cantilever Retaining Wall Section", type: "diagram" },
    ],
    tags: ["retaining wall", "earth pressure", "basement", "slope"],
  },
  {
    name: "Lintel",
    code: "LINTEL",
    necessity:
      "Lintels bridge the gap above door and window openings, transferring the load from the wall above the opening to the adjacent masonry on either side.",
    designConcept:
      "An RCC lintel is designed as a simply supported beam spanning the clear opening. It carries a triangular portion of wall load (due to arching action in masonry) plus any direct load above. Minimum bearing of 150 mm on each side is required.",
    loadTransferPath:
      "Wall Load Above Opening → Lintel (Beam) → Masonry on Sides of Opening",
    constructionSteps: [
      { stepNumber: 1, title: "Shuttering", description: "Support the lintel mould at the required level above the opening." },
      { stepNumber: 2, title: "Reinforcement", description: "Place 2–4 main bars at the bottom; provide stirrups." },
      { stepNumber: 3, title: "Concreting", description: "Cast M20 concrete and compact well." },
      { stepNumber: 4, title: "Curing", description: "Cure for 7 days before removing props." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Structural span across opening" },
      { name: "Main Steel Bars", grade: "Fe415", role: "Resist bending tension at soffit" },
      { name: "Stirrups", grade: "Fe250", role: "Resist shear near supports" },
    ],
    physicsExplanations: [
      { concept: "Arching Action", explanation: "In well-bonded masonry, loads redistribute above the opening via a natural arch; only a triangular load (height = 0.866 × span) acts on the lintel." },
    ],
    mathConcepts: [
      { concept: "Triangular Load (Arching)", formula: "w_eq = γ × 0.866 × l / 2", explanation: "Equivalent UDL from triangular masonry load above the lintel." },
    ],
    engineeringPrinciples: [
      { principle: "Minimum Bearing", explanation: "Lintel must bear at least 150 mm on each side of the opening to distribute the reaction into the masonry." },
    ],
    images: [
      { url: "/images/lintel.png", caption: "Lintel Section and Reinforcement", type: "diagram" },
    ],
    tags: ["lintel", "opening", "masonry", "door", "window"],
  },
  {
    name: "Plinth Beam",
    code: "PLINTH_BEAM",
    necessity:
      "Plinth beams are provided at the plinth level to connect all column footings, preventing differential settlement and stopping cracks from propagating from the foundation into the superstructure.",
    designConcept:
      "A plinth beam is designed as a tie connecting column stumps at the ground level. It prevents the relative displacement of footings. In seismic zones, it is designed to resist axial tension or compression equal to Pu/10 per IS 13920.",
    loadTransferPath:
      "Differential Settlement Force → Plinth Beam → Adjacent Footings",
    constructionSteps: [
      { stepNumber: 1, title: "Column Stump Preparation", description: "Clean column starter bars and ensure correct alignment." },
      { stepNumber: 2, title: "Reinforcement", description: "Bind plinth beam cage and connect to column bars with lap/coupling." },
      { stepNumber: 3, title: "Shuttering", description: "Erect side formwork at plinth level." },
      { stepNumber: 4, title: "Concreting", description: "Cast M20 concrete; ensure monolithic connection with column stumps." },
      { stepNumber: 5, title: "Backfill", description: "After curing, backfill below the slab-on-grade and compact." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Structural body" },
      { name: "Longitudinal Bars", grade: "Fe500", role: "Carry tension/compression from differential settlement" },
      { name: "Stirrups", grade: "Fe415", role: "Confinement and shear resistance" },
    ],
    physicsExplanations: [
      { concept: "Differential Settlement Prevention", explanation: "By tying footings together, plinth beams redistribute loads and prevent one footing from settling more than others." },
    ],
    mathConcepts: [
      { concept: "Seismic Axial Force", formula: "N_design = Pu_column / 10", explanation: "Plinth beams must resist axial force equal to 10% of column's factored axial load in seismic zones (IS 13920)." },
    ],
    engineeringPrinciples: [
      { principle: "Tie Function", explanation: "In seismic design, plinth beams serve as horizontal ties to maintain the integrity of the foundation system during ground motion." },
    ],
    images: [
      { url: "/images/plinth_beam.png", caption: "Plinth Beam at Ground Level", type: "diagram" },
    ],
    tags: ["plinth beam", "ground beam", "tie beam", "foundation", "settlement"],
  },
  {
    name: "Tie Beam",
    code: "TIE_BEAM",
    necessity:
      "Tie beams connect columns at an intermediate level (between plinth and floor beam) to reduce the effective length of columns, improving their buckling resistance and providing structural continuity.",
    designConcept:
      "Tie beams are designed to carry no transverse load but resist axial tension/compression. Their primary role is to reduce the slenderness ratio of columns. They also help in distributing lateral seismic forces through the frame.",
    loadTransferPath:
      "Column Axial / Lateral Force → Tie Beam → Adjacent Columns",
    constructionSteps: [
      { stepNumber: 1, title: "Reinforcement", description: "Provide minimum 2 bars top and 2 bars bottom with stirrups at 150 mm spacing." },
      { stepNumber: 2, title: "Formwork", description: "Erect side shuttering between column faces." },
      { stepNumber: 3, title: "Concreting", description: "Cast M20 concrete and compact." },
      { stepNumber: 4, title: "Curing", description: "Cure for 7 days." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Structural body" },
      { name: "Steel Bars", grade: "Fe415", role: "Axial tension / compression resistance" },
    ],
    physicsExplanations: [
      { concept: "Effective Length Reduction", explanation: "By providing lateral restraint, tie beams reduce the unsupported length of columns, lowering the slenderness ratio and increasing buckling load." },
    ],
    mathConcepts: [
      { concept: "Effective Length Factor", formula: "l_eff = k × l_unsupported", explanation: "k depends on end conditions; tie beams reduce k toward 0.5 for both-ends-fixed condition." },
    ],
    engineeringPrinciples: [
      { principle: "Minimum Size", explanation: "Tie beams are typically 230 mm × 300 mm minimum with 4 bars of 12 mm diameter and 8 mm stirrups at 150 mm c/c." },
    ],
    images: [
      { url: "/images/tie_beam.png", caption: "Tie Beam Between Columns", type: "diagram" },
    ],
    tags: ["tie beam", "lateral support", "slenderness", "column", "rcc"],
  },
];

// ── Building type seed data ────────────────────────────────────────────────────

const buildingSeeds = [
  {
    name: "Residential Building (Low-Rise RCC)",
    code: "RESIDENTIAL",
    description:
      "A low-rise residential building (G+2 to G+4) constructed with reinforced cement concrete frame structure. Common in urban and suburban housing.",
    imageUrl: "/images/residential_building.jpg",
    componentCodes: [
      "FOOTING", "COLUMN", "BEAM", "SLAB", "STAIRCASE",
      "LINTEL", "PLINTH_BEAM", "TIE_BEAM", "RETAINING_WALL",
    ],
  },
  {
    name: "High-Rise Framed Structure",
    code: "HIGH_RISE",
    description:
      "A high-rise building (G+10 and above) featuring a moment-resisting RCC frame with shear walls for lateral load resistance. Used for apartments, offices, and commercial towers.",
    imageUrl: "/images/high_rise_building.jpg",
    componentCodes: [
      "FOOTING", "COLUMN", "BEAM", "SLAB", "SHEAR_WALL",
      "STAIRCASE", "RETAINING_WALL", "PLINTH_BEAM", "TIE_BEAM",
    ],
  },
];

// ── Seeding logic ──────────────────────────────────────────────────────────────

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅  Connected to MongoDB");

    // Clear existing data
    await BuildingType.deleteMany({});
    await StructuralComponent.deleteMany({});
    console.log("🗑️   Cleared existing collections");

    // Insert components first (without buildingType links)
    const insertedComponents = await StructuralComponent.insertMany(
      componentSeeds.map(({ ...c }) => c)
    );
    console.log(`✅  Inserted ${insertedComponents.length} structural components`);

    // Build a code → _id map
    const codeToId = {};
    insertedComponents.forEach((c) => {
      codeToId[c.code] = c._id;
    });

    // Insert building types with resolved component IDs
    for (const bSeed of buildingSeeds) {
      const componentIds = bSeed.componentCodes
        .filter((code) => codeToId[code])
        .map((code) => codeToId[code]);

      const building = await BuildingType.create({
        name: bSeed.name,
        code: bSeed.code,
        description: bSeed.description,
        imageUrl: bSeed.imageUrl,
        components: componentIds,
      });

      // Back-link: update buildingTypes array in each component
      await StructuralComponent.updateMany(
        { _id: { $in: componentIds } },
        { $addToSet: { buildingTypes: building._id } }
      );

      console.log(`🏗️   Building type created: ${building.name} (${componentIds.length} components)`);
    }

    console.log("\n🎉  Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌  Seeding error:", err.message);
    process.exit(1);
  }
};

seedDatabase();
