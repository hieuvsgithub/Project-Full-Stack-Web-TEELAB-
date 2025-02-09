import mongoose, { Error } from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

// lay danh sach kem bien the

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          isHidden: false,
          deleteAt: null,
        },
      }, // $match : loc cac san pham
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        }, // $lookup: lay thong tin danh muc tu categories
      },
      {
        $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      }, // $unwind: chuyen mang danh muc thanh object
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      }, // tim cac bien the cua sp dua tren productId
      {
        $unwind: { path: "$variants", preserveNullAndEmptyArrays: true },
      }, // tach bien the ra thanh tung object
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          categoryId: { $first: "$categoryId" },
          description: { $first: "$description" },
          slug: { $first: "$slug" },
          totalStock: { $sum: "$variants.stock" },
          variants: { $push: "variants" },
        },
      }, // gom lai thanh 1 sp co danh sach bien the
    ]); // aggregate : phuong thuc lay bien the

    if (!products) {
      return next(new Error("Ko tim thay san pham nao"));
    }
    return res.status(200).send(products);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.param;

    const product = await Product.aggregate([
      {
        $match: { _id: new mongoose.Schema.Types.ObjectId(id) }, // loc sp theo id
      },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      }, // lay cac bien the theo id cua san pham
      {
        $unwind: {
          path: "$variants",
          preserveNullAndEmptyArrays: true,
        },
      }, // tach bien the thanh tung object
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          categoryId: { $first: "$categoryId" },
          description: { $first: "$description" },
          slug: { $first: "$slug" },
          totalStock: { $sum: "$variants.stock" },
          variants: { $push: "$variants" },
        },
      },
    ]);
    if (!product) {
      return next(new Error("Ko tim thay sp"));
    }
    return res.status(200).send(product);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    let { title, price, categoryId, description } = req.body;

    if (!categoryId) {
    }
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
