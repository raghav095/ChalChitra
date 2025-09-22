import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectdb from "./database/db.js";

// Import your routes
import movieRoutes from "./routes/movie.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middleware ---
// Define a list of all the frontend URLs you want to allow
const allowedOrigins = [
  process.env.FRONTEND_URL,   // Your live site (e.g., https://chalchitra.live)
  'http://localhost:5173',    // Your local Vite dev server
  'http://localhost:5174'     // Also include the other port you were using
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions)); // Use the new, more flexible options
app.use(express.json());

// --- Routes ---
app.use("/api/movies", movieRoutes);
app.use("/users", userRoutes); 

// A simple route to confirm the server is running
app.get("/", (req, res) => {
  res.send("ChalChitra backend is running!");
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