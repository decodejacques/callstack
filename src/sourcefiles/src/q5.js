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
foo();
// 4 r 5 r 6 r