"use strict";

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    confirmPsword = document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("아이디를 입력해 주십시오.");
    if (psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");
    

    
    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
    };


    fetch("/register", {
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
              location.href="/login";
          } else {
              alert(res.msg);
          }
      })
      .catch((err) => {
          console.error(new Error("회원가입 중 에러 발생"));
      });
}