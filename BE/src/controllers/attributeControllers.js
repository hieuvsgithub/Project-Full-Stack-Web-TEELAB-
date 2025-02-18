import Attribute from "../models/Attribute.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllAttribute = async (req, res) => {
  try {
    const attributes = await Attribute.find();
    return res.status(200).send(attributes);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findById(id);

    if (!attribute) {
      return res.status(404).send({ message: "ko tim thay thuoc tinh" });
    }
    return res.status(200).send(attribute);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const createAttribute = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "ten thuoc tinh la bat buoc" });
    }

    const existingAttribute = await Attribute.findOne({ name });

    if (existingAttribute) {
      return res.status(400).send({ message: "thuoc tinh da ton tai" });
    }

    const newAttribute = new Attribute({ name });
    await newAttribute.save();

    return res.status(200).send(newAttribute);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const updateAttribute = async (req, res) => {
  try {
    const { name } = req.body;
    const existingAttribute = await Attribute.findOne({ name });

    if (existingAttribute) {
      return res.status(400).send({ message: "thuoc tinh da ton tai" });
    }
    const attribute = await Attribute.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!attribute) {
      return res.status(404).send({ message: "ko tim thay thuoc tinh" });
    }

    return res.status(200).send(attribute);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndDelete(req.params.id);
    if (!attribute) {
      return res.status(404).send({ message: "ko tim thay thuoc tinh" });
    }
    return res.status(200).send({ message: "xoa thuoc tinh thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

export {
  getAllAttribute,
  getByIdAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
};
