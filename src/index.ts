// initialization dotenv
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Routes
import authRouter from "./routes/auth.route";
import newsRouter from "./routes/news.route";
import adminRoute from "./routes/admin.route";
import ustadRoute from "./routes/ustad.route";
import studentRouter from "./routes/student.route";
import alumniRoute from "./routes/alumni.route";
import pamfletRoute from "./routes/pamflet.route";
import bannerRoute from "./routes/banner.route";
import fasilitasRoute from "./routes/fasilitas.route";

import { errorMiddleware } from "./middlewares/error-middleware";
import dashboardRoute from "./routes/dashboard.route";
import jumlahAlumniRoute from "./routes/jumlahAlumni.route";

// 1. Init Express
const app = express();

// 2. CORS
const allowedOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, curl
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

// 3. Cookie Parser
app.use(cookieParser());

// 4. Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Public folder
app.use(express.static(path.join(__dirname, "../public")));

// 6. Test route
app.get("/", (_req, res) => {
  res.send("Server Ready");
});

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

// 7. Routes
app.use("/api/auth", authRouter);
app.use("/api/news", newsRouter);
app.use("/api/admin", adminRoute);
app.use("/api/ustad", ustadRoute);
app.use("/api/student", studentRouter);
app.use("/api/alumni", alumniRoute);
app.use("/api/pamflet", pamfletRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/fasilitas", fasilitasRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/jumlah-alumni", jumlahAlumniRoute);

// 8. Error middleware
app.use(errorMiddleware);

// 9. Run server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
