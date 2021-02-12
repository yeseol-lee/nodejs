var http = require('http');
var fs = require('fs');
//url이라는 변수를 통해 url이라는 모듈을 사용하겠다!
//모듈이란, nodejs의 수많은 기능들을 비슷한 기능끼리 모아놓은 것.
var url = require('url');

//url은 url모듈을 쓰기위한 변수
//_url은 주소url을 저장하기 위한 변수


//localhost:3000/?id=HTML
//즉, ?id=HTML의 쿼리데이터를 갖고있을 경우의 쿼리데이터 분석하기
var app = http.createServer(function(request,response){
    var _url = request.url;
    
    //url모듈의 parse기능을 이용하여 쿼리데이터를 분석함.
    var queryData = url.parse(_url, true).query;
    console.log(queryData); //{ id: 'HTML' }
    console.log(queryData.id); // HTML
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(queryData.id);
    //response.end(..)는 화면에 출력하는 함수.
    //->queryData.id의 값이 화면에 출력됨.
    //localhost:3000/?id=HTML 의 경우는 HTML이 화면에 출력됨.
 
});
app.listen(3000);