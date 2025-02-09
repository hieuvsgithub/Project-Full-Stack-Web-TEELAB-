import express from "express";
import {
  getAllAttributeValue,
  getByIdAttributeValue,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "../controllers/attributeValueControllers";

const attributeValueRoutes = express.Router();

attributeValueRoutes.get("/", getAllAttributeValue);
attributeValueRoutes.get("/:id", getByIdAttributeValue);
attributeValueRoutes.post("/", createAttributeValue);
attributeValueRoutes.patch("/:id", updateAttributeValue);
attributeValueRoutes.delete("/:id", deleteAttributeValue);

export default attributeValueRoutes;
