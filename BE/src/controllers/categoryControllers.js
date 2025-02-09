import Product from "../models/Product.js";
import Category from "../models/Category.js";
import env from "../config/config.env.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({ isHidden: false, deleteAt: null });
    if (!categories) {
      return res.status(400).send({ message: "ko tim thay danh muc nao" });
    }
    return res.status(200).send(categories);
  } catch (error) {
    errorReportServer(res, error);
  }
};
const getByIdCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(400).send({ message: "ko tim thay danh muc" });
    }
    return res.status(200).send(category);
  } catch (error) {
    errorReportServer(res, error);
  }
};
const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).send({ message: "loi ten danh muc" });
    }
    const categoryExists = await Category.findOne({ title });
    if (categoryExists) {
      return res.status(400).send({ message: "danh muc da ton tai" });
    }
    const newCategory = await Category.create({ title, description });
    return res
      .status(201)
      .send({ message: "Them danh muc thanh cong", newCategory });
  } catch (error) {
    errorReportServer(res, error);
  }
};
const updateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).send({ message: "loi ten danh muc" });
    }
    const categoryExists = await Category.findOne({ title });
    if (categoryExists) {
      return res.status(400).send({ message: "danh muc da ton tai" });
    }

    const newCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title, deleteSoftCategory },
      { new: true }
    );

    if (!newCategory) {
      return res.status(400).send({ message: "danh muc ko tin tai" });
    }
    return res.status(200).send(newCategory);
  } catch (error) {
    errorReportServer(res, error);
  }
};
const removeCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id === env.CATEGORY_ID_DEFAULT) {
      return next(new Error("ko the xoa danh muc mac dinh"));
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({ message: "ko tim thay danh muc muon xoa" });
    }
    // cap nhan san pham tu danh muc bi xoa sang danh muc mac dinh
    await Product.updateMany({
      categoryId: id,
      categoryId: env.CATEGORY_ID_DEFAULT,
    });
    // cap nhat danh muc mac dinh
    await Category.updateOne({
      _id: env.CATEGORY_ID_DEFAULT,
      $push: { products: { $each: category.products } },
    });
    return res.status(200).json(category);
  } catch (error) {
    errorReportServer(res, error);
  }
};
const deleteSoftCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        isHidden: true,
        deleteAt: new Date(),
      },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .send({ message: "ko tim thay danh muc ban muon xoa mem" });
    }
    return res.status(200).send({ message: "xoa danh muc thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};
const restoreCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        isHidden: false,
        deleteAt: null,
      },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .send({ message: "ko tim thay danh muc ban muon khoi phuc" });
    }
    return res.status(200).send({ message: "khoi phuc danh muc thanh cong" });
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
