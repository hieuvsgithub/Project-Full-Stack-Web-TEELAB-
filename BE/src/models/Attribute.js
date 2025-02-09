import mongoose from "mongoose";

const attributeSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Attribute = mongoose.model("Attribute", attributeSchema);
export default Attribute;
