import express from "express";
import Movie from "../models/movie.model.js";
const router = express.Router();

// Movie API routes
router.get("/add", async (req, res) => {
  try {
    const movie = new Movie({ title: "Sample Movie", year: 2025 });
    await movie.save();
    res.json({ success: true, movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
