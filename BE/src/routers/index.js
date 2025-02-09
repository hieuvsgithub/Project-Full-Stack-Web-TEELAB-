import { Router } from "express";
import productRoutes from "./productRouter.js";
import categoryRoutes from "./categoryRouter.js";
import authRoutes from "./authRouter.js";
import attributeRoutes from "./attributeRoutes.js";
import attributeValueRoutes from "./attributeValueRoutes.js";

const routes = Router();
routes.use("/products", productRoutes);
routes.use("/category", categoryRoutes);
routes.use("/auth", authRoutes);
routes.use("/attribute", attributeRoutes);
routes.use("/attributevalue", attributeValueRoutes);

export default routes;
