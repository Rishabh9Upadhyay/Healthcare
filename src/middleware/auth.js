const jwt = require("jsonwebtoken");
const patient = require("../models/registers");
const express = require("express");

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const varifyUser =jwt.verify(token, process.env.SECRET_KEY);
        console.log(varifyUser);
        console.log(varifyUser._id);
        
        const user =await patient.findOne({_id:varifyUser._id})
        console.log(user);
        console.log(user.firstname);


        req.token = token;
        req.user = user;

        next();
    }catch(e){
        // res.status(401).send(e);
        // res.status(401).send("<h1>Please Login</h1>");
        res.render("loginsms")
    }
}

module.exports = auth;