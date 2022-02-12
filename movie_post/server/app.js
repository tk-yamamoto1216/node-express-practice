// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(express.static("uploads"));

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected To The Database");
  })
  .catch((err) => console.log(err));

app.use("/api/post", require("./routes/routes"));

app.listen(port, () => console.log(`server running at localhost:${port}`));
