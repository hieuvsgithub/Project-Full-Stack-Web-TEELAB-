import mongoose, { Error } from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({ isHidden: false }).populate(
      "categoryId",
      "title"
    );
    if (!products.length) {
      return res.status(404).send({ message: "ko tim thay san pham nao" });
    }
    return res
      .status(200)
      .send({ message: "Lay thanh cong danh sach san pham", products });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdProduct = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};

const createProduct = async (req, res, next) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};

const updateByIdProduct = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};

const removeByIdProduct = async (req, res) => {};

const deleteSoftProduct = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};

const restoreProduct = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
export {
  getAllProduct,
  getByIdProduct,
  createProduct,
  updateByIdProduct,
  removeByIdProduct,
  deleteSoftProduct,
  restoreProduct,
};
