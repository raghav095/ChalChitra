import dotenv from "dotenv";
import app from "./app.js";
import connectdb from "./database/db.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});


















