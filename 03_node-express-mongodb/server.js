const express = require("express");
const app = express();
const mongoose = require("mongoose");

const foodRouter = require("./routes/foodRoutes");
app.use(foodRouter);

// データベース接続
mongoose
  .connect(
    "mongodb://takenari:abc@cluster0-shard-00-00.dfedf.mongodb.net:27017,cluster0-shard-00-01.dfedf.mongodb.net:27017,cluster0-shard-00-02.dfedf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8x2pda-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("データベース接続に成功しました"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("サーバーが起動しました");
});
