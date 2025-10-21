import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./auth/googleauth.js";
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
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    dbName: process.env.DB_NAME,
    collectionName: "sessions",
  }),
  cookie: {
    secure: true,
    sameSite: "none",
  }
}));

app.use(passport.initialize());
app.use(passport.session());


// --- Routes ---
// These are public and do not require login
app.use("/api/movies", movieRoutes);

// These routes may contain a mix of public (register) and private (logout) routes
app.use("/users", userRoutes); 
app.use((err, req, res, next) => {
  res.status(err.statuscode || 500).json({
    success: false,
    message: err.message || "Server error",
    errors: err.errors || [],
    stack: err.stack || "",
    data: err.data || null
  });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/mainpage`);
  }
);

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