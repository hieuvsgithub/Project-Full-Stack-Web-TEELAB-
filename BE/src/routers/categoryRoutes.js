import { Router } from "express";
import {
  getAllCategory,
  getByIdCategory,
  createCategory,
  updateCategory,
  removeCategory,
  deleteSoftCategory,
  restoreCategory,
} from "../controllers/categoryControllers";

const categoryRoutes = process.Router();

categoryRoutes.get("/", getAllCategory);
categoryRoutes.get("/:id", getByIdCategory);
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", removeCategory);
categoryRoutes.patch("/soft-delete/:id", deleteSoftCategory);
categoryRoutes.patch("/restore/:id", restoreCategory);

export default categoryRoutes;
