import express from "express";
import {
  getAllAttributeValue,
  getByIdAttributeValue,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "../controllers/attributeValueControllers.js";
import validBodyRequest from "../middlewares/validBodyRequest.js";
import attributeValueSchema from "../schemas/attributeValue.js";

const attributeValueRoutes = express.Router();

attributeValueRoutes.get("/", getAllAttributeValue);
attributeValueRoutes.get("/:id", getByIdAttributeValue);
attributeValueRoutes.post(
  "/",
  validBodyRequest(attributeValueSchema),
  createAttributeValue
);
attributeValueRoutes.patch(
  "/:id",
  validBodyRequest(attributeValueSchema),
  updateAttributeValue
);
attributeValueRoutes.delete("/:id", deleteAttributeValue);

export default attributeValueRoutes;
