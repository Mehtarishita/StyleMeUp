# StyleMeUp: AI-Powered Fashion Studio

StyleMeUp is a modern, full-stack web application designed to revolutionize the way you discover, try, and shop for fashion. Built with React and Express, it integrates deeply with AI (via Google Gemini Vision and Text models) to offer personalized outfit recommendations, interactive AI styling chats, and virtual try-on features.

## Architecture Overview

```ascii
                          +-------------------------+
                          |      Client (Vite)      |
                          |   React + Context API   |
                          |   Tailwind + Vanilla CSS|
                          +-----------+-------------+
                                      | HTTP / REST
                                      v
                          +-------------------------+
                          |     Server (Node.js)    |
                          | Express.js + Mongoose   |
                          |   JWT Authentication    |
                          +----+---------------+----+
                               |               |
             Mongoose / Native |               | REST (Gemini API)
                               v               v
                +-----------------+     +-----------------+
                | MongoDB Cluster |     |  Google Gemini  |
                | (Atlas / Local) |     |  AI Platform    |
                +-----------------+     +-----------------+
```

### Key Components
- **Client**: A robust Single Page Application (SPA) providing real-time AI chats, dynamic product grids with skeleton loaders, dark mode, and an Admin Dashboard.
- **Server**: A scalable REST API built with Express handling user auth, product management, order processing, and acting as a secure proxy to the Gemini AI models.
- **AI Integrations**:
  - **Outfit Generator (`/api/ai/outfit-generator`)**: Crafts complete looks based on constraints (e.g., budget, occasion).
  - **Chat Stylist (`/api/ai/stylist-chat`)**: A multi-turn conversational AI that queries the product catalog and recommends real products inline.
  - **Visual Try-On / Image Search (`/api/ai/image-search`)**: Extracts attributes from uploaded images using Gemini Vision to find visually similar items in the catalog.

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local instance or an Atlas URI)
- A Google Gemini API Key

### 1. Server Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory (see Environment Variables below).
4. Start the backend: `npm start` (Runs on port 5000 by default).
   - *Note: On the first run, the server will automatically seed the database with mock products, categories, and an Admin user (`admin@stylemeup.com` / `admin123`).*

### 2. Client Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `client` directory (see Environment Variables below).
4. Start the frontend: `npm run dev` (Runs on port 5173 by default).

## Environment Variables

### Server (`server/.env`)
```env
PORT=5000
# Leave as localhost or replace with your MongoDB Atlas connection string
MONGO_URI=mongodb://127.0.0.1:27017/stylemeup 
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
# Required for all AI features to function
GEMINI_API_KEY=your_google_gemini_api_key 
```

### Client (`client/.env`)
```env
# Optional, defaults to http://localhost:5000 in dev
VITE_API_URL=http://localhost:5000 
```

## Mocked vs Real Data
- **Real**: 
  - Authentication (JWT with bcrypt password hashing).
  - AI Recommendations (Powered by live calls to Gemini).
  - Database operations (Persisted in MongoDB).
  - Product matching algorithm (Vector/attribute matching logic on the backend).
- **Mocked**:
  - Payments. The checkout process simulates a successful order generation without communicating with a payment gateway (e.g., Stripe).
  - Emails. Registration and order confirmation emails are simulated via server logs.

## Deployment Guide

### Deploying the Client (Vercel)
1. Push your code to GitHub.
2. Go to Vercel and import the repository.
3. Set the **Framework Preset** to `Vite`.
4. Ensure the **Root Directory** is set to `client`.
5. Add the Environment Variable: `VITE_API_URL` pointing to your deployed backend URL.
6. Click Deploy. (The `vercel.json` included handles SPA routing).

### Deploying the Server (Render or Railway)
1. In your Render Dashboard, click **New > Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add the Required Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `GEMINI_API_KEY`). Ensure `MONGO_URI` points to a live MongoDB Atlas cluster.
7. Click Deploy. (The `render.yaml` blueprint is also included).

---
*Built with love for the future of fashion.*
