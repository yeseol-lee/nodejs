var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split('\n');
var num = parseInt(input[0]);

var arr1 = new Array();

for (i = 1; i <= num; i++) {
    var value = parseInt(input[i]);
    
    if (value === 0) {
        arr1.pop();
    } else {
        arr1.push(value);
    }
}

var sum = 0;
for (j = 0; j < arr1.length; j++) {
    sum += arr1[j];
}

console.log(sum);