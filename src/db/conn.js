const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/HealthCare",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Database connected successfully");
}).catch((e)=>{
    console.log("Database can't be connected");
})