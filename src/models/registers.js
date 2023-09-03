const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

const PatientSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    gender : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})




PatientSchema.methods.generateAuthToken = async function(){
    try{
        console.log("Here before jwt id:"+this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})       //according to object destructring
        await this.save();
        console.log("This is token after jwt:"+token);
        return token; 
    }catch(error){
        res.send("The error part is/are: "+error);
        console.log();("The error part is/are: "+error);
    }
}





PatientSchema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(`Current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`Current password is ${this.password}`);
        this.confirmPassword = await bcrypt.hash(this.password,10);

    }
    next();
})

const patient = new mongoose.model("Patient",PatientSchema);
module.exports = patient;