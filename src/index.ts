// initialization dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Middlewares

// Routes
import authRouter from "./routes/auth.route";
import newsRouter from "./routes/news.route";
import adminRoute from "./routes/admin.route";
import ustadRoute from "./routes/ustad.route";
import studentRouter from "./routes/student.route";
import alumniRoute from "./routes/alumni.route";
import pamfletRoute from "./routes/pamflet.route";
import connect from "./lib/db";
import { errorMiddleware } from "./middlewares/error-middleware";

async function initializeDB() {
  try {
    // 1. Connect to MongoDB Atlas
    await connect();
    console.log("MongoDB connected!");

    // 2. Init Express
    const app = express();

    // 3. CORS
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    // 4. Cookie Parser
    app.use(cookieParser());

    // 5. Body Parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 6. Public folder
    app.use(express.static(path.join(__dirname, "../public")));

    // 7. Test route
    app.get("/", (_req, res) => {
      res.send("Hello World! (MongoDB Ready)");
    });

    // 8. Routes
    app.use("/api/auth", authRouter);
    app.use("/api/news", newsRouter);
    app.use("/api/admin", adminRoute);
    app.use("/api/ustad", ustadRoute);
    app.use("/api/student", studentRouter);
    app.use("/api/alumni", alumniRoute);
    app.use("/api/pamflet", pamfletRoute);

    // 9. Error middleware
    app.use(errorMiddleware);

    // 10. Run server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to initialize DB:", error);
  }
}

// Run initialize
initializeDB();
