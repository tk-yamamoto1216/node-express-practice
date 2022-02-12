const jwt = require("jsonwebtoken");
const config = require("./config");

function auth(req, res, next) {
  try {
    // 承認用トークン設定
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log(decoded);
    next();
  } catch (err) {
    return res.send(401).json({
      msg: "認証できません。",
    });
  }
}

module.exports = auth;
