const express = require("express");
const adminController = require("../controllers/adminController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const multer = require("multer");

const router = express.Router();
const app = express();

// Configure Multer storage
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "uploads");
},
filename: function (req, file, cb) {
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
},
});
const upload = multer({ storage: storage });

app.use("/uploads", express.static("uploads"));

// Upload endpoint
router.post("/upload", upload.single("image"), authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.addProduct);

// Fetch all images endpoint
router.get("/images", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.productList);

// METHOD GET & add product
router.post("/addproduct", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.addProduct);

// getting Data from MongoDb
router.get("/productlist", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.productList);

// deleting added note
router.delete("/deleteproduct/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.deleteProduct);

// Getting note from MongoDb on the basis of Id
router.get("/singleproduct/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.singleProduct);

// updating note data
router.put("/updateproduct/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.updateProduct);

// getting Data from MongoDb
router.get("/userlist", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.userList);

// deleting added user
router.delete("/deleteuser/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.deleteUser);

// Getting note from MongoDb on the basis of Id
router.get("/singleuser/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.singleUser);

// updating user data
router.put("/updateuser/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.updateUser);

// getting Messages from MongoDb
router.get("/messages", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.userMessages);

// deleting Message
router.delete("/deletemessage/:id", authMiddleware.requireSignIn, authMiddleware.isAdmin, adminController.deleteMessage);

module.exports = router;