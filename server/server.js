import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 FORCE LOAD .env FROM CORRECT PATH
dotenv.config({ path: path.join(__dirname, ".env") });
console.log("ENV CHECK:", process.env.GROQ_API_KEY);
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express();

// 🔥 VERY IMPORTANT
app.use(cors());
app.use(express.json());

// ✅ Route
app.use("/api/chat", chatRoutes);

const PORT = 5000;
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
