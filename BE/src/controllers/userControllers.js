import User from "../models/User.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllUser = async (req, res) => {
  try {
    if (req.user.role === "member") {
      return res.status(400).send("ban ko co quyen xem danh sach nguoi dung");
    }
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).send("ko tim thay danh sach nguoi dung");
    }
    return res.status(200).send(users);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send("ko tim thay tai khoan nguoi dung ban muon xoa");
    }
    return res.status(200).send({ message: "xoa thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

export { getAllUser, removeUser };
