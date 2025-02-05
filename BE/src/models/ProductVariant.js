import mongoose from "mongoose";

const productVariantSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: { type: Number, required: true },
  size: { type: String, required: true }, // kich co
  color: { type: String, required: true },
  stock: { type: Number, required: true }, // so luong
  sku: { type: String, unique: true }, // ma doc nhat
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
