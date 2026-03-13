import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDB()
  .then(() => {
    console.log("database connection established succcessfully");
    app.listen(PORT, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("cannot connect to database:", err);
  });
