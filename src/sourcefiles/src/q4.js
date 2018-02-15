function bar() {
    return "hello";
}
function foo() {
    var x = bar();
    if(x == "hello") true;
    return false;
}
foo();
foo();
foo();
// 9 5 r r 10 5 r r 11 5 r r