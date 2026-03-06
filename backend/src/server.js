import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server is listening on port:" + PORT);
});
