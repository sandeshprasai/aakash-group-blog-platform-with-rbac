// ---------------------- IMPORTS ----------------------
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ---------------------- LOCAL MODULES ----------------------
const dbConnection = require("./DataBaseConnection");
const userRoutes = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const seedAdmin = require("./controllers/admin/seedAdmin");
const adminRouter = require("./routes/adminRoutes");

// ---------------------- INITIAL SETUP ----------------------
const app = express();
const PORT = process.env.APP_PORT || 5000;

// ---------------------- DATABASE CONNECTION ----------------------------------
const startServer = async () => {
  await dbConnection();
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// ---------------------- MIDDLEWARE ----------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aakash-group-blog-platform-with-rba.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------- ROUTES ----------------------

// Health check / root route
app.get("/", (req, res) => {
  res.send("Hello Blog Post");
});

// Auth routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/admin",adminRouter)

// ---------------------- SERVER LISTEN ----------------------
startServer();
