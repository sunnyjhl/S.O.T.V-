# Satellite Orbit and Trajectory Visualizer - Specification

## 1. Project Overview

**Project Name:** Satellite Orbit and Trajectory Visualizer  
**Type:** Full-stack Web Application (3D Visualization)  
**Core Functionality:** Real-time 3D visualization of Earth with satellite orbits, trajectory calculations, and satellite tracking using data from CelesTrak API  
**Target Users:** Space enthusiasts, students, educators, and professionals interested in orbital mechanics

## 2. Tech Stack

### Frontend

- **Framework:** React.js 18.x
- **3D Graphics:** Three.js with React Three Fiber
- **Styling:** Tailwind CSS 3.x
- **State Management:** React Context + useState
- **HTTP Client:** Axios

### Backend

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Database:** MongoDB with Mongoose ODM
- **API Integration:** CelesTrak API

## 3. UI/UX Specification

### Color Palette

- **Primary Background:** #0a0a1a (Deep Space Black)
- **Secondary Background:** #1a1a2e (Dark Blue)
- **Accent Primary:** #00d4ff (Cyan/Electric Blue)
- **Accent Secondary:** #ff6b35 (Orange)
- **Accent Tertiary:** #7b2cbf (Purple)
- **Text Primary:** #ffffff
- **Text Secondary:** #a0a0b0
- **Earth Land:** #2d5a27 (Green)
- **Earth Ocean:** #1a4a6e (Blue)
- **Orbit LEO:** #00ff88 (Green)
- **Orbit MEO:** #00d4ff (Cyan)
- **Orbit GEO:** #ff6b35 (Orange)
- **Orbit Polar:** #ff00ff (Magenta)

### Typography

- **Font Family:** 'Orbitron' for headers, 'Roboto Mono' for data
- **Header Size:** 24px-32px
- **Body Size:** 14px-16px
- **Data Display:** 12px-14px monospace

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Navigation + Title)                                │
├─────────────────────────────────────────────────────────────┤
│  SIDEBAR (250px)     │  MAIN 3D VIEWPORT (flex-1)           │
│  - Satellite List   │  - Three.js Earth Scene             │
│  - Orbit Filters    │  - Satellite Orbits                  │
│  - Search           │  - Trajectory Lines                  │
│                     │                                       │
├─────────────────────┴───────────────────────────────────────┤
│  DASHBOARD PANEL (Fixed Bottom - 200px)                     │
│  [Satellite Info] [Altitude] [Velocity] [Period] [Position] │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

- **Desktop:** > 1200px (Full layout)
- **Tablet:** 768px-1200px (Collapsible sidebar)
- **Mobile:** < 768px (Stacked layout)

## 4. Component Specification

### Header Component

- Logo with satellite icon
- Navigation tabs: Dashboard | Orbits | Trajectory Calculator
- Real-time clock display (UTC)
- Theme toggle (optional)

### Sidebar Component

- Search input with autocomplete
- Orbit type filter checkboxes (LEO, MEO, GEO, Polar)
- Satellite list with pagination
- Click to select satellite
- Launch simulation button

### 3D Viewport Component

- Earth sphere with textures (day/night optional)
- Atmosphere glow effect
- Satellite markers (small spheres/dots)
- Orbit path lines (elliptical)
- Trajectory preview lines (dashed)
- Camera controls (orbit, zoom, pan)
- Grid helper (optional)

### Dashboard Panel Component

- Selected satellite info card
- Real-time altitude (km)
- Velocity (km/s)
- Orbital period (minutes)
- Current position (lat/long)
- Next pass prediction

### Trajectory Calculator Component

- Launch location selector
- Target orbit parameters
- Launch angle calculator
- Delta-V requirements
- Simulation preview

## 5. Backend API Specification

### REST Endpoints

```
GET  /api/satellites              - Get all satellites (paginated)
GET  /api/satellites/:noradId     - Get satellite by NORAD ID
GET  /api/satellites/celestrak    - Fetch latest from CelesTrak
GET  /api/satellites/orbit/:type  - Get satellites by orbit type
POST /api/satellites/search       - Search satellites
GET  /api/tle/:noradId            - Get TLE data for satellite
POST /api/trajectory/calculate    - Calculate trajectory
GET  /api/orbital-elements/:noradId - Get orbital elements
```

