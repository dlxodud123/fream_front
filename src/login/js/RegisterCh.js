import $ from 'jquery';
import './Join.js';

function rddCheck(userId) {
    let data = document.getElementById('userId').value;
    // console.log(':::::::::ffff',data);
    $.ajax({
        type: "POST",
        url: "http://8080/auth/rddCheck",
        data: JSON.stringify( data ),
        contentType: "application/json",
        success: function (response) {
            if (userId == "") {
                alert("아이디를 입력해주세요");
                return;
            }
            if (response == 0) {
                alert("적합한 아이디입니다");
                document.getElementById("userId").readOnly = true;
                document.getElementById("checkRedundancy").disabled = true;
                document.getElementById("signupButton").disabled = false;
                document.getElementById("checkMark").hidden = false;
                document.getElementById("xMark").hidden = true;
            } else {
                alert("중복된 아이디가 존재합니다.");
            }
        },
        error: function (xhr, status, error) {
            console.log("URL sent:", this.url);
        }
    });
}


function registerCheck(formData) {
    const { userId, userPw, userName, email, phone, age, gender } = formData;

    if (!userPw) {
        alert('please enter pw');
        return;
    }
    if (!userName) {
        alert('please enter name');
        return;
    }
    if (!email) {
        alert('please enter email');
        return;
    }
    if (!phone) {
        alert('please enter phone');
        return;
    }
    if (!age) {
        alert('please enter age');
        return;
    }
    if (!gender) {
        alert('please select gender');
        return;
    }

    $.ajax({
        url: "http://8080/auth/registerCheck",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
            console.log(response.code);
            if (response.code == 1) {
                console.log("ok");
                alert("회원가입이 정상적으로 완료되었습니다.");
                window.location.href = "/auth/loginMenu";
            } else {
                console.log("not ok");
                alert('비정상적인 요청');
                window.location.href = "/auth/registerMenu";
            }
        }
    });
}

export {rddCheck, registerCheck };