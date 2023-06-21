const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userE: String,
  tprice: String,
  products: [
    {
      title: String,
      qnty: String,
      userE: String,
      updatedAt: String,
    }
  ]
});

module.exports = mongoose.model("checkout", checkoutSchema);
