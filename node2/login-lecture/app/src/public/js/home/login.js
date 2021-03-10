"use strict";

const id = document.querySelector("#id"),
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        psword: psword.value,
    };
    //fetch: 백엔드로부터 데이터를 받아오기위한 Web API 이다.
    //브라우저에 내장된 기능이다.
    //fetch()함수는 첫번째 인자로 URL, 두 번째 인자로 옵션 객체를 받고
    //Promise 타입의 객체를 반환한다.
    //API호출이 성공했을 경우에는 응답(response)객체를 resolve하고,
    //실패있을 경우에는 예외(error)객체를 reject한다.
    //fetch로 프론트단의 데이터를 서버로 보내보자.

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
        //서버로부터 response를 받으려면 then을 사용한다.
        //그런데 promise타입의 데이터가 온다. then을 한번 더 사용하자.
    }).then((res) => res.json())
      .then((res) => {
          if (res.success) {
              location.href="/";
          } else {
              alert(res.msg);
          }
      })
      .catch((err) => {
          console.error(new Error("로그인 중 에러 발생"));
      });
}