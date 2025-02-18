import { Router } from "express";
import {
  createProduct,
  deleteSoftProduct,
  getListProduct,
  getByIdProduct,
  removeByIdProduct,
  updateByIdProduct,
} from "../controllers/productControllers.js";
import validBodyRequest from "../middlewares/validBodyRequest.js";
import productSchema from "../schemas/productSchema.js";

const productRoutes = Router();

// tao ra 1 ham kiem tra nguoi dung

productRoutes.get("/", getListProduct);
productRoutes.get("/:id", getByIdProduct);
productRoutes.post("/", validBodyRequest(productSchema), createProduct);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateByIdProduct);
productRoutes.delete("/id", removeByIdProduct);
productRoutes.patch("/soft-delete/:id", deleteSoftProduct);
productRoutes.patch("/restore/:id", removeByIdProduct);

export default productRoutes;
