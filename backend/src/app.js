import express from "express";
import movieRoutes from "./routes/movie.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.send("MoviesMania backend is running!");
});






export default app;

