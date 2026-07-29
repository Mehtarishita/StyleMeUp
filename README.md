<div align="center">
  <img src="docs/images/home.png" alt="StyleMeUp Banner" width="100%" />

  # 👗 StyleMeUp: Your AI-Powered Fashion Studio

  *Revolutionize the way you discover, try, and shop for fashion using Artificial Intelligence.*

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

</div>

---

## 🌟 Overview

**StyleMeUp** is a modern, full-stack e-commerce web application with a twist: it integrates deeply with Google's Gemini Vision and Text AI models. Rather than just scrolling through endless product grids, users can interact with an AI stylist, generate customized outfits based on their budget and occasion, and visually search for clothes using their own uploaded photos. 

It comes fully featured with an Admin Dashboard, full user authentication, shopping carts, wishlists, and a gorgeous dark mode toggle to switch the aesthetics on the fly.

---

## ✨ Key Features

- 🧠 **AI Chat Stylist:** A multi-turn conversational AI that queries the product catalog and recommends real products to the user inline.
- 🎨 **Outfit Generator:** Crafts complete head-to-toe looks based on your budget, occasion, and style constraints.
- 📸 **Visual Try-On & Image Search:** Upload a photo of a clothing item you love, and the Gemini Vision AI extracts attributes to find visually similar items in the catalog!
- 🛒 **Full E-Commerce Flow:** Shopping cart, wishlist management, robust mock-checkout flow, and order tracking.
- 🛡️ **Admin Dashboard:** A secured portal (`/admin`) for store managers to add products, manage user roles, and update order statuses.
- 🌗 **Beautiful UI/UX:** Features a custom CSS design system, persistent dark mode, skeleton loaders, and a responsive layout that feels like a premium fashion app.

<div align="center">
  <img src="docs/images/ai-stylist.png" alt="AI Stylist Chat Interface" width="80%" style="border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); margin: 20px 0;" />
  <p><em>The interactive AI Stylist recommending products in real-time.</em></p>
</div>

---

## 🏗️ Architecture

```ascii
                          +-------------------------+
                          |      Client (Vite)      |
                          |   React + Context API   |
                          |   Custom CSS Variables  |
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

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or an Atlas URI)
- **Google Gemini API Key** (Required for the AI features)

### 1. Backend Server Setup
1. Open a terminal and navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory (see [Environment Variables](#environment-variables)).
4. Start the backend: `npm start` 
   - *Note: On the first run, the server will automatically seed the database with mock products, categories, and an Admin user (`admin@stylemeup.com` / `admin123`).*

### 2. Frontend Client Setup
1. Open a new terminal and navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `client` directory.
4. Start the development server: `npm run dev` 

The application should now be running at **`http://localhost:5173`**!

---

## 🔐 Environment Variables

### Server (`server/.env`)
```env
PORT=5000
# Replace with your MongoDB Atlas connection string if deploying
MONGO_URI=mongodb://127.0.0.1:27017/stylemeup 
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
# Required for all AI features to function
GEMINI_API_KEY=your_google_gemini_api_key 
```

### Client (`client/.env`)
```env
# Point this to your backend server
VITE_API_URL=http://localhost:5000 
```

---

## 📝 Data Details: Mocked vs Real
- **Real (Fully Functional)**: 
  - Authentication (JWT with bcrypt password hashing).
  - AI Recommendations (Powered by live calls to Gemini).
  - Database operations (Persisted in MongoDB).
  - Dark Mode (Saved to localStorage).
- **Mocked (Simulated)**:
  - Payments: The checkout process simulates a successful order without hitting a real gateway (e.g., Stripe).
  - Emails: Registration and order confirmation emails are simulated via server terminal logs.

---

## ☁️ Deployment Guide

### Deploying the Client (Vercel)
1. Push your code to GitHub.
2. Go to Vercel and import the repository.
3. Set the **Framework Preset** to `Vite`.
4. Ensure the **Root Directory** is set to `client`.
5. Add the Environment Variable: `VITE_API_URL` pointing to your deployed backend URL.
6. Click Deploy. *(The included `vercel.json` automatically handles SPA routing).*

### Deploying the Server (Render or Railway)
1. In your Render Dashboard, click **New > Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add the Required Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `GEMINI_API_KEY`).
7. Click Deploy. *(The included `render.yaml` blueprint automates this process).*

---
<div align="center">
  <i>Built with ❤️ for the future of fashion.</i>
</div>
