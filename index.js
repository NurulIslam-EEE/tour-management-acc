const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const tourRoute = require("./routes/tour.routes");
const dbConnect = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());
// database connection
let mongourl = process.env.MONGO_URI;
mongoose
  .connect(mongourl)

  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => console.log("error", err.message));

app.use("/tours", tourRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Random user running  on port ${port}`);
});
app.all("*", (req, res) => {
  res.send("No route found");
});

process.on("UnhandledRejection", (error) => {
  app.close(() => {
    process.exit(1);
  });
});
