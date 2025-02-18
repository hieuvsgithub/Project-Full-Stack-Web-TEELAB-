import { Router } from "express";
import productRoutes from "./productRouter.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from "./authRoutes.js";
import attributeRoutes from "./attributeRoutes.js";
import attributeValueRoutes from "./attributeValueRoutes.js";
import variantRoutes from "./variantRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();
routes.use("/products", productRoutes);
routes.use("/categories", categoryRoutes);
routes.use("/auth", authRoutes);
routes.use("/attribute", attributeRoutes);
routes.use("/attribute-value", attributeValueRoutes);
routes.use("/variants", variantRoutes);
routes.use("/user", userRoutes);

export default routes;
