const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db.js");
const PORT = process.env.PORT;


app.use(express.json());
connectDB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
