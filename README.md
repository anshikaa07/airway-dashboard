
# ✈ Airway Traffic Decision Dashboard
### React + Node.js + Express + MongoDB

Full-stack real-time dashboard. The backend is a Node.js/Express REST API with MongoDB. The React frontend polls the API every 5-10s to show live data.

---

## 🗂 Project Structure

```
airway-dashboard/
├── server/                        ← Node.js + Express backend
│   ├── index.js                   ← Server + live data simulator
│   ├── package.json
│   ├── .env.example               ← Copy to .env
│   ├── config/db.js               ← MongoDB connection
│   ├── models/
│   │   ├── Flight.js              ← Flight schema
│   │   ├── Airport.js             ← Airport + congestion schema
│   │   ├── WeatherAlert.js        ← Weather alert schema
│   │   └── KpiSnapshot.js         ← KPI history (7-day TTL)
│   ├── controllers/
│   │   ├── flightController.js    ← CRUD + aggregation
│   │   ├── airportController.js   ← Airport + KPI snapshots
│   │   └── weatherController.js   ← Weather alerts
│   ├── routes/
│   │   ├── flights.js             ← /api/flights
│   │   ├── airports.js            ← /api/airports
│   │   └── weather.js             ← /api/weather
│   └── seed/seedData.js           ← Populates DB with initial data
│
└── src/                           ← React frontend
    ├── services/api.js            ← All HTTP calls
    ├── hooks/useApi.js            ← Polling hook
    ├── styles/                    ← CSS variables + shared styles
    ├── data/mockData.js           ← Static fallback data
    ├── utils/helpers.js
    └── components/                ← 9 components (each has .jsx + .css)
```

---

## 🚀 Quick Start

### 1. Start MongoDB
```bash
mongod --dbpath /data/db
# Or use MongoDB Atlas (free cloud)
```

### 2. Configure & seed server
```bash
cd server
cp .env.example .env
# Edit .env: set MONGO_URI=mongodb://localhost:27017/airway_dashboard
npm install
npm run seed     # Populates MongoDB with flights, airports, weather
npm run dev      # Start Express server on :5000
```

### 3. Start React frontend
```bash
cd ..            # back to project root
npm install
npm start        # React app on :3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server + DB health |
| GET | `/api/flights` | All flights |
| GET | `/api/flights/stats/summary` | KPI aggregation |
| PUT | `/api/flights/:id` | Update flight |
| GET | `/api/airports` | All airports + congestion |
| GET | `/api/airports/kpi/snapshots` | 24h KPI history |
| GET | `/api/weather` | Active weather alerts |

---

## 🔄 Data Flow

```
MongoDB ← Live Simulator (every 5s)
   ↓
Express REST API
   ↓
React useApi hook (polls every 5-10s)
   ↓
Dashboard auto-updates
```
---

## Author

Anshika Kumar
