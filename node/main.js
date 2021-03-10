var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB2 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
    </body>
    </html>
    `;
}

function templateList(filelist) {
    var list = '<ul>';
                
    var i = 0;
    while(i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1;
    }
    list = list +'</ul>';

    return list;

}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/') {
        if(queryData.id === undefined) {

            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template);


            })

            
        
        } else {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                    response.writeHead(200);
                    response.end(template);
                
                });
            });
            
        }
        
    } else if(pathname === '/create') {
        fs.readdir('./data', function(error, filelist){
            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="http://localhost:4000/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `);
            response.writeHead(200);
            response.end(template);


        })
    } else if(pathname === '/create_process') {
        var body = '';
        //웹브라우저가 포스트 방식으로 처리할 때 
        request.on('data', function(data){
            //콜백 함수가 실행될 때 마다 데이터를 추가해 줌. 정보가 조각조각 들어오기 때문.
            body = body + data;
        });
        //정보 수신이 끝난 후 end의 콜백함수가 실행됨.
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            //수신한 정보를 가지고 새로운 파일을 만들자!
            fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                //리다이렉션!
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });

        });
        
    }
    else {
        response.writeHead(404);
        response.end(`Not found`);
    }
    
    
 
});
app.listen(4000);