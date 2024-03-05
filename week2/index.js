const bodyParser = require('body-parser');
const express = require('express');
const app=express();
const path = require('path');

const port=3000;
// var countReq=0;


// const middleware=(req,res,next)=>{
//     countReq++;
//     console.log(`no. of requests-${countReq}`);
//     next();
// }
// app.use(middleware);


app.use(bodyParser.json());

function calculateSum(counter){
    var sum=0;
    for(var i=0;i<=counter;i++){
        sum+=i;
    }
    return sum;
}

app.get("/",(req,res)=>{
    res.send("hello,express");
})

app.get("/handleSum",(req,res)=>{
    const input=req.query.counter;
    
    var ans=calculateSum(input);
    res.send(`The output is ${ans}`);
})

app.get("/handleSum2",(req,res)=>{
    const input=req.body.counter;
    var ans=calculateSum(input);
    const obj={
        "answer":ans,
    };
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})