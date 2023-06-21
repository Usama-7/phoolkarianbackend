const userModel = require("../models/userModel.js");
const productModel = require("../models/productModel.js");
const contactModel = require("../models/contactModel.js");

const adminController = (req, res) => {
  res.send("You are admin");
};

// Configure Multer storage

const addProduct = async (req, res) => {
  try {
    const { title, disc, price, catagory } = req.body;
    const { filename } = req.file;

    // Create a new image document
    const image = new productModel({
      title,
      disc,
      price,
      catagory,
      filename
    });

    // Save the image document to MongoDB
    await image.save();

    res.status(200).json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the image.' });
  }
};

// Fetch all images endpoint
const productList = async (req, res) => {
  try {
    const images = await productModel.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the images.' });
  }
};

// getting Data from MongoDb
const productList1 = async (req, res) => {
  let nData = await productModel.find();
  if (nData.length > 0) {
    res.send(nData);
  } else {
    res.send({ msg: "No record available here" });
  }
};

// deleting added note
const deleteProduct = async (req, res) => {
  let delUser = await productModel.deleteOne({ _id: req.params.id });
  res.send(delUser);
};

// Getting note from MongoDb on the basis of Id
const singleProduct = async (req, res) => {
  let result = await productModel.findOne({ _id: req.params.id });
  console.log("result_______wrong id ____+++___", result);
  res.send(result);
};

// updating product
const updateProduct = async (req, res) => {
  let result = await productModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
};

// getting Data from MongoDb
const userList = async (req, res) => {
  let nData = await userModel.find();
  if (nData.length > 0) {
    res.send(nData);
  } else {
    res.send({ msg: "No record available here" });
  }
};

// deleting added note
const deleteUser = async (req, res) => {
  let delUser = await userModel.deleteOne({ _id: req.params.id });
  res.send(delUser);
};

// Getting note from MongoDb on the basis of Id
const singleUser = async (req, res) => {
  let result = await userModel.findOne({ _id: req.params.id });
  res.send(result);
};

// updating user
const updateUser = async (req, res) => {
  let result = await userModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
};

// getting Data from MongoDb
const userMessages = async (req, res) => {
  let nData = await contactModel.find();
  if (nData.length > 0) {
    res.send(nData);
  } else {
    res.send({ msg: "No record available here" });
  }
};

// deleting added note
const deleteMessage = async (req, res) => {
  let delUser = await contactModel.deleteOne({ _id: req.params.id });
  res.send(delUser);
};

module.exports = {
  adminController,
  addProduct,
  productList,
  productList1,
  deleteProduct,
  singleProduct,
  updateProduct,
  userList,
  deleteUser,
  singleUser,
  updateUser,
  userMessages,
  deleteMessage
};
