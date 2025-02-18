import { Router } from "express";
import {
  getAllCategory,
  getByIdCategory,
  createCategory,
  updateCategory,
  removeCategory,
  deleteSoftCategory,
  restoreCategory,
} from "../controllers/categoryControllers.js";
import validBodyRequest from "../middlewares/validBodyRequest.js";
import categorySchema from "../schemas/categorySchema.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategory);
categoryRoutes.get("/:id", getByIdCategory);
categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.patch("/:id", validBodyRequest(categorySchema), updateCategory);
categoryRoutes.delete("/:id", removeCategory);
categoryRoutes.patch("/soft-delete/:id", deleteSoftCategory);
categoryRoutes.patch("/restore/:id", restoreCategory);

export default categoryRoutes;
