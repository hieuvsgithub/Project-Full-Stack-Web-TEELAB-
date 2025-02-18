import express from "express";
import {
  createAttribute,
  deleteAttribute,
  getAllAttribute,
  getByIdAttribute,
  updateAttribute,
} from "../controllers/attributeControllers.js";
import validBodyRequest from "../middlewares/validBodyRequest.js";
import attributeSchema from "../schemas/attribute.js";

const attributeRoutes = express.Router();

attributeRoutes.get("/", getAllAttribute);
attributeRoutes.get("/:id", getByIdAttribute);
attributeRoutes.post("/", validBodyRequest(attributeSchema), createAttribute);
attributeRoutes.patch(
  "/:id",
  validBodyRequest(attributeSchema),
  updateAttribute
);
attributeRoutes.delete("/:id", deleteAttribute);

export default attributeRoutes;
