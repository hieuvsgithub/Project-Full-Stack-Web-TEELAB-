import mongoose from "mongoose";
import slugMiddleware from "../middlewares/slugMiddleware.js";

const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    image: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
    },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    slug: { type: String, unique: true, index: true },
    isHidden: { type: Boolean, default: false },
    deleteAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

categorySchema.plugin(slugMiddleware("title", "slug"));

const Category = mongoose.model("Category", categorySchema);
export default Category;
