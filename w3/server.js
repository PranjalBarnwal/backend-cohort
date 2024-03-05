const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Happy123:Happy123@cluster0.ac5yc1b.mongodb.net/")

const User=mongoose.model("Users",{
    name:String,
    email:String,
    password:String
})

const user=new User({
    name:"Happy Singh",
    email:"happy@gmail.com",
    password:"123456"
});

user.save();
 









const jwtPassword = "secret";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];


function userExists(username,password){
    return ALL_USERS.find((user)=>{
        return user.username===username && user.password===password;
    })
}
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.post("/signin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    if(!userExists(username,password)){
        res.status(403).json({
            msg:"user doesnot exist"
        }); 
    }

    var token=jwt.sign({username:username},jwtPassword);
    res.json({
        token:token
    })

    
})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword); // Using "secret" as the key
        const username = decoded.username;
        res.status(200).json(ALL_USERS);
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid Token"
        });
    }
});

app.listen(3000);
