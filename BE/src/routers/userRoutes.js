import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/verifyAccessToken.js";
import { getAllUser, removeUser } from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get("/", verifyToken, getAllUser);
userRoutes.delete("/:id", verifyTokenAndAdmin, removeUser);

export default userRoutes;
