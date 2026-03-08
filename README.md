# Satellite Orbit and Trajectory Visualizer

A full-stack web application for 3D visualization of satellite orbits, real-time tracking, and launch trajectory simulations.

## Features

- 🌍 **3D Earth Visualization** - Interactive Three.js powered 3D Earth with realistic rendering
- 🛰️ **Satellite Orbit Simulation** - Display satellite orbital paths with accurate Keplerian mechanics
- 📡 **Real-time Tracking** - Live satellite position updates
- 🎯 **Orbit Type Visualization** - Color-coded orbits (LEO, MEO, GEO, Polar)
- 🔬 **CelesTrak Integration** - Fetch satellite data from CelesTrak API
- 🚀 **Trajectory Calculator** - Launch simulation with delta-V and fuel calculations
- 📊 **Dashboard** - Real-time metrics (altitude, velocity, orbital period, position)

## Tech Stack

### Frontend

- React.js 18
- Three.js + React Three Fiber
- Tailwind CSS

### Backend

- Node.js + Express.js
- MongoDB + Mongoose

## Project Structure

```
Satellite-Orbit-and-Trajectory-Visualizer/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # Express routes
│   │   ├── services/      # Orbital calculations
│   │   ├── data/          # Sample satellite data
│   │   └── server.js      # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── utils/         # Calculations
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── SPEC.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas cloud)
- npm or yarn

### Installation

1. **Clone the repository**

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Configuration

1. **Configure Backend**

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/satellite-tracker
   NODE_ENV=development
   ```

   Or use MongoDB Atlas:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/satellite-tracker
   ```

### Running the Application

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```

2. **Start Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The API will run on `http://localhost:5000`

3. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

   The application will open at `http://localhost:3000`

### Seeding Sample Data

The application will automatically seed sample satellites on first run. To manually seed:

```bash
curl -X POST http://localhost:5000/api/satellites/seed
```

Or use the "Load Sample Data" button in the sidebar.

## API Endpoints

### Satellites

| Method | Endpoint                        | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| GET    | `/api/satellites`               | Get all satellites (paginated)  |
| GET    | `/api/satellites/:noradId`      | Get satellite by NORAD ID       |
| GET    | `/api/satellites/visualization` | Get satellites with orbit paths |
| GET    | `/api/satellites/orbit/:type`   | Get satellites by orbit type    |
| POST   | `/api/satellites/search`        | Search satellites               |
| POST   | `/api/satellites/seed`          | Seed database with samples      |

### Trajectory

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| POST   | `/api/trajectory/calculate` | Calculate launch trajectory |
| GET    | `/api/trajectory`           | Get all trajectories        |
| GET    | `/api/trajectory/:id`       | Get trajectory by ID        |

## Sample Satellites Included

The application includes 20+ sample satellites:

- **LEO**: ISS, Hubble Space Telescope, Starlink satellites
- **MEO**: GPS, GLONASS, Galileo navigation satellites
- **GEO**: GOES weather satellites, Inmarsat
- **Polar**: Landsat, Sentinel Earth observation satellites

## Orbital Mechanics

The application implements:

- **Kepler's Laws** - Orbital period, velocity calculations
- **Kepler's Equation** - Mean to eccentric anomaly conversion
- **Orbital Elements** - Semi-major axis, eccentricity, inclination, RAAN
- **Coordinate Transforms** - ECI, ECEF, geodetic conversion
- **Hohmann Transfer** - Delta-V calculations for orbit insertion

## Deployment

### Production Build

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

### Environment Variables

| Variable       | Description               | Default                   |
| -------------- | ------------------------- | ------------------------- |
| `PORT`         | Server port               | 5000                      |
| `MONGODB_URI`  | MongoDB connection string | localhost                 |
| `NODE_ENV`     | Environment               | development               |
| `VITE_API_URL` | Backend API URL           | http://localhost:5000/api |

## License

MIT License

## Credits

- Satellite data from [CelesTrak](https://celestrak.org/)
- Orbital calculations based on [SGP4](https://en.wikipedia.org/wiki/SGP4) simplified perturbation model
