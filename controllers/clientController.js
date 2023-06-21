const Product = require("../models/productModel.js");
const contactModel = require("../models/contactModel.js");
const CheckoutModel = require("../models/CheckoutModel.js");

const displayProducts = async (req, res) => {
  try {
    let pData = await Product.find();
    if (pData.length > 0) {
      res.send(pData);
    } else {
      res.send({ msg: "No record available here" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error retrieving data" });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, subject, messages } = req.body;

    // validation / user fill all details
    if (!name) {
      return res.send({ message: "User name is required" });
    }
    if (!email) {
      return res.send({ message: "User mail is required" });
    }
    if (!subject) {
      return res.send({ message: "Subject is required" });
    }
    if (!messages) {
      return res.send({ message: "User message is required" });
    }

    let user = await new contactModel({ name, email, subject, messages }).save();
    res.status(201).send({
      success: true,
      message: "Message Sent Successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Message Sending",
      error
    });
  }
};

const addCheckout = async (req, res) => {
  try {
    const productsData = req.body.carts;
    const email = req.body.userE;
    const price = req.body.tprice;

    // Save the array of products to MongoDB
    await CheckoutModel.create({ tprice: price, userE: email, products: productsData });

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
};

const getCheckout = async (req, res) => {
  try {
    const checkoutData = await CheckoutModel.find();
    res.status(200).json(checkoutData);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
};

module.exports = {
  displayProducts,
  addContact,
  addCheckout,
  getCheckout
};
