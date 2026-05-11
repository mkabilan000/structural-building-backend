/**
 * Rich Seed Data — Beginner-Friendly Structural Element Knowledge Explorer
 * Covers: 5 Building Types × 10+ Components with full educational content
 * Run: node seed/richSeedData.js
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const BuildingType = require("../models/BuildingType");
const StructuralComponent = require("../models/StructuralComponent");

const MONGO_URI = process.env.MONGO_URI;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT SEED DATA — Rich, Beginner-Friendly Content
// ═══════════════════════════════════════════════════════════════════════════════

const componentSeeds = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. FOOTING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Footing",
    code: "FOOTING",
    emoji: "🧱",
    tagline: "The hidden hero that holds everything up",
    necessity:
      "Imagine a tall building as a person standing on soft ground. Without shoes spreading the weight, your heels would sink into the mud. A footing does exactly that — it spreads the entire weight of the building over a large area of soil so the soil doesn't fail. Without footings, columns would punch straight into the ground and the building would collapse.",
    beginnerSummary:
      "A footing is the lowest part of any building, buried underground. It's the base on which the whole structure stands. Think of it as the 'feet' of the building — just like our feet distribute our body weight so we don't sink, footings distribute the building's weight to the ground safely.",
    designConcept:
      "Footings are designed based on two things: (1) How heavy is the building above? (2) How strong is the soil below? Engineers calculate the Safe Bearing Capacity (SBC) of the soil — this tells us the maximum pressure the soil can handle without squishing. The footing area is then made large enough so the load per unit area stays within this limit. The formula is simply: Area = Total Load ÷ Safe Bearing Capacity of Soil. The footing also needs to be thick enough and reinforced with steel so it doesn't bend or crack under the upward soil pressure.",
    loadTransferPath:
      "Roof loads → Slabs → Beams → Columns → Footing → Soil",
    funFact:
      "The footing of the Burj Khalifa (world's tallest building) extends 50 metres deep into the ground — that's deeper than a 15-storey building is tall!",
    realWorldAnalogy:
      "Think of snowshoes. A person wearing snowshoes doesn't sink into snow because the shoe spreads weight over a large area. A footing works exactly the same way — it spreads the building's weight over a large soil area.",
    constructionSteps: [
      {
        stepNumber: 1,
        title: "Soil Investigation",
        description:
          "Before anything is built, engineers test the soil by digging bore holes and collecting samples. Lab tests determine the Safe Bearing Capacity (SBC). This tells us how large and deep the footing needs to be. Skipping this step is like building a house without checking if the ground is solid — extremely dangerous.",
        tip: "A soil test report (called a 'Geotechnical Report') is mandatory for every building project.",
      },
      {
        stepNumber: 2,
        title: "Excavation (Digging)",
        description:
          "Workers or machines dig a pit at the exact location of each column. The depth is as specified in the structural drawing — usually 1.5 m to 3 m below ground level for residential buildings. The bottom of the pit must be level and undisturbed (no loose soil).",
        tip: "The pit width is made slightly larger than the footing to allow workers to move around and fix formwork.",
      },
      {
        stepNumber: 3,
        title: "PCC (Plain Cement Concrete) Bed",
        description:
          "A 75 mm to 100 mm thick layer of lean concrete (mix ratio 1:4:8 — cement:sand:aggregate) is poured at the bottom of the pit. This creates a clean, flat, hard surface to work on. It also prevents moisture from the soil from damaging the main footing steel and concrete.",
        tip: "PCC is also called 'blinding concrete' or 'levelling course'. It has no steel bars — it just provides a working platform.",
      },
      {
        stepNumber: 4,
        title: "Setting Out and Marking",
        description:
          "Once the PCC is set (after 24 hours), surveyors use theodolites or total stations to mark the exact centre of the column on the PCC. The footing boundary is then drawn with chalk lines. Getting this right is critical — a mistake here means the column won't be in the right position.",
        tip: "The centre of the footing must align perfectly with the centre of the column above.",
      },
      {
        stepNumber: 5,
        title: "Reinforcement (Steel Bar) Placement",
        description:
          "Steel bars are laid out in a grid pattern (called a mesh) on top of small plastic or concrete 'cover blocks'. These cover blocks are 50 mm thick and ensure there is always 50 mm of concrete below the steel — this is called 'clear cover'. Without cover, the steel would rust. The bars run in both X and Y directions to resist bending in all directions.",
        tip: "Cover blocks are tiny but extremely important! They protect the steel from moisture that causes rust (called 'corrosion').",
      },
      {
        stepNumber: 6,
        title: "Column Starter Bars",
        description:
          "The vertical steel bars that will form the column are placed in the centre of the footing before concreting. They extend upward 50–60 times their diameter above the footing top — this is called the 'development length' or 'lap length'. The column's steel bars will be tied to these starter bars later.",
        tip: "These are also called 'column dowels' or 'anchor bolts'. They create the critical connection between footing and column.",
      },
      {
        stepNumber: 7,
        title: "Formwork (Shuttering) Erection",
        description:
          "Wooden or steel panels are fixed around the sides of the footing to create a mould. Concrete is a liquid when freshly mixed — the formwork holds it in shape until it hardens. The formwork must be strong, leak-proof, and properly aligned. The inside surfaces are oiled so the concrete doesn't stick.",
        tip: "Poor formwork causes concrete to leak, creating weak honeycombed areas in the footing. Always check for gaps before pouring.",
      },
      {
        stepNumber: 8,
        title: "Concreting (Pouring Concrete)",
        description:
          "M25 grade concrete (1 part cement : 1 part sand : 2 parts aggregate + water) is poured into the formwork. A needle vibrator — a long, pen-shaped vibrating tool — is inserted every 300–500 mm to remove air bubbles. Air bubbles create weak spots. Concrete is poured in layers of no more than 300 mm at a time.",
        tip: "Never add extra water to make concrete 'flow easier'. Extra water weakens concrete significantly — it reduces strength by up to 25%!",
      },
      {
        stepNumber: 9,
        title: "Curing",
        description:
          "After 24 hours, the top surface of the footing is kept continuously wet for at least 7 days (ideally 14 days for M25 and above). This is called 'curing'. Concrete gains strength as cement reacts with water (hydration). If it dries too fast, it cracks and loses strength. Wet gunny bags, sand+water, or curing compounds are used.",
        tip: "Concrete reaches about 70% of its design strength in 7 days and 99% in 28 days. The '28-day strength' is the standard benchmark.",
      },
      {
        stepNumber: 10,
        title: "Backfilling",
        description:
          "Once the footing has cured and the column construction begins, the excavated soil is filled back around the footing and compacted in layers. This is called 'backfilling'. Proper compaction prevents the surrounding soil from settling unevenly later.",
        tip: "Backfill in layers of 150–200 mm and compact each layer. Loose uncompacted backfill causes ground to sink after years.",
      },
    ],
    materials: [
      {
        name: "Cement (OPC 53 Grade)",
        grade: "OPC 53",
        role: "Binding agent — reacts with water to form the hard concrete matrix",
        whyThisGrade:
          "53 Grade cement achieves higher early strength, which is important for footings that need to be loaded quickly during construction.",
        isCodeReference: "IS 12269",
      },
      {
        name: "Sand (Fine Aggregate)",
        grade: "Zone II or Zone III",
        role: "Fills gaps between cement and coarse aggregate particles",
        whyThisGrade:
          "Zone II sand has the ideal particle size distribution for maximum density and workability.",
        isCodeReference: "IS 383",
      },
      {
        name: "Coarse Aggregate (Crushed Stone)",
        grade: "20 mm and 10 mm",
        role: "Provides bulk, strength, and resistance to compression",
        whyThisGrade:
          "20 mm aggregate is the standard for footings; smaller 10 mm is mixed in to fill gaps and improve density.",
        isCodeReference: "IS 383",
      },
      {
        name: "Steel Reinforcement Bars (TMT Bars)",
        grade: "Fe500D",
        role: "Resists the tensile and bending forces that concrete alone cannot handle",
        whyThisGrade:
          "Fe500D has higher ductility (ability to bend without breaking) — essential in earthquake-prone regions. 'D' stands for Ductile.",
        isCodeReference: "IS 1786",
      },
      {
        name: "Concrete Mix",
        grade: "M25",
        role: "Structural element that takes compression from soil pressure",
        whyThisGrade:
          "M25 means minimum compressive strength of 25 N/mm² at 28 days. Below M20 is not permitted for footings as per IS 456.",
        isCodeReference: "IS 456:2000",
      },
      {
        name: "Cover Blocks (PVC or Concrete)",
        grade: "50 mm clear cover",
        role: "Maintain the required clear cover between steel and bottom/sides of footing",
        whyThisGrade:
          "50 mm cover for footings (in contact with soil) per IS 456 Table 16 — protects steel from soil moisture and prevents corrosion.",
        isCodeReference: "IS 456:2000, Cl. 26.4",
      },
    ],
    physicsExplanations: [
      {
        concept: "Pressure Distribution",
        explanation:
          "Pressure = Force ÷ Area. A column carrying 1000 kN on a 0.3×0.3 m area creates pressure of 1000÷0.09 = 11,111 kN/m². That's way beyond what any soil can handle! A 2×2 m footing reduces this to 1000÷4 = 250 kN/m² — within safe limits for most soils. This is exactly why footings exist.",
        difficulty: "beginner",
      },
      {
        concept: "Upward Soil Pressure (Bearing Pressure)",
        explanation:
          "The soil pushes back up on the footing (reaction = action). This upward pressure causes the footing edges to try to bend upward like a dish. The steel reinforcement mesh at the bottom of the footing resists this bending — without it, the footing would crack and split.",
        difficulty: "beginner",
      },
      {
        concept: "Punching Shear",
        explanation:
          "Imagine pressing your thumb into soft clay — it 'punches' through. A column does the same thing to a footing if the footing isn't thick enough. The column tries to punch through the footing on a diagonal cone shape. Engineers check this 'punching shear' and make the footing thick enough to resist it.",
        difficulty: "intermediate",
      },
    ],
    mathConcepts: [
      {
        concept: "Footing Area Calculation",
        formula: "A = P / q_safe",
        explanation:
          "A = Area of footing (m²), P = Total column load including self-weight (kN), q_safe = Safe Bearing Capacity of soil (kN/m²). Example: If column load = 800 kN and SBC = 200 kN/m², then A = 800÷200 = 4 m². So a 2m × 2m footing is needed.",
        difficulty: "beginner",
      },
      {
        concept: "Bending Moment at Column Face",
        formula: "M = (q_u × l²) / 2  per unit width",
        explanation:
          "q_u = factored upward soil pressure (kN/m²), l = projection of footing beyond column face (m). This moment tells us how much steel to provide at the bottom of the footing.",
        difficulty: "intermediate",
      },
      {
        concept: "Development Length",
        formula: "L_d = (ϕ × σ_s) / (4 × τ_bd)",
        explanation:
          "L_d = development length (mm), ϕ = bar diameter (mm), σ_s = stress in bar (N/mm²), τ_bd = design bond stress (N/mm²). This tells us how far a bar must extend into concrete before it can be fully 'grabbed' — like the grip length of a screw.",
        difficulty: "advanced",
      },
    ],
    engineeringPrinciples: [
      {
        principle: "Two-Way vs One-Way Action",
        explanation:
          "Square footings bend in both X and Y directions (two-way action). Rectangular footings with one side much longer than the other may act mainly in the shorter direction (one-way). Steel must be provided in both directions for a square footing.",
        diagramUrl: "/images/footing_action_types.png",
      },
      {
        principle: "IS Code Reference",
        explanation:
          "All footing design in India follows IS 456:2000 (Plain and Reinforced Concrete Code of Practice) and IS 1904 (Code of Practice for Design and Construction of Foundations). SBC values are given in IS 1888.",
        diagramUrl: "",
      },
    ],
    images: [
      { url: "/images/footing_3d.png", caption: "3D view of an isolated column footing showing mesh reinforcement", type: "diagram" },
      { url: "/images/footing_section.png", caption: "Cross-section showing column, footing, PCC bed, and soil layers", type: "diagram" },
      { url: "/images/footing_reinforcement.png", caption: "Reinforcement cage of footing with starter column bars", type: "reinforcement" },
      { url: "/images/footing_construction.jpg", caption: "Footing reinforcement at construction site", type: "construction" },
      { url: "/images/footing_types.png", caption: "Types of footings: Isolated, Combined, Strip, Raft", type: "diagram" },
    ],
    tags: ["footing", "foundation", "substructure", "soil", "rcc", "isolated footing", "raft"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. COLUMN
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Column",
    code: "COLUMN",
    emoji: "🏛️",
    tagline: "The vertical spine of your building",
    necessity:
      "Every building needs a skeleton — and columns are that skeleton. They carry the entire weight of every floor, every wall, every person, and every piece of furniture — all the way down to the foundation. Without columns, beams and slabs would have nothing to lean on and would collapse. Columns are the most critical structural members in any building.",
    beginnerSummary:
      "A column is a vertical member (standing upright) that carries loads from the beam and slab above and transfers them down to the footing. Think of columns as the legs of a table — remove a leg and the table falls. Remove a column and the entire section of the building above it collapses.",
    designConcept:
      "Columns primarily resist compressive (squeezing) forces. But in real buildings, they also experience bending because loads are never perfectly centered. Engineers design columns using the 'interaction diagram' method — checking that the combination of axial load and bending moment is within safe limits. The amount of steel (1–4% of the column's cross-sectional area) and the concrete grade together determine the column's capacity. Lateral ties (horizontal hoops of steel) prevent the vertical bars from buckling outward — just like how you'd use zip-ties to hold a bundle of rods together.",
    loadTransferPath:
      "Roof Slab → Roof Beams → Floor Slab → Floor Beams → Column → Footing → Soil",
    funFact:
      "A single column in a 20-storey building can carry the weight of over 500 cars stacked on top of each other!",
    realWorldAnalogy:
      "Think of a column like a tin can. A tin can is very strong when you press down on it (compression). But if you press sideways or squeeze it at an angle, it buckles and crumples. Concrete columns work the same way — they're great at vertical loads but need steel ties to prevent lateral buckling.",
    constructionSteps: [
      {
        stepNumber: 1,
        title: "Reinforcement Cage Fabrication",
        description:
          "Steel workers (called 'bar benders') cut and bend the main vertical bars (called longitudinal bars) to the required length. Lateral ties (small rings of steel) are made and threaded onto the vertical bars at the specified spacing (usually 150–200 mm apart). Everything is tied together with binding wire to form a rigid 'cage' that can be lifted and placed.",
        tip: "The minimum number of longitudinal bars is 4 for a rectangular column and 6 for a circular column per IS 456.",
      },
      {
        stepNumber: 2,
        title: "Column Position Marking",
        description:
          "On the already-cast slab or footing below, the centre of the column is marked. A plumb bob or laser level is used to ensure the column will be perfectly vertical. Any error here gets multiplied over all the floors above.",
        tip: "Even a 5 mm error per floor becomes 50 mm error over 10 floors — that's a serious structural issue. Accuracy is everything.",
      },
      {
        stepNumber: 3,
        title: "Cage Placement and Alignment",
        description:
          "The fabricated steel cage is lifted (by crane or manually for small columns) and placed over the starter bars protruding from the footing or lower column. The cage is tied to the starter bars with lap splices (overlapping length). Cover blocks are fixed on all four sides to maintain 40 mm clear cover.",
        tip: "Lap splice length = 50 × diameter of bar for Fe500 grade. A 16mm dia bar needs 800 mm lap overlap.",
      },
      {
        stepNumber: 4,
        title: "Shuttering (Formwork) Erection",
        description:
          "Steel or plywood panels are erected around the column on all four sides, clamped tightly with bolts. The formwork must be exactly the right size (e.g., 300mm × 300mm or 230mm × 450mm), perfectly vertical (checked with spirit level), and tight at the bottom to prevent concrete leakage. Inside surfaces are coated with shuttering oil.",
        tip: "Column formwork is the most critical — even small gaps cause 'grout leakage' and honeycombing, which significantly weakens the column.",
      },
      {
        stepNumber: 5,
        title: "Concrete Pouring",
        description:
          "Concrete (M25 to M40 grade) is poured into the column formwork from the top. Because columns are tall and narrow, concrete must be poured in small layers (300mm max) and each layer vibrated thoroughly. A long needle vibrator is inserted every 300–500 mm to remove trapped air bubbles. Concrete is never dropped from heights greater than 1.5 m to prevent segregation (separation of materials).",
        tip: "Never start and stop concreting halfway up a column — this creates a 'cold joint' which is a serious weakness.",
      },
      {
        stepNumber: 6,
        title: "De-shuttering",
        description:
          "After 24–48 hours (concrete reaches sufficient early strength), the formwork panels are carefully removed. The column surface is inspected for defects — honeycombing (voids), cracks, or misalignment. Minor surface defects are repaired with cement mortar. Serious defects may require the column to be demolished and recast.",
        tip: "Never de-shutter a column that will carry immediate construction load in less than 24 hours — it hasn't gained enough strength yet.",
      },
      {
        stepNumber: 7,
        title: "Curing",
        description:
          "The exposed column surfaces are wrapped in wet gunny bags or hessian cloth, which are kept moist for 7–14 days. Alternatively, a curing compound (liquid membrane) is sprayed on. This ensures the concrete gains its full design strength.",
        tip: "Columns are often forgotten during curing because attention shifts to the next floor. Set reminders — curing is not optional!",
      },
    ],
    materials: [
      {
        name: "Longitudinal Steel Bars (Main Bars)",
        grade: "Fe500D",
        role: "Carry axial load and resist bending moments",
        whyThisGrade:
          "Fe500D provides high strength (500 N/mm² yield stress) plus high ductility — critical for column survival during earthquakes.",
        isCodeReference: "IS 1786",
      },
      {
        name: "Lateral Ties / Stirrups",
        grade: "Fe415",
        role: "Prevent main bars from buckling outward; provide confinement to concrete core; resist shear",
        whyThisGrade:
          "Slightly lower strength steel is acceptable for ties because their function is confinement (squeezing the core), not carrying axial load.",
        isCodeReference: "IS 456:2000 Cl. 26.5.3",
      },
      {
        name: "Concrete",
        grade: "M25 to M40",
        role: "Resists the compressive forces in the column",
        whyThisGrade:
          "Higher floors get M25; lower floors and basement columns may use M35 or M40 because they carry more load. Higher grade = smaller column size.",
        isCodeReference: "IS 456:2000",
      },
    ],
    physicsExplanations: [
      {
        concept: "Axial Compression",
        explanation:
          "When you push down on a column, all the material inside gets 'squished' — this is compression. Concrete is excellent at resisting compression (it can take 25–40 N/mm²). Steel is even better. Together, they form an incredibly strong compression member.",
        difficulty: "beginner",
      },
      {
        concept: "Buckling",
        explanation:
          "Ever seen a thin ruler buckle sideways when you press both ends? Tall, thin columns do the same under extreme compression — they suddenly bend sideways instead of crushing. This is called 'buckling'. Lateral ties prevent main bars from buckling individually, and the structural design ensures the column as a whole doesn't buckle.",
        difficulty: "beginner",
      },
      {
        concept: "Bi-axial Bending",
        explanation:
          "In a real building, columns are never loaded perfectly on their centre. Loads come from beams on two different sides. This means the column bends in both the X and Y directions simultaneously — called bi-axial bending. The design interaction diagram accounts for this combined effect.",
        difficulty: "intermediate",
      },
    ],
    mathConcepts: [
      {
        concept: "Column Load Capacity (Short Column)",
        formula: "Pu = 0.4 × fck × Ac + 0.67 × fy × Asc",
        explanation:
          "Pu = ultimate axial load the column can carry (kN), fck = characteristic strength of concrete (N/mm²), Ac = area of concrete (mm²), fy = yield strength of steel (N/mm²), Asc = area of steel bars (mm²). Example: 300×300 column with M25 concrete and 4 bars of 16mm dia Fe500: Pu = 0.4×25×(90000-804) + 0.67×500×804 = 885,804 + 269,340 ≈ 1155 kN",
        difficulty: "intermediate",
      },
      {
        concept: "Minimum Eccentricity",
        formula: "e_min = l/500 + D/30 ≥ 20 mm",
        explanation:
          "Even if a column looks perfectly central, IS 456 forces you to design for a minimum eccentricity (off-centre loading). l = unsupported length, D = lateral dimension. This accounts for real-world imperfections — nothing is ever perfectly centred.",
        difficulty: "intermediate",
      },
      {
        concept: "Steel Percentage",
        formula: "Asc = p% × Ag  where  0.8% ≤ p ≤ 6%",
        explanation:
          "Asc = area of steel required, Ag = gross cross-section area of column. Minimum 0.8% steel prevents brittle failure; maximum 6% prevents congestion that makes concreting difficult. Practically, 1–3% is the most common range.",
        difficulty: "beginner",
      },
    ],
    engineeringPrinciples: [
      {
        principle: "Short vs Slender Column",
        explanation:
          "If effective length/least lateral dimension ≤ 12, it's a SHORT column (squashes under load). If > 12, it's a SLENDER column (may buckle sideways). Slender columns need extra design checks. Adding tie beams at intermediate heights converts slender columns to short ones — a common design solution.",
        diagramUrl: "/images/column_slenderness.png",
      },
      {
        principle: "Confinement Effect",
        explanation:
          "Closely spaced ties 'confine' (squeeze) the concrete core, dramatically increasing both its strength and ductility. This is why earthquake-resistant columns have very closely spaced ties (≤ 100 mm) near the top and bottom — the zones where maximum bending occurs during ground shaking.",
        diagramUrl: "/images/column_confinement.png",
      },
    ],
    images: [
      { url: "/images/column_3d.png", caption: "3D column with main bars and lateral ties", type: "diagram" },
      { url: "/images/column_cage.jpg", caption: "Steel cage of a column before concreting", type: "construction" },
      { url: "/images/column_section.png", caption: "Column cross-section showing bar arrangement", type: "diagram" },
      { url: "/images/column_types.png", caption: "Types of columns: Square, Rectangular, Circular, L-shaped", type: "diagram" },
    ],
    tags: ["column", "vertical member", "compression", "rcc", "stirrups", "buckling"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. BEAM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Beam",
    code: "BEAM",
    emoji: "📐",
    tagline: "The horizontal bridge between columns",
    necessity:
      "Slabs (floors) cannot span large distances on their own without becoming impossibly thick and heavy. Beams act as intermediate supports — they collect the load from the slab above and transfer it to the columns at their ends. Beams make it possible to have large open rooms without columns every 1–2 metres.",
    beginnerSummary:
      "A beam is a horizontal member that spans between two supports (usually columns or walls). It collects floor loads from the slab above and sends them to the columns. Imagine a bridge — the long horizontal structure between two pillars is essentially a beam.",
    designConcept:
      "Beams bend under load — the bottom fibres stretch (tension) and the top fibres squeeze (compression). Concrete is very good at compression but terrible at tension (it cracks easily under tension). So steel bars are placed at the bottom of the beam to handle the tension. This is the fundamental principle of reinforced concrete beams. Vertical stirrups (U-shaped steel bars) are also provided to resist diagonal cracking caused by shear forces near the supports.",
    loadTransferPath:
      "Slab Load → Beam → Column → Footing → Soil",
    funFact:
      "The main beam of the Eiffel Tower spans 5.5 metres between supports with no intermediate columns — entirely thanks to its carefully designed cross-section and material.",
    realWorldAnalogy:
      "Hold a ruler horizontally and press down on the middle. The ruler bends — the top surface gets compressed (shorter) and the bottom surface gets stretched (longer). This is exactly what happens to a beam. The steel bars at the bottom of an RCC beam resist that stretching (tension).",
    constructionSteps: [
      {
        stepNumber: 1,
        title: "Centering (Propping) and Bottom Shuttering",
        description:
          "Vertical props (steel or wooden) are erected below the beam position. Horizontal planks or steel plates are placed on top of the props to form the bottom (soffit) of the beam mould. The height of props is adjusted so the beam bottom is exactly at the correct level as per drawing.",
        tip: "Props must be on firm ground — place base plates below them to prevent sinking, especially on soft soil.",
      },
      {
        stepNumber: 2,
        title: "Side Shuttering",
        description:
          "Plywood or steel plates are fixed on both sides of the beam to complete the mould (like a rectangular channel). The inside dimensions match the beam cross-section (e.g., 230 mm wide × 400 mm deep). All joints must be sealed to prevent grout leakage.",
        tip: "Beam depth in drawings is 'overall depth'. Effective depth = Overall depth minus cover (typically 40 mm) minus half bar diameter.",
      },
      {
        stepNumber: 3,
        title: "Bottom Main Reinforcement Placement",
        description:
          "Main tension bars (larger diameter — 16mm, 20mm, or 25mm) are placed at the bottom of the beam with cover blocks (25–40 mm clear cover). These are the most important bars — they resist the maximum tensile force at mid-span where bending is greatest.",
        tip: "The number and diameter of bottom bars are decided by the structural engineer and shown in the reinforcement drawing (called 'bar bending schedule').",
      },
      {
        stepNumber: 4,
        title: "Stirrup Binding",
        description:
          "U-shaped stirrups (usually 8mm or 10mm diameter) are placed over the bottom bars at regular intervals. The spacing is closer near the supports (100–125 mm) where shear force is high, and wider at mid-span (150–200 mm) where shear is lower. Stirrups are tied to the main bars with binding wire.",
        tip: "More stirrups = more shear resistance. If cracks appear diagonally (at 45°) in a real beam, it's a sign of insufficient stirrups.",
      },
      {
        stepNumber: 5,
        title: "Top Bars and Hanger Bars",
        description:
          "Hanger bars (2 bars of smaller diameter, e.g., 12mm) are placed at the top corners — they hold the stirrups in position from the top. At supports (where the beam connects to the column), negative bending moment occurs, and extra top bars are provided to resist it. At mid-span, the top can have minimal steel.",
        tip: "Hanger bars don't contribute much to structural strength — their job is to hold the stirrup cage in shape during concreting.",
      },
      {
        stepNumber: 6,
        title: "Slab Reinforcement Integration",
        description:
          "Beams and slabs are usually cast monolithically (together in one pour). The slab reinforcement is placed over the beam cage, ensuring proper connection. In T-beams, the slab acts as the compression flange — so the slab and beam work together, making the combined section much stronger.",
        tip: "A monolithically cast T-beam is typically 40–50% more efficient than a rectangular beam of the same weight.",
      },
      {
        stepNumber: 7,
        title: "Concreting and Compaction",
        description:
          "M20 or M25 concrete is poured into the beam mould and thoroughly compacted with a needle vibrator. Since beam widths are narrow (230–300 mm), care is taken to vibrate all corners and around all reinforcement bars. Concrete is poured simultaneously with the slab above in most buildings.",
        tip: "Use a slump cone test to verify concrete workability before pouring. For beams, slump should be 75–100 mm.",
      },
      {
        stepNumber: 8,
        title: "Curing and De-propping",
        description:
          "After 24 hours, the sides (not the bottom) of the shuttering can be removed. The bottom shuttering (and props) should remain for 14 days for beams spanning up to 4.5 m, and 21 days for longer spans. Premature removal leads to excessive deflection and permanent sagging.",
        tip: "The biggest construction mistake on building sites: removing beam props too early to reuse them. Always wait the full curing period.",
      },
    ],
    materials: [
      {
        name: "Main Tension Steel Bars",
        grade: "Fe500D",
        role: "Resist tensile forces at the bottom of the beam (sagging moment)",
        whyThisGrade: "Higher yield strength means fewer bars needed, saving cost while maintaining safety.",
        isCodeReference: "IS 1786",
      },
      {
        name: "Stirrups (Shear Reinforcement)",
        grade: "Fe415",
        role: "Resist diagonal tension (shear force) and hold main bars in position",
        whyThisGrade: "Slightly lower grade is standard for stirrups — they see lower stress levels than main bars.",
        isCodeReference: "IS 456:2000",
      },
      {
        name: "Concrete",
        grade: "M20–M25",
        role: "Resist compressive forces in the top zone of the beam",
        whyThisGrade: "M20 minimum for beams as per IS 456 in moderate exposure conditions.",
        isCodeReference: "IS 456:2000",
      },
      {
        name: "Formwork (Plywood / Steel Plates)",
        grade: "12 mm BWR plywood or steel shuttering",
        role: "Mould the beam to its exact shape until concrete hardens",
        whyThisGrade: "Boiling Water Resistant (BWR) plywood resists moisture and can be reused 8–12 times.",
        isCodeReference: "IS 4990",
      },
    ],
    physicsExplanations: [
      {
        concept: "Bending and Neutral Axis",
        explanation:
          "When a beam bends under load, there's an imaginary line called the 'neutral axis' running along the beam's length where there is zero stress — neither compression nor tension. Above the neutral axis: compression (concrete handles this). Below: tension (steel handles this). The further the steel is from the neutral axis (i.e., deeper the beam), the more efficiently it resists bending.",
        difficulty: "beginner",
      },
      {
        concept: "Shear Force",
        explanation:
          "Shear is the tendency of two adjacent sections to slide past each other vertically. Near the supports, the beam tries to 'shear off' — like scissors cutting through paper. This creates diagonal cracks at 45°. Stirrups act like stitches, crossing these diagonal cracks and preventing them from opening.",
        difficulty: "beginner",
      },
      {
        concept: "T-Beam Action",
        explanation:
          "When a beam is cast with a slab on top, the slab contributes to the compression zone, making an upside-down 'T' shape. The wide top flange (slab) can carry much more compression force, allowing the beam to resist much larger bending moments with the same amount of steel.",
        difficulty: "intermediate",
      },
    ],
    mathConcepts: [
      {
        concept: "Maximum Bending Moment (UDL, simply supported)",
        formula: "M_max = w × L² / 8",
        explanation:
          "w = load per unit length (kN/m), L = span of beam (m). Example: A 5m beam with 20 kN/m load: M = 20×25÷8 = 62.5 kN·m. This is the moment the beam must be designed to resist at mid-span.",
        difficulty: "beginner",
      },
      {
        concept: "Maximum Shear Force (UDL, simply supported)",
        formula: "V_max = w × L / 2",
        explanation:
          "Maximum shear occurs at the supports (ends) of the beam. Using same example: V = 20×5÷2 = 50 kN. Stirrup design is based on this value.",
        difficulty: "beginner",
      },
      {
        concept: "Lever Arm (Moment Arm)",
        formula: "z = 0.87 × d  (approximately, for under-reinforced sections)",
        explanation:
          "d = effective depth of beam. The tensile force in steel × lever arm = Bending Moment. The deeper the beam, the larger the lever arm, the smaller the required tensile force, and therefore less steel is needed.",
        difficulty: "intermediate",
      },
    ],
    engineeringPrinciples: [
      {
        principle: "Under-reinforced vs Over-reinforced Beams",
        explanation:
          "An under-reinforced beam has less steel than the 'balanced' amount. When overloaded, the steel yields first — the beam shows large visible cracks and deflects before collapsing. This gives warning to occupants. An over-reinforced beam has too much steel — the concrete crushes suddenly with no warning. IS 456 mandates under-reinforced design for safety.",
        diagramUrl: "/images/beam_reinforcement_types.png",
      },
      {
        principle: "Moment Redistribution",
        explanation:
          "In continuous beams (spanning multiple bays), large moments occur at supports. Design codes allow engineers to 'redistribute' up to 30% of these support moments to mid-span — effectively designing a more efficient beam that uses less total steel.",
        diagramUrl: "",
      },
    ],
    images: [
      { url: "/images/beam_bending.png", caption: "Beam bending diagram showing compression and tension zones", type: "diagram" },
      { url: "/images/beam_reinforcement.png", caption: "Beam reinforcement: main bars, stirrups, hanger bars", type: "reinforcement" },
      { url: "/images/tbeam_section.png", caption: "T-beam section showing slab as compression flange", type: "diagram" },
      { url: "/images/beam_shear_diagram.png", caption: "Shear force and bending moment diagram for a simply supported beam", type: "diagram" },
    ],
    tags: ["beam", "bending", "shear", "stirrups", "flexure", "t-beam", "horizontal member"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. SLAB
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Slab",
    code: "SLAB",
    emoji: "🪨",
    tagline: "The floor you walk on — an engineering marvel",
    necessity:
      "Slabs create the floors and roofs of buildings. They directly support all the live loads — people, furniture, equipment — and distribute these loads to the beams below. They also act as 'diaphragms' — rigid horizontal plates that hold the building together laterally and transfer wind/earthquake forces to the shear walls and columns.",
    beginnerSummary:
      "A slab is the large, flat horizontal structural element that forms floors and roofs. The slab you walk on every day in your house or college is an RCC slab — a thin plate of concrete reinforced with steel bars in both directions.",
    designConcept:
      "The key design decision for a slab is: does it span in ONE direction or TWO directions? If the longer side is more than twice the shorter side (ly/lx > 2), the slab mainly spans in the shorter direction — one-way slab. If ly/lx ≤ 2, it spans in both directions — two-way slab (more efficient, uses less concrete). Effective depth is chosen to control deflection — a slab that deflects too much looks unsightly and can cause partition wall cracking.",
    loadTransferPath:
      "People/Furniture (Live Load) + Own Weight → Slab → Beams → Columns → Footings → Soil",
    funFact:
      "A typical 125 mm thick RCC slab weighs about 300 kg per square metre — yet it can safely carry an additional 200–400 kg per square metre of live load!",
    realWorldAnalogy:
      "A slab is like a piece of cardboard spanning across a gap. If you put a weight in the middle, it bends. Now if you put wooden sticks (steel bars) inside the cardboard in both directions, it becomes much stronger and barely bends. That's exactly what steel reinforcement does for a concrete slab.",
    constructionSteps: [
      { stepNumber: 1, title: "Centering (Propping)", description: "Vertical props and horizontal runners are set up below the slab level. The top of the formwork must be exactly at the underside (soffit) level of the slab as per drawing. Any unevenness creates visible ceiling imperfections.", tip: "Use adjustable steel props (Acro-props) for accuracy — they can be fine-tuned to exact height." },
      { stepNumber: 2, title: "Bottom Shuttering (Decking)", description: "Plywood sheets (12 mm thick) are laid flat on the horizontal runners to form the bottom mould of the slab. All joints between plywood sheets are taped to prevent cement slurry leakage.", tip: "If plywood joints leak, you'll see dark streaks (called 'fins') on the slab soffit after de-shuttering." },
      { stepNumber: 3, title: "Main Reinforcement Placement", description: "Steel bars (main bars) are placed along the shorter span direction (lx) at the bottom of the slab. The spacing is typically 100–150 mm centre to centre. Cover blocks (15–20 mm) are placed at regular intervals to maintain clear cover.", tip: "Slab has the smallest cover of all members — just 15–20 mm — because it's not in contact with soil or weather (for interior slabs)." },
      { stepNumber: 4, title: "Distribution Steel Placement", description: "Steel bars (distribution bars) are placed perpendicular to the main bars, on top of the main bars. They distribute loads in the perpendicular direction and control cracking due to temperature and shrinkage. For one-way slabs, distribution steel = 0.12% of cross-section area.", tip: "Distribution steel is also called 'secondary reinforcement' or 'temperature and shrinkage steel'." },
      { stepNumber: 5, title: "Edge and Opening Reinforcement", description: "Extra bars are placed diagonally at the corners of slab panels and around any openings (for ducts, pipes, toilets). Openings create stress concentrations, and extra steel prevents cracks from propagating from these corners.", tip: "Always check the drawing for special reinforcement around slab openings — these are often missed on site and cause cracking later." },
      { stepNumber: 6, title: "Conduit and Pipe Embedding", description: "Electrical conduits, data cables, and plumbing pipes that need to be concealed in the slab are tied to the reinforcement at this stage. They must not be bundled together or block concrete flow.", tip: "Conduits should not exceed 1/3 of slab thickness in diameter. Anything larger compromises structural integrity." },
      { stepNumber: 7, title: "Concreting", description: "M20 or M25 concrete is poured across the entire slab area and levelled with a screed board (a long straight edge). A needle vibrator is used systematically to compact all areas. The top surface is finished smooth with a wooden float, then a steel trowel for a finer finish.", tip: "Pour the slab in one continuous operation — do not stop and restart. Stopping creates cold joints which are weak planes." },
      { stepNumber: 8, title: "Curing", description: "The slab surface is kept wet continuously for 14 days. Bunding (small ridges of mortar or mud around the slab edges) creates a shallow pond — this 'pond curing' is the most effective method. Alternatively, wet burlap or curing membranes are used.", tip: "The top surface area of slabs is huge — ensure all areas are wet, especially edges and corners which dry out fastest." },
    ],
    materials: [
      { name: "Main Reinforcement (Bars)", grade: "Fe500", role: "Resist bending tension along the shorter span", whyThisGrade: "High strength allows thinner slabs, reducing dead load.", isCodeReference: "IS 1786" },
      { name: "Distribution Reinforcement", grade: "Fe415", role: "Distribute loads perpendicular to main span; control cracking", whyThisGrade: "Lower strength acceptable since distribution steel is minimal — just 0.12% of cross-section.", isCodeReference: "IS 456:2000" },
      { name: "Concrete", grade: "M20–M25", role: "Provide the structural depth and resist compression", whyThisGrade: "M20 minimum for slabs; M25 for roof slabs to improve waterproofing quality.", isCodeReference: "IS 456:2000" },
    ],
    physicsExplanations: [
      { concept: "One-way vs Two-way Load Transfer", explanation: "In a one-way slab (ly/lx > 2), loads travel like planks on a bridge — all in one direction to the parallel beams. In a two-way slab (ly/lx ≤ 2), loads travel in both directions simultaneously — like a drumhead distributing the force from a drum stick in all directions. Two-way slabs are more efficient.", difficulty: "beginner" },
      { concept: "Diaphragm Action", explanation: "When earthquake or wind forces hit a building sideways, the rigid slab collects these lateral forces from all columns at that level and channels them to the stiffer shear walls. The slab acts like a horizontal beam — this is called 'diaphragm action'. Without this, each column would have to resist lateral forces independently, which is much less efficient.", difficulty: "intermediate" },
    ],
    mathConcepts: [
      { concept: "Span-to-Depth Ratio (Deflection Control)", formula: "l/d ≤ 26 (simply supported) or 32 (continuous)", explanation: "A quick check before detailed design: divide the slab span by 26 (or 32 for continuous spans) to get the minimum effective depth needed. Example: 4 m simply supported slab → d ≥ 4000/26 = 154 mm → use 175 mm overall depth.", difficulty: "beginner" },
      { concept: "Minimum Distribution Steel", formula: "Ast_min = 0.12% × b × D  (for HYSD bars)", explanation: "b = 1000 mm (we design per 1 metre strip), D = overall depth. Example: 150 mm slab → Ast_min = 0.0012 × 1000 × 150 = 180 mm² per metre. Use 8mm bars @ 270 mm c/c.", difficulty: "beginner" },
    ],
    engineeringPrinciples: [
      { principle: "Effective Span", explanation: "The effective span used in calculations is the smaller of: (a) centre-to-centre distance between supports, or (b) clear span + effective depth. This accounts for the fact that loads near supports are partly carried by the support itself.", diagramUrl: "" },
    ],
    images: [
      { url: "/images/slab_one_way.png", caption: "One-way slab: main bars in short direction", type: "diagram" },
      { url: "/images/slab_two_way.png", caption: "Two-way slab: bars in both directions", type: "diagram" },
      { url: "/images/slab_reinforcement.jpg", caption: "Slab reinforcement on site showing two layers of bars", type: "construction" },
      { url: "/images/slab_construction.jpg", caption: "Slab concreting in progress", type: "construction" },
    ],
    tags: ["slab", "floor", "roof", "one-way", "two-way", "diaphragm", "rcc"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. SHEAR WALL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Shear Wall",
    code: "SHEAR_WALL",
    emoji: "🛡️",
    tagline: "Your building's earthquake shield",
    necessity:
      "When an earthquake strikes, the ground shakes sideways. This creates enormous lateral (horizontal) forces on the building. A typical column-beam frame is very flexible — it sways like a flag in a storm. Shear walls are stiff concrete walls that absorb and resist these lateral forces, keeping the building upright and preventing it from collapsing sideways.",
    beginnerSummary:
      "A shear wall is a thick concrete wall (usually 150–300 mm thick) that runs continuously from foundation to roof. It acts like a backbone for lateral loads — earthquake, wind, or blast. High-rise buildings cannot be built safely without shear walls in seismic zones.",
    designConcept:
      "A shear wall behaves like a vertical cantilever beam fixed at its base. Lateral forces at each floor (transferred through the slab diaphragm) are like point loads on this vertical beam. The wall develops bending moments, shear forces, and axial forces that must all be resisted. The bottom of the shear wall experiences the largest forces — this is where the most critical design and detailing occurs.",
    loadTransferPath:
      "Lateral Load (Earthquake/Wind) → Floor Slab (Diaphragm) → Shear Wall → Foundation",
    funFact:
      "The Taipei 101 tower uses a massive 660-tonne steel ball (tuned mass damper) to counteract wind sway — an alternative to shear walls for supertall buildings!",
    realWorldAnalogy:
      "Hold a playing card vertically by one end. Push it sideways — it bends easily. Now add a stiff cardboard rectangle perpendicular to the card's face — it becomes incredibly rigid. That perpendicular stiffener is a shear wall. Buildings work the same way.",
    constructionSteps: [
      { stepNumber: 1, title: "Boundary Element Reinforcement", description: "The edges (ends) of the shear wall, called 'boundary elements', are heavily reinforced zones with closely spaced ties. They're like the flanges of an I-beam — they carry the extreme tension and compression forces from bending. Boundary element steel is prefabricated and placed first.", tip: "Boundary elements may have ties as close as 75–100 mm in seismic zones — much closer than a normal column." },
      { stepNumber: 2, title: "Horizontal Web Reinforcement", description: "Horizontal bars are placed in both faces of the wall at specified vertical spacing (typically 150–200 mm). These are the 'shear reinforcement' — they directly resist the lateral forces acting on the wall. Each horizontal bar extends to the boundary element and is anchored with a standard hook.", tip: "Horizontal bars in shear walls are like stirrups in beams — they resist shear. Insufficient horizontal steel is a primary reason for shear wall failure in earthquakes." },
      { stepNumber: 3, title: "Vertical Web Reinforcement", description: "Vertical bars are placed in both faces of the wall at specified horizontal spacing. They resist the bending moment (like main bars in a beam), carry axial load, and work together with horizontal bars to form the web reinforcement system.", tip: "Both horizontal AND vertical reinforcement must be at least 0.25% of the cross-sectional area of the wall in each direction per IS 13920." },
      { stepNumber: 4, title: "Double Curtain Reinforcement", description: "Shear walls thicker than 200 mm have two layers (curtains) of reinforcement — one near each face. Both curtains are tied together with cross-ties at regular intervals to prevent the two curtains from separating under load.", tip: "Cross ties are often missed on site. They prevent the wall from 'delaminating' — splitting into two thin walls." },
      { stepNumber: 5, title: "Formwork Erection", description: "Heavy-duty double-sided formwork is erected on both faces of the wall. For shear walls, the formwork pressure is very high (concrete is a liquid — it presses outward). Adequate bracing and tie bolts are essential.", tip: "Wall formwork tie bolt holes become permanent holes in the wall. They must be sealed with mortar plugs after de-shuttering." },
      { stepNumber: 6, title: "Self-Compacting Concrete", description: "Due to heavy reinforcement, standard vibration may not reach all corners. Self-Compacting Concrete (SCC) or a highly workable mix (slump 150–200 mm) is used. SCC flows around bars by its own weight with no vibration needed.", tip: "Concrete is poured in lifts of no more than 500 mm to control formwork pressure." },
    ],
    materials: [
      { name: "Web Horizontal Bars", grade: "Fe500", role: "Primary shear resistance in the wall web", whyThisGrade: "Higher yield strength reduces bar quantity and congestion.", isCodeReference: "IS 13920" },
      { name: "Web Vertical Bars", grade: "Fe500", role: "Resist bending and axial load in the wall", whyThisGrade: "Same grade for uniformity and compatibility with horizontal bars.", isCodeReference: "IS 13920" },
      { name: "Boundary Element Steel", grade: "Fe500D", role: "Extreme tension and compression at wall edges during seismic loading", whyThisGrade: "'D' grade mandatory for boundary elements in seismic design — high ductility essential.", isCodeReference: "IS 13920:2016" },
      { name: "High-Grade Concrete", grade: "M30–M40", role: "Resist compressive stresses and provide stiffness", whyThisGrade: "Higher grade required for shear walls — they experience very high stress concentrations.", isCodeReference: "IS 456:2000" },
    ],
    physicsExplanations: [
      { concept: "Lateral Stiffness", explanation: "Shear walls are extremely stiff in their own plane — like a stiff ruler on its edge. They resist lateral loads with minimal deformation. A shear wall can be up to 100 times stiffer than an equivalent frame of columns and beams. This stiffness protects all the structural and non-structural elements from damage.", difficulty: "beginner" },
      { concept: "Overturning Moment", explanation: "Lateral loads at the top of a tall building create a massive overturning moment at the base — like trying to push over a tall box. The boundary elements at the wall edges experience extreme tension on one side and extreme compression on the other. This is why boundary elements must be heavily reinforced and well-confined.", difficulty: "intermediate" },
    ],
    mathConcepts: [
      { concept: "Minimum Web Reinforcement Ratio", formula: "ρh ≥ 0.0025  and  ρv ≥ 0.0025", explanation: "ρh = horizontal steel area / (wall thickness × bar spacing). Both horizontal and vertical reinforcement ratios must be at least 0.25% per IS 13920. This minimum ensures ductile behaviour during earthquakes.", difficulty: "intermediate" },
      { concept: "Shear Stress Check", formula: "τv = Vu / (t × d_w)  ≤  τc_max", explanation: "τv = nominal shear stress, Vu = factored shear force, t = wall thickness, d_w = effective depth of wall = 0.8 × lw (lw = length of wall). If τv exceeds τc_max (Table 20, IS 456), the wall thickness must be increased.", difficulty: "advanced" },
    ],
    engineeringPrinciples: [
      { principle: "Seismic Zone Requirements", explanation: "India has 4 seismic zones (II to V). Zone V (e.g., Northeast India, Himalayan region) is the most dangerous. Shear walls with ductile detailing (IS 13920) are mandatory for buildings in Zone III, IV, and V above certain heights. Zone II has relaxed requirements.", diagramUrl: "/images/seismic_zones_india.png" },
      { principle: "Coupling Beams", explanation: "When shear walls have openings (e.g., for corridors), the wall segments are connected by 'coupling beams'. These short, deep beams significantly enhance the wall system's stiffness and energy dissipation. They're designed to yield (act as fuses) during earthquakes, protecting the main walls.", diagramUrl: "/images/coupling_beam.png" },
    ],
    images: [
      { url: "/images/shear_wall_elevation.png", caption: "Shear wall elevation showing openings and coupling beams", type: "diagram" },
      { url: "/images/shear_wall_section.png", caption: "Shear wall cross-section with boundary elements and web reinforcement", type: "reinforcement" },
      { url: "/images/shear_wall_site.jpg", caption: "Shear wall under construction showing double curtain reinforcement", type: "construction" },
    ],
    tags: ["shear wall", "lateral load", "earthquake", "seismic", "wind", "high-rise"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. STAIRCASE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Staircase",
    code: "STAIRCASE",
    emoji: "🪜",
    tagline: "The elegant engineering of vertical movement",
    necessity:
      "Staircases provide the primary means of vertical movement between floors. In emergencies (fire, earthquake), elevators stop working — staircases are the only escape route. They must be strong, durable, non-slip, and wide enough for evacuation. A well-designed staircase is also a key architectural feature of a building.",
    beginnerSummary:
      "A staircase is the stepped structure that lets you walk from one floor to another. In RCC buildings, it's made of concrete with steel reinforcement. The key vocabulary: 'Riser' = the vertical face of each step (height). 'Tread' = the horizontal surface you step on (width). 'Waist slab' = the inclined slab below the steps.",
    designConcept:
      "An RCC staircase is essentially an inclined slab spanning between landing beams. The 'waist slab' (the structural slab below the steps) carries the load like any other slab, but at an angle. The design calculates the effective span (horizontal distance between supports), the total load (weight of steps + live load), and finds the required waist slab thickness and reinforcement.",
    loadTransferPath:
      "People walking on steps → Steps → Waist Slab → Landing Beam → Column/Wall → Foundation",
    funFact:
      "Standard staircase ergonomics: Riser 150 mm, Tread 300 mm. The formula 2R + T = 600 mm (the average human stride length) has been used in architecture for over 300 years!",
    realWorldAnalogy:
      "Think of a staircase as a tilted slab with teeth (the steps). The structural work is done by the inclined slab — the steps are just the surface shaping that make it comfortable to walk up.",
    constructionSteps: [
      { stepNumber: 1, title: "Staircase Layout and Marking", description: "The number of risers and treads for each flight is calculated from the floor-to-floor height and the available horizontal space. Each riser and tread position is marked on the adjacent wall using a chalk line.", tip: "All risers in a flight must be equal height. Even 5 mm variation causes tripping — this is one of the most common causes of falls on stairs." },
      { stepNumber: 2, title: "Inclined Formwork (Centering)", description: "An inclined wooden/steel framework is erected to support the waist slab from below. This is the most critical shuttering work — it must be perfectly aligned with the correct angle of inclination, and strong enough to support the heavy concrete of the waist slab plus steps.", tip: "Use double props at the mid-point of the flight — the inclined formwork carries significant load from the weight of concrete." },
      { stepNumber: 3, title: "Riser Board Fixing", description: "Wooden planks (riser boards) are fixed vertically at each step position to create the step shape. They must be perfectly vertical, correctly spaced, and firmly fixed to prevent shifting during concreting.", tip: "Pre-cut all riser boards to the same exact height — even 3 mm variation shows in the finished stair." },
      { stepNumber: 4, title: "Waist Slab Reinforcement", description: "Main bars are placed along the inclined soffit (parallel to the waist slab slope) at the bottom with 15–20 mm cover. Distribution bars are placed perpendicular. The bars must be carefully bent to follow the landing slab profiles at top and bottom of the flight.", tip: "At the landing-flight junction, bars must be bent to follow the geometry — straight bars in a bent geometry cause weak joints." },
      { stepNumber: 5, title: "Step (Riser-Tread) Reinforcement", description: "Additional bars are placed in each step to prevent step cracking. Typically 2 bars of 8–10 mm diameter run longitudinally through each step, supported on the riser boards.", tip: "Step reinforcement prevents the surface of the steps from cracking off from the waist slab, even though the waist slab carries the main structural load." },
      { stepNumber: 6, title: "Monolithic Concreting", description: "The waist slab and steps are poured together in one operation — starting from the bottom and working up. Workers must stand on the riser boards carefully. Concrete is compacted with a small vibrator at each step.", tip: "Vibrate carefully around the riser boards — avoid displacing them. One person should hold each riser board steady during concreting nearby." },
      { stepNumber: 7, title: "Surface Finishing", description: "After the concrete achieves initial set (2–4 hours), the tread surfaces are floated and finished to a smooth, even level. Non-slip nosing strips (metal or abrasive tiles) are embedded at the front edge of each tread.", tip: "Install non-slip nosing before concrete is fully set so it bonds integrally — don't glue it on later." },
    ],
    materials: [
      { name: "Waist Slab Concrete", grade: "M20", role: "Structural inclined slab carrying all staircase loads", whyThisGrade: "M20 is adequate for the moderate loads on residential staircases.", isCodeReference: "IS 456:2000" },
      { name: "Main Reinforcement", grade: "Fe500", role: "Resist tension in the waist slab along the span direction", whyThisGrade: "Standard grade for slab-type members.", isCodeReference: "IS 1786" },
      { name: "Distribution Steel", grade: "Fe415", role: "Transverse distribution and temperature/shrinkage control", whyThisGrade: "Distribution steel doesn't carry primary structural load.", isCodeReference: "IS 456:2000" },
      { name: "Non-slip Nosing Strips", grade: "Aluminium or Carborundum", role: "Prevent slipping at tread edge — safety critical", whyThisGrade: "Carborundum (silicon carbide) provides the highest slip resistance.", isCodeReference: "NBC 2016" },
    ],
    physicsExplanations: [
      { concept: "Inclined Slab Loading", explanation: "The waist slab is inclined (say at 30–35° to horizontal). Its self-weight acts vertically downward, but the structural span is horizontal. Engineers convert the inclined load to an equivalent load per unit horizontal length using trigonometry. The effective span is the horizontal distance between supports (landing beams).", difficulty: "intermediate" },
      { concept: "Landing Beam Function", explanation: "At the top and bottom of each flight, the staircase connects to a 'landing'. This is a horizontal slab, and usually a beam is hidden within or below the landing slab. This beam is the support point for the inclined waist slab — like the supports of a bridge.", difficulty: "beginner" },
    ],
    mathConcepts: [
      { concept: "Step Geometry (Golden Rule)", formula: "2R + T = 600 mm", explanation: "R = riser height (recommended: 150 mm), T = tread width (recommended: 300 mm). Check: 2×150 + 300 = 600 ✓. For steeper stairs: R can go up to 175 mm, T down to 250 mm. For gentle ramps: R = 100 mm, T = 400 mm.", difficulty: "beginner" },
      { concept: "Equivalent Load on Horizontal Span", formula: "w_h = (w_inclined) / cos α", explanation: "w_inclined = load per unit inclined length, α = angle of inclination. This converts the load to per unit horizontal length for standard beam/slab design calculations.", difficulty: "intermediate" },
    ],
    engineeringPrinciples: [
      { principle: "IS 875 Part 2 — Live Loads", explanation: "The design live load for staircases is 5 kN/m² for public buildings and 3 kN/m² for residential buildings (IS 875 Part 2). This accounts for crowds evacuating during emergencies — much higher than normal floor live load.", diagramUrl: "" },
    ],
    images: [
      { url: "/images/staircase_types.png", caption: "Types of staircases: Dog-legged, Open-well, Straight flight", type: "diagram" },
      { url: "/images/staircase_section.png", caption: "Staircase section showing waist slab, treads, risers, and landing", type: "diagram" },
      { url: "/images/staircase_reinforcement.png", caption: "Staircase reinforcement detail", type: "reinforcement" },
    ],
    tags: ["staircase", "waist slab", "riser", "tread", "landing", "vertical circulation"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. RETAINING WALL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Retaining Wall",
    code: "RETAINING_WALL",
    emoji: "🏔️",
    tagline: "The wall that wins the battle against soil",
    necessity:
      "When you cut into a hillside for a road, building, or basement, the exposed soil wants to slide down (soil has no tensile strength — it can't 'hold itself up' on a steep cut). A retaining wall holds that soil back, preventing landslides, protecting structures, and enabling construction on sloped terrain.",
    beginnerSummary:
      "A retaining wall literally 'retains' (holds back) soil on one side. You see them along roads cut through hills, at basement excavations, at garden terraces, and along railway embankments. Without them, the soil would just slide and fill the excavated area.",
    designConcept:
      "A retaining wall must resist the lateral pressure from the soil behind it. This soil pressure (called 'active earth pressure') acts like a triangular load — zero at the top, maximum at the bottom. A cantilever retaining wall (the most common type) resists this by acting as a vertical cantilever fixed at its base. The stem (vertical wall) resists the lateral pressure by bending; the base slab (horizontal footing) prevents the whole structure from sliding or overturning.",
    loadTransferPath:
      "Lateral Earth/Water Pressure → Stem (Vertical Wall) → Base Slab → Foundation Soil",
    funFact:
      "The Great Wall of China is essentially a very long retaining wall — built to retain the land on one side and provide a platform for soldiers on the other!",
    realWorldAnalogy:
      "Hold a book upright with your hand at the bottom. Your hand is the base slab, the book is the stem. The pressure of all the books you imagine pressing from behind is the soil pressure. Your hand must provide enough friction to stop the book from sliding forward — that's exactly how a retaining wall works.",
    constructionSteps: [
      { stepNumber: 1, title: "Soil Investigation and Excavation", description: "The soil on the retained side is investigated for friction angle and unit weight — key parameters for calculating earth pressure. The area in front of the proposed wall is excavated to allow construction of the base slab.", tip: "Temporary shoring (steel sheets or timber) may be needed to safely excavate near existing structures." },
      { stepNumber: 2, title: "PCC Bed and Base Slab Reinforcement", description: "PCC bed is laid. Base slab reinforcement (a flat mesh) is placed, with starter bars at the stem position rising upward. The base slab extends both in front of the stem (called 'toe') and behind it (called 'heel') — the heel counteracts overturning.", tip: "The heel slab carries the weight of the retained soil — this weight helps stabilize the wall against overturning." },
      { stepNumber: 3, title: "Base Slab Concreting", description: "The base slab (typically 300–400 mm thick) is cast first and cured for 7 days before the stem construction begins. This sequence ensures the stem starter bars are firmly embedded.", tip: "The base slab is almost always wider than it looks — often 60–70% of the wall height. A 3 m tall wall may have a 1.8–2.1 m wide base slab." },
      { stepNumber: 4, title: "Stem Reinforcement", description: "Stem reinforcement consists of main vertical bars (in the tension face — the side facing the retained soil) and distribution horizontal bars. The bar diameter and spacing is higher at the base (maximum bending) and can be reduced toward the top.", tip: "Steel is on the side of tension — for a wall retaining soil on the right, tension is on the RIGHT face. This seems counterintuitive but is correct — the soil pushes the wall to the left, creating tension on the soil side." },
      { stepNumber: 5, title: "Stem Formwork and Concreting", description: "Two-sided formwork is erected for the stem. Concrete is poured in lifts of 500 mm. Wall form ties (bolts passing through the wall) hold the two sides together against formwork pressure.", tip: "Always include weep hole pipes in the lower part of the stem (e.g., 75 mm dia PVC pipes at 2 m centres). Hydrostatic water pressure from saturated soil can be enormous — weep holes relieve this." },
      { stepNumber: 6, title: "Backfilling and Drainage Layer", description: "After the stem concrete has cured, the area behind the wall is filled with selected granular material (gravel or broken stone) in 150 mm layers, each compacted with a plate compactor. A 300–500 mm thick drainage blanket (coarse gravel) is placed directly behind the stem.", tip: "Never use clay or expansive soil for backfill — when wet, clay expands and dramatically increases earth pressure, potentially overloading the wall." },
    ],
    materials: [
      { name: "Stem Concrete", grade: "M25", role: "Resist bending in the stem", whyThisGrade: "M25 for durability in potentially wet soil environment.", isCodeReference: "IS 456:2000" },
      { name: "Stem Main Bars (Vertical)", grade: "Fe500", role: "Resist tension from lateral earth pressure", whyThisGrade: "High strength reduces required bar quantity.", isCodeReference: "IS 1786" },
      { name: "Weep Hole Pipes", grade: "75mm PVC pipe", role: "Drain water from behind the wall to prevent hydrostatic pressure build-up", whyThisGrade: "PVC is corrosion-resistant and durable in soil environment.", isCodeReference: "" },
      { name: "Drainage Blanket (Gravel)", grade: "40 mm crushed stone", role: "Collect and channel water to the weep holes", whyThisGrade: "High permeability material ensures rapid drainage.", isCodeReference: "" },
    ],
    physicsExplanations: [
      { concept: "Active Earth Pressure (Rankine's Theory)", explanation: "When soil is allowed to move slightly (the wall deflects), the soil reaches its 'active state'. Rankine's theory gives the lateral pressure at depth z as: p = Ka × γ × z, where Ka = (1-sinφ)/(1+sinφ), γ = soil unit weight, φ = friction angle. The pressure increases linearly with depth — maximum at the bottom. Total force = triangular area = ½ × Ka × γ × H².", difficulty: "intermediate" },
      { concept: "Factors of Safety", explanation: "A retaining wall must satisfy THREE stability checks: (1) FS against sliding ≥ 1.5 (wall shouldn't slide forward), (2) FS against overturning ≥ 2.0 (wall shouldn't tip over), (3) Soil bearing pressure must not exceed safe bearing capacity. All three must pass simultaneously.", difficulty: "intermediate" },
    ],
    mathConcepts: [
      { concept: "Total Active Earth Pressure", formula: "Pa = ½ × Ka × γ × H²", explanation: "Ka = Rankine's active pressure coefficient = (1-sinφ)/(1+sinφ), γ = unit weight of soil (≈18 kN/m³), H = height of retained soil. This force acts at H/3 from the base.", difficulty: "intermediate" },
      { concept: "Factor of Safety Against Overturning", formula: "FOS = ΣM_restoring / ΣM_overturning  ≥ 2.0", explanation: "Restoring moments (from self-weight of wall and retained soil on heel) must be at least twice the overturning moment (from lateral earth pressure × height/3).", difficulty: "intermediate" },
    ],
    engineeringPrinciples: [
      { principle: "Drainage is Non-Negotiable", explanation: "If water accumulates behind a retaining wall, the hydrostatic water pressure (γ_water × depth) adds to the earth pressure. For a fully saturated 3 m tall wall, water pressure alone can be 45 kN per metre — exceeding the earth pressure itself. Proper weep holes and drainage blankets can reduce effective lateral pressure by 50–70%.", diagramUrl: "/images/retaining_wall_drainage.png" },
    ],
    images: [
      { url: "/images/retaining_wall_types.png", caption: "Types: Gravity, Cantilever, Counterfort, Sheet pile", type: "diagram" },
      { url: "/images/retaining_wall_section.png", caption: "Cantilever retaining wall with base slab, stem, toe, heel, and weep holes", type: "diagram" },
      { url: "/images/retaining_wall_forces.png", caption: "Force diagram: active earth pressure, weight, reactions", type: "diagram" },
    ],
    tags: ["retaining wall", "earth pressure", "slope stability", "basement", "drainage", "rankine"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. LINTEL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Lintel",
    code: "LINTEL",
    emoji: "🚪",
    tagline: "The quiet guardian above every door and window",
    necessity:
      "Doors and windows create gaps (openings) in walls. Walls carry loads — if there's a gap, who carries the load above the gap? The lintel does. It spans across the opening, carries the wall load above it, and transfers this load to the masonry on both sides. Without lintels, the masonry above openings would crack and collapse.",
    beginnerSummary:
      "A lintel is a horizontal beam placed over a door or window opening. It's one of the simplest structural elements — yet absolutely essential in every building. They can be made of RCC, stone, steel, or even timber (in old buildings). Modern buildings use RCC lintels.",
    designConcept:
      "A lintel is designed as a simply supported beam spanning the clear opening. However, well-bonded masonry above the lintel forms a natural arch and carries part of the load itself — this 'arching action' means only a triangular wedge of masonry (with height = 0.866 × span) actually loads the lintel. Any masonry or loads above this triangle are carried directly by the walls on either side.",
    loadTransferPath:
      "Wall load above opening → Arching action → Lintel beam → Wall masonry on sides of opening",
    funFact:
      "Ancient stone lintels, like those in Stonehenge (each weighing up to 25 tonnes), were the original solution to spanning openings — over 4000 years before RCC was invented!",
    realWorldAnalogy:
      "Imagine a stack of books above a gap between two piles. The books 'arch' naturally — the ones directly above the gap lean on the ones further away, which eventually rest on the solid piles. The lintel holds the books that would otherwise fall into the gap before the arch can form.",
    constructionSteps: [
      { stepNumber: 1, title: "Opening Preparation", description: "The masonry (brick/block) is built up to the lintel level on both sides of the opening. A bearing length of at least 150 mm is left on each side — this is the minimum support needed to transfer the lintel's end reactions into the wall.", tip: "150 mm minimum bearing per IS 456. Longer bearing = lower bearing stress on masonry. For wide openings (>2 m), use 200 mm bearing." },
      { stepNumber: 2, title: "Formwork (Centering)", description: "A simple horizontal wooden plank is supported on the masonry on both sides, exactly at the bottom level of the lintel. This forms the bottom mould. Side boards of the same depth as the lintel are fixed on both sides.", tip: "Lintel depth should be at least 1/12 of the span (minimum 150 mm). A 1.2 m wide opening needs a lintel at least 100 mm deep — use 150 mm for safety." },
      { stepNumber: 3, title: "Reinforcement Placement", description: "2 to 4 main bars (12mm or 16mm diameter) are placed at the bottom of the lintel (the tension zone). Stirrups (8mm at 150 mm spacing) are added for shear resistance. For lintels up to 1.5 m span, stirrups may be minimal.", tip: "Unlike beams, lintels often have very light reinforcement — the wall's arching action carries most of the load. But always follow the structural drawing." },
      { stepNumber: 4, title: "Concreting and Curing", description: "M20 concrete is poured and compacted. Since lintels are small, hand compaction with a rod often suffices. After 24 hours, sides can be removed; the bottom support should remain for 7 days.", tip: "Mark the top of each lintel with the opening width (e.g., 'L-1200') using a marker — it helps identify them before they're covered by plaster." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Resist compression in the top zone of the lintel beam", whyThisGrade: "M20 minimum for structural members exposed to weather.", isCodeReference: "IS 456:2000" },
      { name: "Main Bars", grade: "Fe415", role: "Resist tension at the bottom of the lintel", whyThisGrade: "Fe415 adequate for the light loading on lintels.", isCodeReference: "IS 1786" },
      { name: "Stirrups", grade: "Fe250 (Mild Steel)", role: "Resist shear near supports", whyThisGrade: "Mild steel stirrups are easy to bend into tight shapes for small lintels.", isCodeReference: "IS 456:2000" },
    ],
    physicsExplanations: [
      { concept: "Arching Action in Masonry", explanation: "Well-bonded brick or block masonry above an opening naturally forms a compression arch. This arch transfers loads diagonally to the walls on either side of the opening. Only the masonry within a triangular zone (height ≈ 0.866 × clear span, angle at 60° from horizontal) loads the lintel. Everything above this triangle goes directly to the adjacent walls.", difficulty: "beginner" },
    ],
    mathConcepts: [
      { concept: "Load on Lintel (with Arching Action)", formula: "w = γ_masonry × 0.866 × L / 2  per unit length (triangular load equivalent UDL)", explanation: "γ_masonry ≈ 20 kN/m³, L = clear span. The triangular load is converted to an equivalent UDL = ½ × max intensity. For L = 1.2 m: w_equiv ≈ 20 × 0.866 × 1.2 / 2 = 10.4 kN/m (very light!).", difficulty: "intermediate" },
    ],
    engineeringPrinciples: [
      { principle: "When Arching Action Does NOT Apply", explanation: "Arching action applies only when: (a) masonry is properly bonded above the opening, (b) masonry height above opening > 0.866 × span, and (c) no concentrated loads act within the triangular zone. If any condition fails, the full wall load must be taken by the lintel — a much more demanding design.", diagramUrl: "" },
    ],
    images: [
      { url: "/images/lintel_arching.png", caption: "Arching action in masonry above a lintel showing the triangular load zone", type: "diagram" },
      { url: "/images/lintel_section.png", caption: "Lintel cross-section showing bars and bearing on wall", type: "diagram" },
      { url: "/images/lintel_types.png", caption: "Types: RCC lintel, Stone lintel, Steel angle lintel", type: "diagram" },
    ],
    tags: ["lintel", "opening", "masonry", "door", "window", "arch action", "bearing"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. PLINTH BEAM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Plinth Beam",
    code: "PLINTH_BEAM",
    emoji: "🔗",
    tagline: "The connecting ring that unifies all foundations",
    necessity:
      "In any building, not all soil is exactly the same — some spots may be slightly weaker, some stronger. This causes different columns to settle by different amounts — called 'differential settlement'. Differential settlement cracks walls, tilts floors, and can be catastrophic. Plinth beams act as a rigid ring connecting all column footings, forcing them to settle together rather than independently.",
    beginnerSummary:
      "A plinth beam is a horizontal RCC beam provided at the plinth level (the level just above ground, from which the building walls start). It connects all the column bases, acting like a ring that holds everything together. It's also called a 'grade beam' when provided at ground level.",
    designConcept:
      "Plinth beams are primarily designed as 'tie beams' — they connect footings and prevent relative movement. In seismic design (IS 13920), they must resist an axial force equal to 1/10th of the factored column load. They also prevent columns from spreading apart at the base during earthquake ground motion. As a bonus, plinth beams provide the base for ground floor walls — preventing wall cracking from foundation movement.",
    loadTransferPath:
      "Differential Settlement Force / Seismic Ground Motion → Plinth Beam → Adjacent Column Footings",
    funFact:
      "The Leaning Tower of Pisa leans because its foundation had no connecting beams — the uneven soft soil caused severe differential settlement on one side. Modern buildings with plinth beams simply cannot lean like that!",
    realWorldAnalogy:
      "Imagine placing several table legs on slightly uneven ground. Without any cross-bracing between them, each leg might sink slightly differently and the table wobbles. Adding a horizontal frame at the base (connecting all legs) forces them all to stay at the same level — that's a plinth beam.",
    constructionSteps: [
      { stepNumber: 1, title: "Column Stump Completion", description: "Columns are cast up to plinth level (typically 300–600 mm above natural ground level, or as specified). The column bars (starter bars) protrude above the top of the column stump to be lapped with the plinth beam bars.", tip: "Plinth level is usually marked as the finished floor level (FFL) minus 150 mm (to account for flooring thickness)." },
      { stepNumber: 2, title: "Plinth Beam Reinforcement", description: "Longitudinal bars (typically 4 bars of 12–16 mm diameter) are placed — 2 at the top, 2 at the bottom — connected to the column stump bars with proper lap splices. Stirrups (8mm at 150 mm spacing) complete the cage. The cage runs continuously from column to column.", tip: "Plinth beam reinforcement must be connected to each column — they work as an integrated ring, not separate beams." },
      { stepNumber: 3, title: "Shuttering and Concreting", description: "Side shuttering is erected (the beam sits on the compacted earth below, so no bottom shuttering needed). M20 concrete is poured and compacted. The top level must match across all plinth beams — this forms a level base for the ground floor wall.", tip: "The top surface of the plinth beam is the reference level for wall construction — check it with a water level or laser level." },
      { stepNumber: 4, title: "Anti-termite Treatment", description: "Before backfilling, the soil below and around the plinth beam is treated with chemical anti-termite solution. Termites can damage wooden door frames, furniture, and in extreme cases, formwork embedded in walls.", tip: "Apply anti-termite treatment as a continuous layer under the entire floor area — not just around beams." },
      { stepNumber: 5, title: "Backfilling Below Floor Slab", description: "The area between plinth beams is filled with good soil or sand in compacted layers. This becomes the base for the ground floor slab-on-grade (the ground floor slab that rests directly on the earth).", tip: "Compact each layer thoroughly — poorly compacted fill will settle later, causing the ground floor slab to crack." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Structural body of the beam", whyThisGrade: "M20 minimum; increase to M25 in chemically aggressive soils.", isCodeReference: "IS 456:2000" },
      { name: "Longitudinal Bars", grade: "Fe500", role: "Carry axial tension/compression from differential settlement and seismic forces", whyThisGrade: "Higher strength steel reduces bar count, easing construction in congested column zones.", isCodeReference: "IS 1786" },
      { name: "Stirrups", grade: "Fe415", role: "Shear resistance and confinement", whyThisGrade: "Standard grade for stirrups.", isCodeReference: "IS 456:2000" },
    ],
    physicsExplanations: [
      { concept: "Differential Settlement", explanation: "If one footing sinks 20 mm and an adjacent one sinks only 5 mm, the beam between them must deform to accommodate this 15 mm difference. A plinth beam, being a stiff RCC member, resists this deformation — it develops internal forces that limit the differential movement. The stiffer the beam, the smaller the differential settlement allowed.", difficulty: "beginner" },
    ],
    mathConcepts: [
      { concept: "Seismic Tie Force", formula: "N_tie = Pu_column / 10", explanation: "Pu_column = factored axial load on the heavier column being tied. Example: Column carries 500 kN → Plinth beam must resist 50 kN of axial tension/compression. The beam section and steel are designed to carry this force without yielding.", difficulty: "intermediate" },
    ],
    engineeringPrinciples: [
      { principle: "Plinth Protection", explanation: "The outer face of the plinth beam is plastered and waterproofed (using cement + waterproofing compound). A sloped 'plinth protection' apron of PCC (75 mm thick) is cast around the building's perimeter, sloping away from the wall. This prevents rainwater from pooling against the plinth and entering the soil near the foundation.", diagramUrl: "/images/plinth_protection.png" },
    ],
    images: [
      { url: "/images/plinth_beam_layout.png", caption: "Plan view showing plinth beams connecting all column footings in a ring", type: "diagram" },
      { url: "/images/plinth_beam_section.png", caption: "Section showing footing, column stump, plinth beam, and ground floor slab", type: "diagram" },
    ],
    tags: ["plinth beam", "grade beam", "tie beam", "differential settlement", "seismic", "foundation"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. TIE BEAM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "Tie Beam",
    code: "TIE_BEAM",
    emoji: "⛓️",
    tagline: "The invisible brace that keeps columns in check",
    necessity:
      "Columns in tall buildings, or columns with large floor-to-floor heights, can become very slender. Slender columns are prone to buckling — sudden sideways collapse under compressive loads. A tie beam is provided at an intermediate height to break the column into shorter, safer segments — dramatically increasing its load-carrying capacity.",
    beginnerSummary:
      "A tie beam connects columns at an intermediate level — not at the floor level and not at the ground level, but somewhere in between (e.g., at window sill level or at 2 m height in a 4 m tall storey). It has no floor load on it — its job is purely to restrain the columns laterally and reduce their effective length.",
    designConcept:
      "The fundamental purpose is to reduce the 'effective length' of columns. A column fixed at both ends and restrained in the middle behaves like a column of half its actual height. Halving the effective length quadruples the buckling load — an enormous improvement. Tie beams are designed primarily for an axial force (tension or compression) and are given minimum cross-sectional dimensions per code.",
    loadTransferPath:
      "Column Lateral Movement / Buckling Tendency → Tie Beam (Axial Resistance) → Adjacent Columns",
    funFact:
      "The concept of using tie beams was used in ancient Roman timber construction — horizontal 'collar ties' across the middle of roof trusses prevented the rafters from spreading apart. Modern RCC tie beams serve the exact same mechanical purpose.",
    realWorldAnalogy:
      "Hold a long thin rubber band between two fingers and compress it — it buckles sideways easily. Now add a pin somewhere in the middle holding it to a fixed wall. You've now created two shorter segments — each segment can carry much more compressive load before buckling. That middle pin is the tie beam.",
    constructionSteps: [
      { stepNumber: 1, title: "Level Marking", description: "The height of the tie beam is marked on all columns using a laser level or water level. Tie beams are commonly at window sill level (0.9 m from floor) or at mid-storey height. All tie beams in one level must be at exactly the same height.", tip: "Tie beams at window sill level serve a dual purpose — structural tie + base for the window frame masonry." },
      { stepNumber: 2, title: "Chipping / Starter Bar Preparation", description: "If the column is already cast, the column surface at the tie beam location is chipped (roughened) to improve bond. Sometimes starter bars are planned ahead of time and cast into the column during its construction.", tip: "Plan tie beam starter bars in advance — chipping and drilling into finished columns is messy, time-consuming, and weakens the column slightly." },
      { stepNumber: 3, title: "Reinforcement Fabrication and Placement", description: "A simple cage of 4 longitudinal bars with stirrups at 150 mm spacing is the typical tie beam reinforcement. The cage is tied to the column bars (or anchored into the column using epoxy-set dowels).", tip: "Minimum tie beam size: 230 mm × 300 mm with 4-12mm bars and 8mm stirrups @ 150 mm c/c (IS 456 recommendation)." },
      { stepNumber: 4, title: "Formwork and Concreting", description: "Bottom and side shuttering is erected. M20 concrete is poured and compacted. The tie beam carries no floor load, so the props can be removed earlier (after 7 days curing).", tip: "Ensure a good chamfer (45° angle piece) at all four corners of the tie beam formwork — this creates a neat arrissed (bevelled) edge on the finished beam." },
    ],
    materials: [
      { name: "Concrete", grade: "M20", role: "Structural body — resist compression if columns push inward, tension if they pull apart", whyThisGrade: "M20 minimum; same grade as columns for compatibility.", isCodeReference: "IS 456:2000" },
      { name: "Longitudinal Bars", grade: "Fe415", role: "Carry axial tension or compression", whyThisGrade: "Fe415 adequate for the light loads on tie beams.", isCodeReference: "IS 1786" },
    ],
    physicsExplanations: [
      { concept: "Effective Length and Buckling Load", explanation: "Euler's buckling theory: Pcr = π²EI / (K·L)². K = effective length factor (0.5 for both-ends-fixed, 1.0 for both-ends-pinned). A tie beam at mid-height effectively makes K × L half of the original — making the buckling load 4 times higher. This is the single most efficient way to improve column capacity.", difficulty: "intermediate" },
    ],
    mathConcepts: [
      { concept: "Effective Length with Tie Beam", formula: "l_eff = K × l  where l = height between lateral restraints", explanation: "With a tie beam at mid-height, l (the unsupported height) is halved. Example: 4 m column → effective length 4 m without tie beam. With tie beam at 2 m: effective length = 2 m. Slenderness ratio drops from 4000/300 = 13.3 (slender!) to 2000/300 = 6.7 (short column) for a 300 mm column.", difficulty: "intermediate" },
    ],
    engineeringPrinciples: [
      { principle: "Tie Beam vs Floor Beam", explanation: "A floor beam carries the floor slab load — large vertical (transverse) loads creating significant bending. A tie beam carries essentially no transverse load — just axial force and minimal bending. Therefore tie beams need far less steel than floor beams and can be much smaller in cross-section.", diagramUrl: "" },
    ],
    images: [
      { url: "/images/tie_beam_column.png", caption: "Tie beam at mid-storey height showing how it divides the column into two shorter segments", type: "diagram" },
      { url: "/images/slenderness_comparison.png", caption: "Slenderness ratio comparison: with and without tie beam", type: "diagram" },
    ],
    tags: ["tie beam", "slenderness", "buckling", "effective length", "column", "intermediate beam"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILDING TYPE SEED DATA
// ═══════════════════════════════════════════════════════════════════════════════

const buildingSeeds = [
  {
    name: "Residential Building (Low-Rise RCC)",
    code: "RESIDENTIAL",
    description:
      "A low-rise residential building (Ground + 2 to Ground + 4 floors) is the most common building type in India. It uses a reinforced cement concrete (RCC) frame — columns, beams, and slabs — with brick infill walls. Ideal for individual homes, apartments, and housing colonies. Every structural element you can study here directly applies to houses you see around you every day.",
    imageUrl: "/images/residential_building.jpg",
    componentCodes: ["FOOTING", "PLINTH_BEAM", "COLUMN", "TIE_BEAM", "BEAM", "SLAB", "STAIRCASE", "LINTEL", "RETAINING_WALL"],
  },
  {
    name: "Commercial Building (Mid-Rise RCC Frame)",
    code: "COMMERCIAL",
    description:
      "Commercial buildings (G+5 to G+10) house offices, shops, hotels, and hospitals. They have larger spans (5–8 m between columns), heavier floor loads, and stricter fire safety requirements. The structural frame is heavier than residential, with larger beam and column sizes. Higher concrete grades (M30+) are common.",
    imageUrl: "/images/commercial_building.jpg",
    componentCodes: ["FOOTING", "PLINTH_BEAM", "COLUMN", "BEAM", "SLAB", "STAIRCASE", "LINTEL", "SHEAR_WALL"],
  },
  {
    name: "High-Rise Framed Structure",
    code: "HIGH_RISE",
    description:
      "High-rise buildings (G+10 and above) present unique engineering challenges — very high axial loads in lower columns, wind and seismic lateral loads that dominate design, and complex foundation requirements. Shear walls become essential. Concrete grades M35–M50 are used in lower stories. These buildings require sophisticated structural analysis software and highly experienced engineers.",
    imageUrl: "/images/high_rise_building.jpg",
    componentCodes: ["FOOTING", "COLUMN", "BEAM", "SLAB", "SHEAR_WALL", "STAIRCASE", "RETAINING_WALL", "PLINTH_BEAM"],
  },
  {
    name: "Low-Rise RCC Structure",
    code: "LOW_RISE_RCC",
    description:
      "A general low-rise RCC structure (up to G+3) for mixed use — small schools, clinics, community halls, or small factories. Features moderate spans, standard concrete grades (M20–M25), and straightforward structural design. An excellent starting point for civil engineering students learning structural design from scratch.",
    imageUrl: "/images/low_rise_rcc.jpg",
    componentCodes: ["FOOTING", "PLINTH_BEAM", "COLUMN", "BEAM", "SLAB", "LINTEL", "STAIRCASE"],
  },
  {
    name: "Industrial Shed",
    code: "INDUSTRIAL",
    description:
      "Industrial sheds are large single-storey or double-storey structures for factories, warehouses, and workshops. They feature very large column spans (12–30 m) with lightweight roof structures (steel or RCC portal frames). Retaining walls and deep footings are common due to heavy equipment loads. The structural challenges here are span-related rather than height-related.",
    imageUrl: "/images/industrial_shed.jpg",
    componentCodes: ["FOOTING", "COLUMN", "BEAM", "SLAB", "RETAINING_WALL", "TIE_BEAM"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SEEDING LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅  Connected to MongoDB");

    await BuildingType.deleteMany({});
    await StructuralComponent.deleteMany({});
    console.log("🗑️   Cleared existing collections");

    // Insert components
    const insertedComponents = await StructuralComponent.insertMany(componentSeeds);
    console.log(`✅  Inserted ${insertedComponents.length} structural components`);

    const codeToId = {};
    insertedComponents.forEach((c) => { codeToId[c.code] = c._id; });

    // Insert building types with resolved IDs and back-links
    for (const bSeed of buildingSeeds) {
      const componentIds = (bSeed.componentCodes || [])
        .filter((code) => codeToId[code])
        .map((code) => codeToId[code]);

      const building = await BuildingType.create({
        name: bSeed.name,
        code: bSeed.code,
        description: bSeed.description,
        imageUrl: bSeed.imageUrl,
        components: componentIds,
      });

      await StructuralComponent.updateMany(
        { _id: { $in: componentIds } },
        { $addToSet: { buildingTypes: building._id } }
      );

      console.log(`🏗️   Created: ${building.name} (${componentIds.length} components)`);
    }

    console.log("\n🎉  Rich seed data inserted successfully!");
    console.log(`📦  ${buildingSeeds.length} building types, ${componentSeeds.length} components`);
    process.exit(0);
  } catch (err) {
    console.error("❌  Seeding error:", err.message);
    process.exit(1);
  }
};

seedDatabase();
