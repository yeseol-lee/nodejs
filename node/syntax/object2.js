// array, object

var f = function() {
    console.log(1+1);
}

console.log(f);
f();
//함수는 그 자체로 '값'이 될 수 있다!

// var i = if (true) {console.log(1)};
// 조건문은 '값'이 아니다!

// var w = while(true) {console.log(1)};
// while 문도 값이 될 수 없다!

var a = [f];
a[0]();
// 배열의 원소로 함수를 넣을 수 있다.


//객체의 value 값으로도 힘수가 될 수 있다.
var o = {
    func: f
}

o.func();