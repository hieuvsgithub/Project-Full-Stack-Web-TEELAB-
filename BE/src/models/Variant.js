import mongoose from "mongoose";

const variantSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    attribute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttributeValue",
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
