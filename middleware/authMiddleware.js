const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel.js');

// Protected login on the basis of token
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      error,
      message: "Error in middleware",
    });
  }
};

// Testing whether a user is client or not
const isClient = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (user.role !== 0) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    next();
  }
};

// Testing whether a user is admin or not
const isAdmin = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (user.role !== 1) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  } else {
    next();
  }
};

module.exports = {
  requireSignIn,
  isClient,
  isAdmin,
};
