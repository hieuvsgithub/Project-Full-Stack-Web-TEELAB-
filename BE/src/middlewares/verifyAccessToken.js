import jwt from "jsonwebtoken";
import env from "../config/config.env.js";

// phan quyen
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).send("Mã thông báo không hợp lệ");
        }

        req.user = user;
        next();
      });
    } else {
      return res.status(401).send("ban chua xac thuc");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Đã xảy ra lỗi máy chủ");
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      console.log(req.user);
      return res.status(403).send("ban ko co quyen xoa nguoi khac");
    }
  });
};

export { verifyToken, verifyTokenAndAdmin };
