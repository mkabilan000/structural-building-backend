# 🏗️ Structural Element Knowledge Explorer — Backend API

**Domain:** Structural Engineering in Civil  
**Team:** Divya Dharshini, Kabilan, Mariselvi, Santhosh Kumar  
**Stack:** Node.js · Express.js · MongoDB (Mongoose)

---

## 📁 Project Structure

```
structural-explorer-backend/
├── server.js                    ← Entry point
├── package.json
├── .env.example                 ← Copy to .env and fill in values
├── config/
│   └── db.js                    ← MongoDB connection
├── models/
│   ├── BuildingType.js          ← Building type schema
│   └── StructuralComponent.js  ← Component schema (core model)
├── controllers/
│   ├── buildingController.js   ← Building CRUD logic
│   └── componentController.js  ← Component CRUD + detail endpoints
├── routes/
│   ├── buildingRoutes.js
│   └── componentRoutes.js
└── seed/
    ├── seedData.js              ← Basic seed (2 buildings, 10 components)
    └── richSeedData.js          ← FULL rich seed (5 buildings, 10 components)
                                    with beginner-friendly explanations
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env: set MONGO_URI to your MongoDB connection string
```

### 3. Seed the database with full rich content
```bash
npm run seed:rich
```

### 4. Start the server
```bash
npm run dev        # Development (auto-restart)
npm start          # Production
```

Server runs at: **http://localhost:5000**

---

## 📊 Database Schema

### BuildingType
| Field       | Type     | Description                              |
|-------------|----------|------------------------------------------|
| name        | String   | e.g. "Residential Building (Low-Rise)"  |
| code        | String   | Unique code e.g. "RESIDENTIAL"           |
| description | String   | Beginner-friendly description            |
| imageUrl    | String   | Hero image for the building type card    |
| components  | [ObjectId] | References to StructuralComponent      |

### StructuralComponent (Core Model)
| Field               | Type     | Description                                  |
|---------------------|----------|----------------------------------------------|
| name                | String   | e.g. "Footing"                               |
| code                | String   | Unique e.g. "FOOTING"                        |
| emoji               | String   | UI icon e.g. "🧱"                            |
| tagline             | String   | Short catchy line for cards                  |
| necessity           | String   | Why this element exists (beginner paragraph) |
| beginnerSummary     | String   | Simple 2-3 line explanation                  |
| designConcept       | String   | How it is designed                           |
| loadTransferPath    | String   | e.g. "Slab → Beam → Column → Footing → Soil"|
| funFact             | String   | Engaging fact for students                   |
| realWorldAnalogy    | String   | Easy-to-understand comparison                |
| constructionSteps   | Array    | Step-by-step site construction with tips     |
| materials           | Array    | Materials with grade + why this grade        |
| physicsExplanations | Array    | Physics concepts with difficulty tags        |
| mathConcepts        | Array    | Formulas with beginner explanations          |
| engineeringPrinciples| Array  | Advanced engineering principles              |
| images              | Array    | Diagrams, CAD, construction photos          |
| tags                | [String] | For search and filtering                     |

---

## 🌐 API Reference

### Base URL
```
http://localhost:5000/api
```

---

### 🏛️ Building Types

#### GET /api/buildings
List all building types (summary — no component details).

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "name": "Residential Building (Low-Rise RCC)",
      "code": "RESIDENTIAL",
      "description": "A low-rise residential building...",
      "imageUrl": "/images/residential_building.jpg"
    }
  ]
}
```

---

#### GET /api/buildings/:id
Get one building type with its full component list (name, tagline, emoji, necessity).

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Residential Building (Low-Rise RCC)",
    "code": "RESIDENTIAL",
    "components": [
      {
        "_id": "...",
        "name": "Footing",
        "code": "FOOTING",
        "emoji": "🧱",
        "tagline": "The hidden hero that holds everything up",
        "necessity": "...",
        "imageUrl": "/images/footing_3d.png",
        "tags": ["footing", "foundation"]
      }
    ]
  }
}
```

---

#### GET /api/buildings/code/:code
Get building by code string. Example: `GET /api/buildings/code/RESIDENTIAL`

---

#### POST /api/buildings
Create a new building type.

**Body:**
```json
{
  "name": "Industrial Shed",
  "code": "INDUSTRIAL",
  "description": "Single-storey factory or warehouse...",
  "imageUrl": "/images/industrial.jpg"
}
```

---

#### PUT /api/buildings/:id
Update a building type.

---

#### DELETE /api/buildings/:id
Delete a building type (also removes back-references from components).

---

### 🧱 Structural Components

#### GET /api/components
List all components. Supports query parameters:

| Query Param   | Description                              | Example                        |
|---------------|------------------------------------------|--------------------------------|
| `buildingType`| Filter by building type ID               | `?buildingType=665abc...`      |
| `search`      | Full-text search across name/description | `?search=earthquake`           |
| `tag`         | Filter by tag                            | `?tag=foundation`              |

**Example:** `GET /api/components?tag=seismic`

---

#### GET /api/components/:id
Full detail page for a component — ALL fields included.

