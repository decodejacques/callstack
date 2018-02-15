function bar() {
    console.log("running bar");
    return "hello";
}
function foo() {
    var x = bar();
    if(x == "hello") bar();
    return false;
}
foo();
foo();
// 10 6 r 7 r r 11 6 r 7 r r