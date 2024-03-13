// function greet(firstname:string):string{

//     return `Hello ${firstname}`;
// }

// console.log(greet("happy"));


// const runAfer1S=(fn:()=>void)=>{
//     setInterval(fn,1000);
// }

// const printName=(name:string):string=>{
// return "hello my name is "+name;
// }

// runAfer1S(function(){
//     console.log("Hello");
// })


// type User = {
// 	firstName: string;
// 	lastName: string;
// 	age: number
// }

// function randomF(user:User){

// }

// enum Direction {
//     Up,
//     Down,
//     Left,
//     Right
// }

// function doSomething(keyPressed:Direction) {
// 	if(keyPressed==Direction.Up) console.log("Move up");
// 	if(keyPressed==Direction.Down) console.log("Move down");
// 	if(keyPressed==Direction.Left) console.log("Move left");
// 	if(keyPressed==Direction.Right) console.log("Move right");
// }

// console.log(Direction.Up);


function getFirstElement<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElement(["harkiratSingh", "ramanSingh"]);
const el2=getFirstElement([1,2,3]);
console.log(el.toLowerCase())