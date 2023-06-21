const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    
    {

    title:{
        type: String,
        required: true
    },
    disc:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    catagory:{
        type: String,
        required: true
    },

    filename: String
   
},

{timestamps: true}

)

module.exports = mongoose.model("product",productSchema)