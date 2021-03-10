"use strict";

//모듈
const express = require('express');
const app = express();
//body-parser 모듈 설치 필요함
//그리고 사용하려면, 미들웨어도 등록해야한다.
const bodyParser = require("body-parser");

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

//정적 경로를 추가해줌. 자바스크립트 실행할수있게 해준다.
app.use(express.static(`${__dirname}/src/public`));
//bodyparser사용위한 미들웨어
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ exxtended: true }));

app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

module.exports = app;

