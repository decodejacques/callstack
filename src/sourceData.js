let expectedActions = [[4,"ret"],[7,5,"ret","ret"],[4,"ret",5,"ret",6,"ret"],[9,5,"ret",6,"ret","ret",10,5,"ret",6,"ret","ret"],[15,11,6,"ret","ret",12,"ret","ret"],[13,9,"ret",10,"ret","ret"]];
let sourceData = [`function foo() {
    return 10;
}
foo();`,`function bar() {
    return "hello";
}
function foo() {
    return bar();
}
foo();`,`function foo() {
    return true;
}
foo();
foo();
foo();`,`function bar() {
    return "hello";
}
function foo() {
    var x = bar();
    if(x == "hello") return bar();
    return false;
}
foo();
foo();`,`function baz() {
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
foo();`,`function baz() {
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
foo();`]
export {sourceData, expectedActions}