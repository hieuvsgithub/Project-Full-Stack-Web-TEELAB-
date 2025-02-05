import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    discount: { type: Number }, // phan tram giam gia
    services: { type: String }, // dich vu
    description: { type: String }, // mo ta
    sizeGuide: { type: String }, // huong dan cho size
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    images: [{ type: String }], // mảng chứa URL ảnh chi tiết
    thumbnail: [{ type: String }], // ảnh đại diện
    rating: {
      average: { type: Number, default: 0 }, // điểm đánh giá trung bình
      count: { type: Number, default: 0 }, // số lượt đánh giá
    }, // xep hang
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createAt: { type: Date, default: Date.now },
      },
    ], // danh gia
    slug: { type: String, unique: true },
    variants: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" },
    isHidden: { type: Boolean, default: false },
    deleteAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
