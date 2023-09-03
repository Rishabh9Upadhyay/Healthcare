require("dotenv").config();

const session = require("express-session");

const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 8000;
require("./db/conn");
const Patient = require("./models/registers");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");
const contact = require("./models/contact");
const jobApp = require("./models/job");
const { isSet } = require("util/types");

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cookieParser())



// Middleware to parse incoming URL-encoded data
app.use(express.urlencoded({extended : false}));

const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));


const templates_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partial_path)



// Set up session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));





app.get('/', (req, res) => {
    if (req.session.userDetails) {
        res.render('index', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('index');
    }
});



app.get("/about",auth,(req,res)=>{
    if (req.session.userDetails) {
        res.render('About', { Name: "Hi-"+req.session.userDetails });
    }
})

app.get("/contact",(req,res)=>{
    if (req.session.userDetails) {
        res.render('contact', { Name: "Hi-"+req.session.userDetails });
    }else{
        res.render("contact")
    }
})
app.get("/article",(req,res)=>{
    if (req.session.userDetails) {
        res.render('article', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('article');
    }
})

app.get("/services",auth,(req,res)=>{
    if (req.session.userDetails) {
        res.render('Services', { Name: "Hi-"+req.session.userDetails });
    }else {
        res.render('Services');
    }
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/healthAndNewsUpdate",(req,res)=>{
    if (req.session.userDetails) {
        res.render('article', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('article');
    }
})
app.get("/Nutrition",(req,res)=>{
    if (req.session.userDetails) {
        res.render('Nutrition', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('Nutrition');
    }
})
app.get("/Exercise",(req,res)=>{
    if (req.session.userDetails) {
        res.render('Exercise', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('Exercise');
    }
})
app.get("/HelthCh",(req,res)=>{
    if (req.session.userDetails) {
        res.render('HelthChalenges', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('HelthChalenges');
    }
})
app.get("/NewsAndUpdate",(req,res)=>{
    if (req.session.userDetails) {
        res.render('NandU', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('NandU');
    }
})
app.get("/PandS",(req,res)=>{
    if (req.session.userDetails) {
        res.render('PandS', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('PandS');
    }
})
app.get("/lifestyle",(req,res)=>{
    if (req.session.userDetails) {
        res.render('lifestyle', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('lifestyle');
    }
})
app.get("/job",(req,res)=>{
    if (req.session.userDetails) {
        res.render('jobs', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('jobs');
    }
})
app.get("/expert",(req,res)=>{
    if (req.session.userDetails) {
        res.render('expert', { Name: "Hi-"+req.session.userDetails });
    } else {
        res.render('expert');
    }
})






app.post("/contact", auth, async (req,res)=>{
    try{
        const ContactDoc = new contact({
            Owner : req.user.firstname,
            Oemail : req.user.email,
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            textsms : req.body.textsms
        })
        console.log("Massege recived: "+ContactDoc);
        const sms = await ContactDoc.save();
        console.log("Massege sent successfully")
        res.render("index",{
            Name : "Hi-"+req.session.userDetails
        })
    }catch(e){
        res.status(500).send("<h1>Eroor found</h1>");
    }
})



app.post("/jobs", auth, async (req,res)=>{
    try{

        const jobcollection = new jobApp({
            Owner : req.user.firstname,
            Omail : req.user.email,
            name : req.body.name,
            email : req.body.email,
            Phone : req.body.Phone,
            Cover : req.body.Cover,
            education : req.body.education,
            exper : req.body.exper,
            ref : req.body.ref,
            portfolio : req.body.portfolio,
            salary : req.body.salary
        })
        console.log(jobcollection)

        const jobrecord = await jobcollection.save();
        console.log(jobrecord);
        res.render("index",{
            Name : "Hi-"+req.session.userDetails
        })
    }catch(e){
        res.status(200).render("jobsw")
        console.log(e)
        res.status(200).render("jobsw")
    }
})



app.get("/logout", auth,async (req,res)=>{
    try{
        console.log(req.user);

        // for singal device
        req.user.tokens = req.user.tokens.filter((curElement)=>{
            return curElement.token !== req.token;
        })

        // logout from all device
        // req.user.tokens = [];

        res.clearCookie("jwt");


        console.log("Logout successfully");
        await req.user.save();
        res.render("login");
    }catch(e){
        res.status(500).send(e);
    }
})


app.get("/logouteverywhere", auth,async (req,res)=>{
    try{
        console.log(req.user);

        // for singal device
        // req.user.tokens = req.user.tokens.filter((curElement)=>{
        //     return curElement.token !== req.token;
        // })

        // logout from all device
        req.user.tokens = [];

        res.clearCookie("jwt");


        console.log("Logout successfully");
        await req.user.save();
        res.render("login");
    }catch(e){
        res.status(500).send(e);
    }
})

// create a new user in our database
app.post('/register',async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        let name;
        name = req.body.firstname;
        if(password === cpassword){
            const registerPatient = new Patient({
                firstname : req.body.firstname,
                lastname : req.body.lastname,  
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : req.body.password,
                confirmPassword : cpassword
            })

            console.log("The success part:"+registerPatient);

            const token = await registerPatient.generateAuthToken();
            console.log("The success part jwt:"+token);

            
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+500000),
                httpOnly:true
            });

            
            const registered = await registerPatient.save();
            console.log("The page part:"+registered);
            req.session.userDetails = name;
            // console.log(registered);
            res.status(201).render("index",{
                Name : "Hi-"+name
            });

        }else{
            res.send("password not matching");
        }
    }catch(e){
        res.status(400).send(e);
        console.log("The error part is"+e)
    }
})


// Login check
app.post('/login',async (req,res)=>{
    try{
        const email = req.body.email;  
        const password = req.body.password;
        console.log(`${email} and password is ${password}`);
        const useremil = await Patient.findOne({email});
        const isMatch = await bcrypt.compare(password, useremil.password);

        let name = useremil.firstname;

        const token = await useremil.generateAuthToken();
        // console.log("The success part: "+token);

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+500000),
            httpOnly:true,
            // secure:true
        });
        // if((useremil.email===email) && (useremil.password===password)){
        if(isMatch){
                req.session.userDetails = name;
                res.status(201).render("index",{
                    Name : "Hi-"+name
                });
        }else{
            res.send("Invalid Email or password");
        }
    }catch(e){
        res.status(400).send("Invalid Email or Password..........");
    }
})

app.get("*",(req,res)=>{
    res.render("404")
})

app.listen(port,()=>{
    console.log(`Listning at port number ${port}`)
})