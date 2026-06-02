import 'dotenv/config'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ES Module dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================

app.use(express.json());
app.use(cors());

// ================= API ROUTES =================

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use("/images", express.static("uploads"));

// ================= STATIC FILES =================

// Admin panel
app.use(
  "/admin",
  express.static(path.join(__dirname, "../Admin/dist"))
);

// Frontend
app.use(
  express.static(path.join(__dirname, "../Frontend/dist"))
);

// ================= ADMIN ROUTES =================

app.get("/admin/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Admin/dist/index.html")
  );
});

// ================= FRONTEND ROUTES =================

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Frontend/dist/index.html")
  );
});

// ================= SERVER =================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server Running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();