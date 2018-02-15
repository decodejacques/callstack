function baz() {
    console.log("running bar");
    return "hello";
}
function bar() {
    baz();
    console.log("running bar");
    return "hello";
}
function foo() {
    bar();
    baz();
    return true;
}
foo();
// 15 11 6 r r 12 r r