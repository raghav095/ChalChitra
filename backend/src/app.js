import express from "express";
import cors from "cors";
import session from "express-session";
import { MongoClient } from "mongodb"; // Import the MongoClient
import passport from "./auth/googleauth.js";

import movieRoutes from "./routes/movie.routes.js";
import userRoutes from "./routes/user.routes.js";

// --- Main Function to Connect to DB and Start Server ---
async function main() {
  // Get your connection string from the environment variables
  const MONGO_URI = process.env.MONGODB_URL; 
  const client = new MongoClient(MONGO_URI);

  try {
    // 1. Connect to the MongoDB cluster
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas.");

    // 2. Get the database instance
    const db = client.db("MOVIESMANIA"); // Use your database name

    // 3. Create the Express app
    const app = express();
    
    // 4. Make the database object available to your routes
    app.locals.db = db;

    // --- All your existing middleware ---
    app.use(express.json());
    app.use(cors());
    app.use(
      session({
        secret: "your-session-secret",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // --- All your existing routes ---
    app.use("/api/movies", movieRoutes);
    app.use("/users", userRoutes);

    app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    app.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        res.redirect("/");
      }
    );
    app.get("/", (req, res) => {
      res.send("MoviesMania backend is running!");
    });

    // 5. Start the server
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process if DB connection fails
  }
}

// Run the main function to start everything
main();