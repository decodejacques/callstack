function bar() {
    return "hello";
}
function foo() {
    var x = bar();
    if(x == "hello") return bar();
    return false;
}
foo();
foo();
// 9 5 r 6 r r 10 5 r 6 r r