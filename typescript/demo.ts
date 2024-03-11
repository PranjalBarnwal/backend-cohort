// function greet(firstname:string):string{

//     return `Hello ${firstname}`;
// }

// console.log(greet("happy"));


const runAfer1S=(fn:()=>void)=>{
    setInterval(fn,1000);
}

const printName=(name:string):string=>{
return "hello my name is "+name;
}

runAfer1S(function(){
    console.log("Hello");
})