**Response includes:**
- `beginnerSummary`, `necessity`, `funFact`, `realWorldAnalogy`
- `constructionSteps[]` — each with `title`, `description`, `tip`, `imageUrl`
- `materials[]` — each with `grade`, `role`, `whyThisGrade`, `isCodeReference`
- `physicsExplanations[]` — with `difficulty` level (beginner/intermediate/advanced)
- `mathConcepts[]` — with `formula` and `explanation`
- `engineeringPrinciples[]` — advanced principles with diagram URLs
- `images[]` — typed as diagram / reinforcement / construction / cad / photo

---

#### GET /api/components/code/:code
Get component by code. Example: `GET /api/components/code/FOOTING`

---

#### GET /api/components/:id/design
Returns only the design + physics + math + engineering sections.
**Use case:** "Design Concepts" tab on the frontend detail page.

---

#### GET /api/components/:id/construction
Returns only the step-by-step construction procedure.
**Use case:** "Construction Steps" tab on the frontend detail page.

---

#### GET /api/components/:id/materials
Returns only the materials section.
**Use case:** "Materials Used" tab on the frontend detail page.

---

#### GET /api/components/:id/images
Returns only the images and diagrams.
**Use case:** Image gallery on the frontend detail page.

---

#### POST /api/components
Create a new structural component. Auto-links to building types.

**Body (minimum required):**
```json
{
  "name": "Pile Foundation",
  "code": "PILE",
  "emoji": "🔩",
  "tagline": "When soil is too weak for a normal footing",
  "necessity": "Pile foundations are used when...",
  "designConcept": "Piles are designed as...",
  "buildingTypes": ["665abc...", "665def..."],
  "tags": ["pile", "deep foundation"]
}
```

---

#### PUT /api/components/:id
Update any field of a structural component.

---

#### DELETE /api/components/:id
Delete a component. Auto-removes back-references from building types.

---

#### GET /api/health
Health check.

**Response:**
```json
{
  "success": true,
  "message": "Structural Element Knowledge Explorer API is running 🏗️",
  "timestamp": "2026-04-10T10:00:00.000Z"
}
```

---

## 🗄️ Seed Data Summary

After running `npm run seed:rich`:

### Building Types (5)
| Code          | Name                              | Components |
|---------------|-----------------------------------|------------|
| RESIDENTIAL   | Residential Building (Low-Rise)   | 9          |
| COMMERCIAL    | Commercial Building (Mid-Rise)    | 8          |
| HIGH_RISE     | High-Rise Framed Structure        | 8          |
| LOW_RISE_RCC  | Low-Rise RCC Structure            | 7          |
| INDUSTRIAL    | Industrial Shed                   | 6          |

### Structural Components (10)
| Code            | Name           | Emoji |
|-----------------|----------------|-------|
| FOOTING         | Footing        | 🧱    |
| COLUMN          | Column         | 🏛️   |
| BEAM            | Beam           | 📐    |
| SLAB            | Slab           | 🪨    |
| SHEAR_WALL      | Shear Wall     | 🛡️   |
| STAIRCASE       | Staircase      | 🪜    |
| RETAINING_WALL  | Retaining Wall | 🏔️   |
| LINTEL          | Lintel         | 🚪    |
| PLINTH_BEAM     | Plinth Beam    | 🔗    |
| TIE_BEAM        | Tie Beam       | ⛓️   |

### Content per Component
Each component includes:
- ✅ Beginner summary + real-world analogy + fun fact
- ✅ 6–10 detailed construction steps with pro tips
- ✅ 3–6 materials with grade explanations (why this grade?)
- ✅ 2–3 physics concepts (tagged beginner/intermediate/advanced)
- ✅ 2–3 math concepts with formulas and worked examples
- ✅ 1–2 engineering principles with IS code references
- ✅ 3–5 image/diagram references
- ✅ 4–8 searchable tags

---

## 🔌 Typical Frontend Flow

```
1. GET /api/buildings
   → Show building type cards on Home Page

2. GET /api/buildings/:id  (or /code/RESIDENTIAL)
   → Show component grid for selected building

3. GET /api/components/:id
   → Show full Knowledge Page with all tabs

   Tabs map to focused endpoints:
   • "Overview"      → full component data
   • "Design"        → GET /api/components/:id/design
   • "Construction"  → GET /api/components/:id/construction
   • "Materials"     → GET /api/components/:id/materials
   • "Gallery"       → GET /api/components/:id/images

4. GET /api/components?search=earthquake
   → Search/filter results page

5. GET /api/components?tag=foundation
   → Category filtering
```

---

## 📝 IS Codes Referenced
- **IS 456:2000** — Plain and Reinforced Concrete (General Code)
- **IS 13920:2016** — Ductile Detailing for Seismic Design
- **IS 875 Part 2** — Code of Practice for Design Loads (Live Loads)
- **IS 1786** — High Strength Deformed Steel Bars and Wires
- **IS 1904** — Design and Construction of Foundations
- **IS 383** — Coarse and Fine Aggregates
- **IS 12269** — Ordinary Portland Cement (OPC 53 Grade)
