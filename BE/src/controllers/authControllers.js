import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../configs/config.env.js";

const register = async (req, res) => {
  try {
    /**
     * Bước 1: Kiểm tra email đã đăng ký chưa
     * Bước 2: Mã hoá mật khẩu: bcrypt, bcryptjs
     * Bước 3: Lưu thông tin đăng ký vào database.
     * Bước 4: Thông báo thành công
     *
     * Lưu ý:
     * - Nếu đăng ký mà cho phép người dùng đăng nhập luôn thì cần tạo token và đưa vào cookie hoặc trả token cho người dùng.
     * - Nếu muốn xác thực email, thì gửi email (nodemailer) cho người dùng để kích hoạt.
     *
     * 	 */

    const { email, password, role } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .send({ message: "tai khoan da dang ki, vui long dang nhap" });
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = await User.create({
      ...req.body,
      email,
      password: hashPassword,
      role: role || "member",
    });
    return res.status(200).send({ message: "dang ky thanh cong" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

const login = async (req, res) => {
  try {
    /**
     * Bước 1: Kiểm tra email đã đăng ký chưa?
     * Bước 2: Từ email đã find được user, compare password.
     * Bước 3: Sign JWT (cài đặt jwt)
     * Bước 4: Sử dụng 1 trong các phương thức được học để duy trì trạng thái đăng nhập cho người dùng.
     * Bước 5: Sử dụng redis để lưu refresh token
     * Bước 5: Thông báo.
     */

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .send({ message: "tai khoan ko ton tai , vui long dang ki" });
    }

    const checkPassword = bcryptjs.compareSync(password, userExists.password);
    if (!checkPassword) {
      return res.status(400).send({ message: "mat khau ko chinh xac" });
    }

    const accessToken = jwt.sign(
      {
        _id: userExists._id,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    userExists.password = undefined;
    return res.status(200).json({
      message: "Dang nhap thanh cong",
      accessToken,
      user: userExists,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

export { register, login };
