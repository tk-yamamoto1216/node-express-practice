// imports
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

// database connection
// データベース接続
// 接続先は必要に応じて変えてください！
mongoose
  .connect(
    "mongodb://takenari:abc@cluster0-shard-00-00.dfedf.mongodb.net:27017,cluster0-shard-00-01.dfedf.mongodb.net:27017,cluster0-shard-00-02.dfedf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8x2pda-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("データベース接続に成功しました"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`server running at localhost:${port}`));
