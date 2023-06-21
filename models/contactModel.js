const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema(
    
    {

    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    messages:{
        type: String,
        required: true
    },
    time: {
        type: String,
        default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      }
},

{timestamps: true}

)

module.exports = mongoose.model("contact",contactSchema)