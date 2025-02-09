import mongoose from "mongoose";

const attributeValueSchema = mongoose.Schema(
  {
    attributeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
      required: true,
    },
    value: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AttributeValue = mongoose.model("AttributeValue", attributeValueSchema);
export default AttributeValue;
