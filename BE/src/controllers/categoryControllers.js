import Product from "../models/Product.js";
import Category from "../models/Category.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
const getByIdCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
const createCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
const removeCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
const deleteSoftCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};
const restoreCategory = async (req, res) => {
  try {
  } catch (error) {
    errorReportServer(res, error);
  }
};

export {
  getAllCategory,
  getByIdCategory,
  createCategory,
  updateCategory,
  removeCategory,
  deleteSoftCategory,
  restoreCategory,
};
