import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  role: {
    type: String,
    default: "member",
    enum: ["member", "admin", "supperAdmin"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
