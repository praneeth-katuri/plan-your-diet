const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dietRoutes = require("./routes/diet.routes");
const config = require("./config");

const app = express();
//Middleware
app.use(express.json());
app.use(
  cors({
    origin: config.app.frontendUrl,
    credentials: true,
  })
);
app.use(cookieParser());

// Routes here
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/diet", dietRoutes);

// route to prevent render from shutting down
app.get("/api/ping", (req, res) => {
  res.status(200).send("pong");
});

module.exports = app;
