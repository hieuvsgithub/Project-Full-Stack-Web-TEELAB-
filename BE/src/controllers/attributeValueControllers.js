import Attribute from "../models/Attribute";
import AttributeValue from "../models/AttributeValue";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllAttributeValue = async (req, res) => {
  try {
    const attributeValues = await AttributeValue.find().populate(
      "attributeId",
      "name"
    );
    return res.status(200).send(attributeValues);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdAttributeValue = async (req, res) => {
  try {
    const attributeValue = await AttributeValue.findById(
      req.params.id
    ).populate("attributeId", "name");

    if (!attributeValue) {
      return res
        .status(404)
        .send({ message: "ko tim thay gia tri thuoc tinh" });
    }
    return res.status(200).send(attributeValue);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const createAttributeValue = async (req, res) => {
  try {
    const { attributeId, value } = req.body;
    if (!attributeId || !value) {
      return res
        .status(400)
        .send({ message: "thieu attributeId hoac thieu value" });
    }

    const attribute = await Attribute.findById(attributeId);

    if (!attribute) {
      return res.status(400).send({ message: "thuoc tinh ko ton tai" });
    }

    const existingAttributeValue = await AttributeValue.findOne({ value });
    if (existingAttributeValue) {
      return res
        .status(400)
        .send({ message: "gia tri thuoc tinh nay da ton tai" });
    }

    const newAttributeValue = new AttributeValue({ attributeId, value });
    await newAttributeValue.save();

    return res.status(200).send(newAttributeValue);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const updateAttributeValue = async (req, res) => {
  try {
    const { value } = req.body;
    const existingAttributeValue = await AttributeValue.findOne({ value });
    if (existingAttributeValue) {
      return res.status(400).send({ message: "gia tri thuoc tinh da ton tai" });
    }

    const attributeValue = await AttributeValue.findByIdAndUpdate(
      req.params.id,
      { value },
      { new: true }
    );

    if (!attributeValue) {
      return res
        .status(404)
        .send({ message: "ko tim thay gia tri thuoc tinh" });
    }
    return res.status(200).send(attributeValue);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const deleteAttributeValue = async (req, res) => {
  try {
    const { id } = req.params;
    const attributeValue = await AttributeValue.findByIdAndDelete(id);
    if (!attributeValue) {
      return res
        .status(404)
        .send({ message: "ko tim thay gia tri thuoc tinh" });
    }
    return res
      .status(200)
      .send({ message: "xoa thanh cong gia tri thuoc tinh" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

export {
  getAllAttributeValue,
  getByIdAttributeValue,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
};
