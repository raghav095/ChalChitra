import dotenv from "dotenv";
dotenv.config();
console.log("GOOGLE_CLIENT_ID from index.js:", process.env.GOOGLE_CLIENT_ID);
import app from "./app.js";
import connectdb from "./database/db.js";

// Load environment variables

const PORT = process.env.PORT || 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});


















