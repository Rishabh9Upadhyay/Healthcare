const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    Owner : {
        type : String,
    },
    Oemail : {
        type : String,
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    textsms : {
        type : String,
        maxlength: 500,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

const massage = new mongoose.model("Massage",contactSchema);

module.exports = massage;