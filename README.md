# Inspectr MVP 1.0

A two‑tier “ScanSeries‑style” inspection platform:  

* **backend/** – NestJS + PostgreSQL REST API  
* **mobile/** – Expo React‑Native inspection app   

## Quick start (dev)

```bash
# 0. Prereqs
#    Node >= 18, npm >= 9, Docker & docker‑compose

# 1. Spin up Postgres
docker compose up -d db

# 2. Install & run backend
cd backend
npm i
npm run start:dev   # http://localhost:3000

# 3. Install & run mobile (another terminal)
cd ../mobile
npm i
npx expo start       # scan QR in Expo Go
```

The mobile app queues barcode scans offline in SQLite and `POST /sync`’s
them to the backend when connectivity is restored. The backend upserts
each observation then triggers automatic completion checks & PDF queue
(stubs).

**Important:** This is an MVP for learning; hard‑codes JWT secret,
allows CORS `*`, and omits paging/validation rules you’ll want in prod.
