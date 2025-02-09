import express from "express";
import {
  createAttribute,
  deleteAttribute,
  getAllAttribute,
  getByIdAttribute,
  updateAttribute,
} from "../controllers/attributeControllers";

const attributeRoutes = express.Router();

attributeRoutes.get("/", getAllAttribute);
attributeRoutes.get("/:id", getByIdAttribute);
attributeRoutes.post("/", createAttribute);
attributeRoutes.patch("/:id", updateAttribute);
attributeRoutes.delete("/:id", deleteAttribute);

export default attributeRoutes;
