//변수 testFoler에는이 파일을 실행시킨 디렉토리를
//기준으로 조사할 폴더의 위치를 적어주자.
// ./는 현재 디렉토리라는 의미
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
    //['CSS', 'HTML', 'JavaScript']
    //파일 이름을 배열로 만들어서 전달해주는군
})