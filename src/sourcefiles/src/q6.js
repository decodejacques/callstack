function baz() {
    console.log("running baz");
    // there is no return statement in this function
}
function bar() {
    console.log("running bar");
}
function foo() {
    bar();
    baz();
    return true;
}
foo();
// 13 9 r 10 r r