const express = require("express");
const mongoose = require("mongoose");
const formRouter = require("./routes/formRoutes.js");
const connectToMongo = require("./utils/connectToMongo.js");

const app = express();
connectToMongo();
app.use(express.json());
app.use("/api/forms", formRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => console.log("App started at port 3000"));
