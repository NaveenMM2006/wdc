import express from "express";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import noticeRoutes from "./routes/notice.routes.js";



app.use(cors());

app.use("/auth", authRoutes);
app.use("/faculties", facultyRoutes);
app.use("/admin", adminRoutes);
app.use("/notices",noticeRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;