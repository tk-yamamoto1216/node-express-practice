// imports
const e = require("express");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 5000;

app.use(express.json());

const users = [
  {
    id: 1,
    username: "John",
    password: "John11234",
    isAdmin: true,
  },
  {
    id: 2,
    username: "Jane",
    password: "Jane332",
    isAdmin: false,
  },
];

app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "mySecretKey",
      { expiresIn: "20s" }
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json("username or password incorrect");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
});

app.listen(port, () => console.log(`server running at localhost:${port}`));
