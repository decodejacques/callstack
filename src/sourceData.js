let expectedActions = [[7,5,"ret","ret"],[7,5,"ret","ret"]];
let sourceData = [`function foo() {
    function bar(){
        console.log("WHAT");
    }
    bar();
}
foo();`,`function foo() {
    function bar(){
        console.log("q2");
    }
    console.log("q2");
}
foo();`]
export {sourceData, expectedActions}