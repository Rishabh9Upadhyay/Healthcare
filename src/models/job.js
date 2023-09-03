const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    Owner : {
        type : String,
    },
    Omail : {
        type : String,
    },
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    Phone : {
        type : Number,
        unique : true
    },
    Cover : {
        type : String
    },
    education : {
        type : String
    },
    exper : {
        type : String
    },
    ref : {
        type : String
    },
    portfolio : {
        type : String
    },
    salary : {
        type : Number
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

const jobApp = new mongoose.model("JobApplication",jobSchema);

module.exports = jobApp;