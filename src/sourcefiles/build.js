var fs = require('fs');

function processFile(filename) {
    var input1 = fs.readFileSync(filename).toString();
    input1 = input1.replace(/\r/g, '');
    let spl = input1.split('\n')
    spl = spl.filter(x => x.trim().length != 0);
    let lastline = spl[spl.length - 1];
    let rst = spl.slice(0, -1).join("\n");
    var f = x => x == 'r' ? "\"ret\"" : parseInt(x)
    lastline = lastline.split(' ').slice(1).map(x => x.trim()).map(f).join(",");
    lastline = '[' + lastline + ']'
    return {body: rst, lastline}
}
let files = fs.readdirSync('./src').map(x => './src/' + x)

let processed = files.map(processFile)
let bodies = processed.map(x => x.body);
let expected = processed.map(x => x.lastline)

bodies = '`' + bodies.join('`,`') + '`'
var start = 'let expectedActions = [' + expected.join(",") + '];\n';
var data = 'let sourceData = [' + bodies + ']\n';
var footer = 'export {sourceData, expectedActions}'
let final = start + data + footer;
fs.writeFileSync('../sourceData.js', final);
