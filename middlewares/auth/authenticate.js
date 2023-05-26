const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("authorization");
  try {
    const decode = jwt.verify(token, "thien-tan");
    if (decode) {
      req.user = decode; // cho nay la de ghi nho user la doi tuong nao
      return next();
    } else {
      res.status(401).send("ban chua dang nhap");
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  authenticate,
};
