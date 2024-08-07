import "../css/Join.css";
import Header from "../../common/header";
import Footer from "../../common/footer";
import { useState } from "react";
import { LoginForm, registerCheck } from "./RegisterCh.js";
import $ from "jquery";

const Join = () => {
  let [registerBtn, setRegisterBtn] = useState("registerBtn");
  let msg = <p className="inputError">* 이메일 주소를 정확히 입력해 주세요</p>;
  let [isFormValid, setIsFormValid] = useState(false);
  const [idChecked, setIdChecked] = useState(false); // 아이디 조회 여부 상태 추가
  let [clasCh, setClasCh] = useState("register_input");
  let [isEmailValid, setIsEmailValid] = useState(true); // 추가된 상태 변수


  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });
  
  const idCheck = () => {
    $.ajax({
      url: "/api/auth/rddCheck",

      type: "POST",
      contentType: "application/json",
      // formData 대신 userId만 전송
      data: JSON.stringify({ userId: formData.userId }), 
      success: function (response) {
        console.log(response);
        if (response == 0) {
          console.log("ok");
          alert("사용가능한 ID입니다.");
          setFormData((prevData) => ({
            ...prevData,
            // ID 확인 후 이메일 필드 업데이트
            email: prevData.userId, 
          }));
          setIdChecked(true); // 아이디 조회 완료 상태로 설정
        } else {
          console.log("not ok");
          alert("중복된 아이디 입니다.");
          setIdChecked(false); // 아이디 조회 실패 상태로 설정
        }
      },
    });
  };


  const reg = () => {
    if (!idChecked) {
      alert("아이디 조회를 완료해 주세요.");
      return;
    }

    console.log(formData);
    const { userId, userPw, userName, email, phone, age, gender } = formData;

    if (!userPw) {
      alert("please enter pw");
      return;
    }
    if (!userName) {
      alert("please enter name");
      return;
    }
    if (!email) {
      alert("please enter email");
      return;
    }
    if (!phone) {
      alert("please enter phone");
      return;
    }
    if (!age) {
      alert("please enter age");
      return;
    }
    if (!gender) {
      alert("please select gender");
      return;
    }

    $.ajax({
      url: "/api/auth/registerCheck",

      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        console.log(response.code);
        if (response.code == 1) {
          console.log("ok");
          alert("회원가입이 정상적으로 완료되었습니다.");
          window.location.href = "/";
        } else {
          console.log("not ok");
          alert("비정상적인 요청");
          window.location.href = "/join";
        }
      },
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  // setFormData((prevData) => {
  //   const newData = {
  //     ...prevData,
  //     [name]: value,
  // };
    setFormData({
      ...formData,
      [name]: value,
    });

    const isAllFieldsFilled = Object.values(formData).every(
  // const isAllFieldsFilled = Object.values(newData).every(
      (field) => field !== ""
    );
    setIsFormValid(isAllFieldsFilled);

    if (name === "userId") {
      const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
      setIsEmailValid(regex.test(value));
    }


  // return newData; //+++
  };



  return (
    <div>
      <Header />
      <div className="join">
        <div className="join_area">
          <div className="register_ti">
            <h2>회원가입</h2>
          </div>
          <div className="register_input">
            <h3>아이디{!isEmailValid && msg}</h3>
            <div className="input_item">
              <input
                id="userId"
                type="email"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="예) kream@kream.co.kr"
                className={`join_${isEmailValid  ? 'loginid' : 'loginIdE'}`} 
              />
            </div>
            <button className="rddCheckBtn" onClick={() => idCheck()}>
              아이디 조회
            </button>
          </div>

          <div className={clasCh}>
            <h3>비밀번호*</h3>
            <div>
              <input
                id="userPw"
                type="password"
                name="userPw"
                value={formData.userPw}
                onChange={handleChange}
                placeholder="영문,숫자,특수문자 조합 8-16자"
              />
            </div>
          </div>

          <div className="register_input">
            <h3>이름</h3>
            <div className="input_item">
              <input
                id="userName"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={clasCh}>
            <h3>이메일 주소</h3>
            <div className="input_item">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="자동으로 입력 됩니다."
                readOnly
              />
            </div>
          </div>

          <div className="register_input">
            <h3>핸드폰 번호</h3>
            <div className="input_item">
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="register_input">
            <h3>나이</h3>
            <div className="input_item">
              <input
                id="age"
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="register_input">
            <h3>성별</h3>
            <div style={{ display: "flex" }}>
              <div className="radio_group">
                <label className="radio_label">
                  <input
                    id="gender"
                    type="radio"
                    value="MAN"
                    checked={formData.gender === "MAN"}
                    onChange={handleChange}
                    name="gender"
                  />
                  <label className="radioGroup">남성</label>
                </label>
              </div>
              <div className="radio_group">
                <label className="radio_label">
                  <input
                    id="gender"
                    type="radio"
                    value="WOMAN"
                    checked={formData.gender === "WOMAN"}
                    onChange={handleChange}
                    name="gender"
                  />
                  <label className="radioGroup">여성</label>
                </label>
              </div>
            </div>
            <button
              className={isFormValid && idChecked ? "register" : "registerBtn"}
              onClick={reg}
              onChange={registerCheck}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
