// function greet(firstname:string):string{
//     return `Hello ${firstname}`;
// }
// console.log(greet("happy"));
var runAfer1S = function (fn) {
    setInterval(fn, 1000);
};
var printName = function (name) {
    return "hello my name is " + name;
};
runAfer1S(function () {
    console.log("Hello");
});
