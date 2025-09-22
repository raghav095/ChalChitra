import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // 1. IMPORT cookie-parser
import connectdb from "./database/db.js";

// Import your routes
import movieRoutes from "./routes/movie.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middleware ---
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174'
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // 2. USE cookie-parser BEFORE your routes

// --- Routes ---
app.use("/api/movies", movieRoutes);
app.use("/users", userRoutes); 

// A simple route to confirm the server is running
app.get("/", (req, res) => {
  res.send("ChalChitra Backend - LATEST VERSION - IS LIVE!");
});

// --- Connect to Database and Start Server ---
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGO db connection failed !!! ", err);
    process.exit(1);
  });