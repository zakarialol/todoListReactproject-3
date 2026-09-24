const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
// this for form register register
app.post("/register", (req, res) => {
  console.log("connected....");
  console.log(req.body, "req.body");
  res.status(200).json({
    succes: true,
  });
});
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
