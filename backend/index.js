const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/user");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
  try {
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const user = await UserModel.create({ name, email, password });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

// Get current user
app.get("/me", authenticate, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── Music API Proxy ───────────────────────────────────────────

// Helper: map Deezer track to our format
function mapTrack(track) {
  return {
    id: track.id,
    title: track.title_short || track.title,
    artist: track.artist.name,
    coverUrl: track.album.cover_medium || track.album.cover,
    previewUrl: track.preview,
    duration: track.duration,
  };
}

// Search songs via Deezer
app.get("/api/songs/search", async (req, res) => {
  const { q, limit = 20 } = req.query;
  if (!q) return res.status(400).json({ message: "Query parameter 'q' is required" });
  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=${limit}`);
    const data = await response.json();
    const songs = (data.data || []).map(mapTrack);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Failed to search songs", error: err.message });
  }
});

// Get trending/popular songs — tries multiple Deezer endpoints
app.get("/api/songs/trending", async (req, res) => {
  const { limit = 20 } = req.query;
  try {
    // Strategy 1: editorial charts
    let response = await fetch(`https://api.deezer.com/editorial/0/charts`);
    let data = await response.json();
    let tracks = data.tracks?.data || [];

    // Strategy 2: if charts are empty (geo-restricted), use playlist tracks
    if (tracks.length === 0) {
      response = await fetch(`https://api.deezer.com/playlist/3155776842/tracks?limit=${limit}`);
      data = await response.json();
      tracks = data.data || [];
    }

    // Strategy 3: if still empty, search for popular terms
    if (tracks.length === 0) {
      response = await fetch(`https://api.deezer.com/search?q=top+hits+2024&limit=${limit}`);
      data = await response.json();
      tracks = data.data || [];
    }

    const songs = tracks.slice(0, limit).map(mapTrack);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trending songs", error: err.message });
  }
});

// Get full audio stream via BhariyaMusic API
app.get("/api/songs/stream/:songName", async (req, res) => {
  const { songName } = req.params;
  try {
    const prepareRes = await fetch(`https://bhindi1.ddns.net/music/api/prepare/${encodeURIComponent(songName)}`, { signal: AbortSignal.timeout(8000) });
    const prepareData = await prepareRes.json();
    const songId = prepareData.id || prepareData.song_id;
    if (!songId) return res.status(404).json({ message: "Song not found", audioUrl: null });

    const fetchRes = await fetch(`https://bhindi1.ddns.net/music/api/fetch/${songId}`, { signal: AbortSignal.timeout(8000) });
    const fetchData = await fetchRes.json();
    res.json({ audioUrl: fetchData.audio_url || `https://bhindi1.ddns.net/music/api/audio/${songId}`, songId });
  } catch (err) {
    res.status(503).json({ message: "BhariyaMusic unavailable", audioUrl: null });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
