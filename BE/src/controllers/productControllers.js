import mongoose, { Error } from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

// lay danh sach kem bien the

const getListProduct = async (req, res, next) => {
  try {
    // const products = await Product.aggregate([
    //   {
    //     $match: {
    //       isHidden: false,
    //       deleteAt: null,
    //     },
    //   }, // $match : loc cac san pham
    //   {
    //     $lookup: {
    //       from: "categories",
    //       localField: "categoryId",
    //       foreignField: "_id",
    //       as: "category",
    //     }, // $lookup: lay thong tin danh muc tu categories
    //   },
    //   {
    //     $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
    //   }, // $unwind: chuyen mang danh muc thanh object
    //   {
    //     $lookup: {
    //       from: "productvariants",
    //       localField: "_id",
    //       foreignField: "productId",
    //       as: "variants",
    //     },
    //   }, // tim cac bien the cua sp dua tren productId
    //   {
    //     $unwind: { path: "$variants", preserveNullAndEmptyArrays: true },
    //   }, // tach bien the ra thanh tung object
    //   {
    //     $group: {
    //       _id: "$_id",
    //       title: { $first: "$title" },
    //       categoryId: { $first: "$categoryId" },
    //       description: { $first: "$description" },
    //       slug: { $first: "$slug" },
    //       totalStock: { $sum: "$variants.stock" },
    //       variants: { $push: "variants" },
    //     },
    //   }, // gom lai thanh 1 sp co danh sach bien the
    // ]); // aggregate : phuong thuc lay bien the

    const {
      _page = 1,
      _limit = 10,
      _search = "",
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    let filter = {};
    if (_search) {
      filter.title = { $regex: _search, $options: "i" };
    }

    const options = {
      page: _page,
      limit: _limit,
      populate: ["categoryId", "attributes.attributeId", "attributes.values"],
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };

    const products = await Product.paginate(filter, options);
    // .populate("categoryId", "name")
    // .populate("attributes.attributeId", "name")
    // .populate("attributes.values", "value");
    // .populate("variants");
    if (!products.docs) {
      return next(new Error("Ko tim thay san pham nao"));
    }
    return res.status(200).send({
      message: "lay danh sach san pham thanh cong",
      data: products.docs,
      pagination: {
        currentPage: products.page,
        totalPages: products.totalPages,
        totalItems: products.totalDocs,
      },
    });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.param;

    // const product = await Product.aggregate([
    //   {
    //     $match: { _id: new mongoose.Schema.Types.ObjectId(id) }, // loc sp theo id
    //   },
    //   {
    //     $lookup: {
    //       from: "productvariants",
    //       localField: "_id",
    //       foreignField: "productId",
    //       as: "variants",
    //     },
    //   }, // lay cac bien the theo id cua san pham
    //   {
    //     $unwind: {
    //       path: "$variants",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   }, // tach bien the thanh tung object
    //   {
    //     $group: {
    //       _id: "$_id",
    //       title: { $first: "$title" },
    //       categoryId: { $first: "$categoryId" },
    //       description: { $first: "$description" },
    //       slug: { $first: "$slug" },
    //       totalStock: { $sum: "$variants.stock" },
    //       variants: { $push: "$variants" },
    //     },
    //   },
    // ]);

    const product = await Product.findById(id)
      .populate("categoryId", "name")
      .populate("attributes.attributeId", "name")
      .populate("attributes.values", "value");
    // .populate("variants");

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
    const product = await Product.create(req.body);

    if (!product) {
      return res.status(400).send({ message: "them moi san pham that bai" });
    }
    return res
      .status(201)
      .send({ message: "them moi san pham thanh cong", product });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const updateByIdProduct = async (req, res) => {
  try {
    const id = req.param.id;
    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!productUpdate) {
      return res.status(404).send({ message: "ko tim thay san pham" });
    }
    return res.status(200).send({ message: "sua san pham thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const removeByIdProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).send({ message: "xoa san pham that bai" });
    }
    return res.status(200).send({ message: "xoa san pham thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const deleteSoftProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        isHidden: true,
        deleteAt: new Date(),
      },
      { new: true }
    );
    if (product) {
      return res.status(404).send({ message: "ko tim thay san pham muon xoa" });
    }
    return res.status(200).send(product);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const restoreProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        deleteAt: null,
        isHidden: false,
      },
      { new: true }
    );
    if (product) {
      return res
        .status(404)
        .send({ message: "ko tim thay san pham muon khoi phuc" });
    }
    return res.status(200).send(product);
  } catch (error) {
    errorReportServer(res, error);
  }
};
export {
  getListProduct,
  getByIdProduct,
  createProduct,
  updateByIdProduct,
  removeByIdProduct,
  deleteSoftProduct,
  restoreProduct,
};
