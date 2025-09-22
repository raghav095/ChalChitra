import express from "express";
import movieRoutes from "./routes/movie.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import session from "express-session";
import passport from "./auth/googleauth.js";

const app = express();

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
    // Successful authentication, redirect or respond as needed
    res.redirect("/"); // or send a JWT, etc.
  }
);

app.get("/", (req, res) => {
  res.send("MoviesMania backend is running!");
});

export default app;

