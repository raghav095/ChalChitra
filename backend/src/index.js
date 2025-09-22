import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectdb from "./database/db.js";
import movieRoutes from "./routes/movie.routes.js";

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

// --- Routes ---
app.use("/api/movies", movieRoutes);
// ALL USER AND AUTH ROUTES HAVE BEEN REMOVED FOR THIS TEST

// This message is our proof that the new code is live
app.get("/", (req, res) => {
  res.send("Backend VERSION 3 - AUTH DISABLED");
});

// --- Connect to Database and Start Server ---
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGO db connection failed !!! ", err);
    process.exit(1);
  });