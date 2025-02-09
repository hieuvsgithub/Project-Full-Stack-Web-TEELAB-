import mongoose from "mongoose";

const productVariantSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: { type: String, required: true }, // kich co
  color: { type: String, required: true },
  stock: { type: Number, required: true }, // so luong ton kho
  sku: { type: String, unique: true }, // ma doc nhat
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
