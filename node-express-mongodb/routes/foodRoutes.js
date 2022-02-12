const express = require("express");
const app = express();
const foodModel = require("../models/Food");

app.use(express.json());
// データの取得
app.get("/foods", async (req, res) => {
  // データベースの中のデータを全て返す
  const foods = await foodModel.find({});

  try {
    res.send(foods);
    console.log(foods);
  } catch (err) {
    res.status(500).send(err);
    console.log("エラーだよーん", err);
  }
});

// データの作成
app.post("/food", async (req, res) => {
  // データベースの中のデータを全て返す
  const food = new foodModel(req.body);

  try {
    await food.save();
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
});

// データの部分修正
app.patch("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndUpdate(req.params.id, req.body);
    await foodModel.save();
  } catch (err) {
    res.status(500).send(err);
  }
});

// データの削除
app.delete("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
