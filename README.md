# Amusic 🎵

A full-stack music streaming web app where users can discover, stream, and share music.

**Live:** [https://amusic-omega.vercel.app](https://amusic-omega.vercel.app)

![Amusic Screenshot](https://github.com/user-attachments/assets/fbcb750e-5f09-4bf1-b8c9-3f3a2bfecd67)

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, React Router, MUI, Axios  |
| Backend  | Node.js, Express 5, Mongoose        |
| Database | MongoDB Atlas                       |
| Auth     | JWT (jsonwebtoken + bcryptjs)        |
| Deploy   | Vercel (frontend), Render (backend) |

## Project Structure

```
Amusic/
├── backend/
│   ├── index.js          # Express server, routes, JWT auth
│   ├── models/user.js    # Mongoose user schema with password hashing
│   ├── .env.example      # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js              # Router (/, /login, /register, /home)
│   │   ├── index.js            # React entry point
│   │   ├── context/ThemeContext.jsx  # Dark mode context
│   │   ├── components/
│   │   │   ├── LandingPage.jsx # Marketing page
│   │   │   ├── Login.jsx       # Login form
│   │   │   ├── Register.jsx    # Registration form
│   │   │   ├── Home.jsx        # Music dashboard
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   ├── Sidebar.jsx     # Library sidebar
│   │   │   ├── Hero.jsx        # Hero banner
│   │   │   ├── MusicCard.jsx   # Song card with audio player
│   │   │   ├── Footer.jsx      # Footer
│   │   │   └── Darkmode.jsx    # Theme toggle button
│   │   └── assets/Data/musicData.js  # Song data
│   ├── .env.example
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB Atlas account (free tier works)

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/Amusic.git
   cd Amusic
   ```

2. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Fill in MONGODB_URI and JWT_SECRET in .env
   npm install
   npm start
   ```

3. **Frontend**
   ```bash
   cd frontend
   cp .env.example .env
   # Set REACT_APP_API_URL=http://localhost:3001
   npm install
   npm start
   ```

The app runs at `http://localhost:3000` with the API at `http://localhost:3001`.

### Environment Variables

**Backend (`.env`)**
| Variable     | Description                    |
|--------------|--------------------------------|
| MONGODB_URI  | MongoDB Atlas connection string|
| JWT_SECRET   | Secret key for signing JWTs    |
| PORT         | Server port (default: 3001)    |

**Frontend (`.env`)**
| Variable           | Description                         |
|--------------------|-------------------------------------|
| REACT_APP_API_URL  | Backend URL (default: Render URL)   |

## API Endpoints

| Method | Route      | Auth     | Description              |
|--------|------------|----------|--------------------------|
| POST   | /register  | Public   | Create account, get token |
| POST   | /login     | Public   | Login, get token          |
| GET    | /me        | Required | Get current user profile  |

## Deployment

- **Frontend:** Push to GitHub → connect to Vercel → set `REACT_APP_API_URL` env var
- **Backend:** Push to GitHub → connect to Render → set `MONGODB_URI`, `JWT_SECRET`, `PORT` env vars
