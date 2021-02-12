const { EDESTADDRREQ } = require("constants");
const http = require("http");
const app = http.createServer( (req, res) => {
    res.writeHead(200, { "Content-Type" : "text/html; charset=utf-8"});
    if(req.url === '/') {
        res.end("여기는 루트입니다");
    } else if (req.url === '/login') {
        res.end("여기는 로그인 화면입니다");
    }
});

app.listen(3001, () => {
    console.log("http로 가동된 서버입니다");
});

/*
const express = require("express");
const app= express();

//브라우저에서 /(root)경로로 들어오면 이러한 동작을 하겠다
app.get("/", (req, res) => {
    res.send("여기는 루트입니다");
});

app.get("/login", (req, res) => {
    res.send("여기는 로그인 화면입니다");
});
app.listen(3000, function() {
    console.log("서버 가동");
});

*/