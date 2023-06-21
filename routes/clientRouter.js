const express = require("express");
const {
  displayProducts,
  addContact,
  addCheckout,
  getCheckout,
} = require("../controllers/clientController.js");
const { isClient, requireSignIn } = require("../middleware/authMiddleware.js");
const { productList, singleProduct } = require("../controllers/adminController.js");
const stripe = require('stripe');

const router = express.Router();
router.use(express.json());

// METHOD GET & Dummy
router.get("/products", requireSignIn, isClient, displayProducts);

// display products data
router.get('/imageshow',  productList);

// Getting note from MongoDb on the basis of Id
router.get("/singleproduct/:id", singleProduct);

// Contact add
router.post("/addcontact", addContact);

// add checkout request
router.post("/addcheckout", addCheckout);

// get checkout requests
router.get("/getcheckout", getCheckout);

const stripeInstance = stripe('sk_test_51NI78tApKD4haOvDSNbL9594leuzmxvtbhK1OqZ482pmiJ9PPtTFOHTqu6dmGzCOSobacRB44foBG4tVIX6MBwbs002Zw8bCR9');

router.post('/charge', async (req, res) => {
  try {
    const { token, amount } = req.body;
    const charge = await stripeInstance.charges.create({
      amount,
      currency: 'PKR',
      source: token.id,
      description: 'Payment Description',
    });

    // Handle the charge response as needed
    // Return a success message to the client
    res.send({ message: 'Payment successful' });
  } catch (error) {
    // Handle any errors that occur during the payment process
    res.status(500).send({ error: 'Payment failed' });
  }
});

module.exports = router;