### Database Models

#### Satellite Model

```javascript
{
  noradId: Number,
  name: String,
  tle: {
    line1: String,
    line2: String
  },
  orbitType: String, // LEO, MEO, GEO, POLAR
  launchDate: Date,
  status: String, // ACTIVE, DECAYED, etc.
  details: {
    altitude: Number,
    inclination: Number,
    eccentricity: Number,
    period: Number
  }
}
```

#### Trajectory Model

```javascript
{
  name: String,
  launchDate: Date,
  parameters: {
    launchLat: Number,
    launchLong: Number,
    targetAltitude: Number,
    inclination: Number,
    deltaV: Number
  },
  trajectoryPoints: [{
    x: Number,
    y: Number,
    z: Number,
    timestamp: Date
  }]
}
```

## 6. Orbital Mechanics Calculations

### Kepler's Laws Implementation

- Semi-major axis calculation
- Orbital period: T = 2π√(a³/μ)
- Velocity: v = √(μ(2/r - 1/a))
- Altitude from radius: h = r - Re (Earth radius = 6371 km)

### Orbit Types Classification

- **LEO:** 200 - 2,000 km (Period: 90-120 min)
- **MEO:** 2,000 - 35,786 km (Period: 2-24 hours)
- **GEO:** ~35,786 km (Period: 24 hours, equatorial)
- **Polar:** High inclination (>80°), sun-synchronous

### TLE (Two-Line Element) Parsing

- Extract orbital elements from TLE format
- Calculate mean motion, eccentricity, inclination
- Propagate position using SGP4 algorithm

## 7. Sample Satellite Dataset

Include 20 sample satellites:

- ISS (ZARYA) - LEO
- Hubble Space Telescope - LEO
- Starlink satellites (5) - LEO
- GPS satellites (3) - MEO
- GLONASS satellites (2) - MEO
- Galileo satellites (2) - MEO
- GOES-16 - GEO
- InmarSAT - GEO
- Landsat satellites (2) - Polar
- Sentinel satellites (2) - Polar

## 8. Project Structure

```
Satellite-Orbit-and-Trajectory-Visualizer/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── satelliteController.js
│   │   │   └── trajectoryController.js
│   │   ├── models/
│   │   │   ├── Satellite.js
│   │   │   └── Trajectory.js
│   │   ├── routes/
│   │   │   ├── satelliteRoutes.js
│   │   │   └── trajectoryRoutes.js
│   │   ├── services/
│   │   │   ├── celestrakService.js
│   │   │   └── orbitalCalcService.js
│   │   ├── data/
│   │   │   └── sampleSatellites.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Earth.jsx
│   │   │   ├── Satellite.jsx
│   │   │   ├── OrbitPath.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── TrajectoryCalculator.jsx
│   │   ├── context/
│   │   │   └── SatelliteContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── orbitalCalculations.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
├── README.md
└── SPEC.md
```

## 9. Acceptance Criteria

### Functional Requirements

- [ ] 3D Earth renders with proper textures
- [ ] At least 20 satellites displayed with orbits
- [ ] Orbit paths colored by type (LEO, MEO, GEO, Polar)
- [ ] Click satellite to see details in dashboard
- [ ] Real-time position updates (simulated)
- [ ] Orbit filter works correctly
- [ ] Search finds satellites by name/NORAD ID
- [ ] Trajectory calculator produces valid output
- [ ] API endpoints return correct data

### Visual Requirements

- [ ] Dark space theme with accent colors
- [ ] Smooth camera controls
- [ ] Orbit paths visible but not overwhelming
- [ ] Dashboard displays all required metrics
- [ ] Responsive layout works on different sizes

### Performance Requirements

- [ ] Initial load < 5 seconds
- [ ] Smooth 30+ FPS animation
- [ ] API response < 500ms

## 10. Instructions to Run

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure MongoDB connection
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/satellite-tracker
CELESTRAK_URL=https://celestrak.org/NORAD/elements/
```
