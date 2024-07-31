import Header from "../../../common/header";
import Footer from "../../../common/footer";
import MypageList from "../MypageList";
import React, { useEffect, useState } from "react";
import "../../css/settlemet/Settl_main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const bankList =

  [
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "기업은행",
    "농협은행",
    "SC은행",
    "한국씨티은행",
    "카카오뱅크",
    "부산은행",
    "대구은행",
    "케이뱅크",
  ]; // 조건이 있는 은행만 간추려서 출력함

const accountValidationRules = {
  KB국민은행: "04",
  SC제일은행: "23",
  기업은행: "03",
  농협: "11",
  대구은행: "31",
  부산은행: "32",
  신한은행: "88",
  외환은행: "81",
  우리은행: "20",
  카카오뱅크: "90",
  케이뱅크: "89",
  하나은행: "81",
  한국씨티은행: "27",
};
const selectedBankAccountFormats = {
  국민은행: ["000000-00-000000", "XXXXXX-XX-XXXXXX"],
  우리은행: ["000-00-000000", "XXXX-XXX-XXXXXX"],
  신한은행: ["000-000-000000", "XXX-XXX-XXXXXX"],
  하나은행: ["000-000000-00000", "XXX-XXXXXX-XXXXX"],
  기업은행: ["000-000000-00-000", "XXX-XXXXXX-XX-XXX"],
  농협: ["000-0000-0000-00", "XXX-XXXX-XXXX-XX"],
  외환은행: ["000-000000-000", "XXX-XXXXXX-XXX"],
  SC제일은행: ["000-00-000000", "XXX-XX-XXXXXX"],
  씨티은행: ["000-000000-000", "XXX-XXXXXX-XXX"],
  부산은행: ["000-00-000000-0", "XXX-XXXX-XXXX-XX"],
  대구은행: "XXX-XX-XXXXXX-X",
  카카오뱅크: "XXXX-XX-XXXXXXX",
  케이뱅크: "XXX-XXX-XXXXXX",
};

const SettlementMain = () => {
  const [selectBank, setSelectBank] = useState(""); //은행
  const [accountNum, setAccountNum] = useState(""); //계좌번호
  const [depositor, setDepositor] = useState(""); //예금주
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);
  const [data, setData] = useState("");
  const [isValidAccount, setIsValidAccount] = useState(true);

  //get date
  const fetchData = () => {
    axios
      .get("/api/my/account")
      .then((response) => {
        // 데이터를 받아온 후 상태 업데이트
        setData({
          bank: response.data.bank,
          accountNumber: response.data.accountNumber,
          depositor: response.data.depositor,
        });
        // 모든 데이터가 채워졌음을 표시
        setInputFilled(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //post date
  const handleSubmit = () => {
    const dataToSend = {
      bank: selectBank,
      accountNumber: accountNum.replace(/-/g, ""),
      depositor: depositor,
    };

    axios
      .post("/api/my/addres", dataToSend)
      .then((response) => {
        console.log("Data sent successfully");
        // 입력값 초기화
        setSelectBank("");
        setAccountNum("");
        setDepositor("");
        setInputFilled(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //계좌에 맞도록 형식 지정
  const formatAccountNumber = (bank, number) => {
    const format = selectedBankAccountFormats[bank][0]; // 첫 번째 형식 사용
    let formatted = "";
    let idx = 0;
    for (let i = 0; i < format.length; i++) {
      if (format[i] === "-") {
        if (number.length > idx) {
          formatted += "-";
        }
      } else {
        formatted += number[idx] || "";
        idx++;
      }
    }
    return formatted;
  };

  //은행에 따라 포맷형식 변경
  const handleAccountNumChange = (e) => {
    const value = e.target.value.replace(/-/g, ""); // '-' 제거
    const numericValue = value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거

    if (selectBank && selectedBankAccountFormats[selectBank]) {
      const formattedAccountNum = formatAccountNumber(selectBank, numericValue);
      setAccountNum(formattedAccountNum);

      const formatLength = selectedBankAccountFormats[selectBank][0].length; // 포맷의 길이
      if (formattedAccountNum.length === formatLength) {
        setIsValidAccount(true);
      } else {
        setIsValidAccount(false);
      }
    } else {
      setAccountNum(numericValue);
      setIsValidAccount(true);
    }
  };

  useEffect(() => {
    if (selectBank !== "" && accountNum !== "" && depositor !== "") {
      setInputFilled(true);
    } else {
      setInputFilled(false);
    }
  }, [selectBank, accountNum, depositor]);

  const handleBankSelect = (bankName) => {
    //은행 선택
    setSelectBank(bankName);
    setShowDropdown(false);
    setAccountNum(""); // 은행 선택 시 계좌번호 초기화
  };

  const toggleDropdown = () => {
    //토글 실행함수
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (data.bank && data.accountNumber && data.depositor) {
      setSelectBank(data.bank);
      //   setAccountNum(data.accountNumber);
      formatAccountNumber(data.bank, data.accountNumber);
      setDepositor(data.depositor);
    }
  }, [data]);

  return (
    <div>
      <Header />
        <div className="container_box">
          <div className="bd-sidebar">
            <MypageList />
          </div>
          <div className="box-container">
            <div className="account_width">
              <div className="titlePoint">
                <h3>정산 계좌 </h3>
              </div>
              {data.bank && data.accountNumber && data.depositor && (
                <div className="register_accountbox">
                  <h4 className="account_info">등록된 계좌 정보</h4>
                  <span className="userInfoBox">{data.bank}</span>
                  <span className="userInfoBox">{data.accountNumber}</span>
                  <span className="account_devider">/</span>
                  <span className="userInfoBox">{data.depositor}</span>
                </div>
              )}
              <div className="content_registeration">
                <div style={{ paddingTop: "20px" }}>
                  <div className="bank_box">
                    <h4 className="settlTitle">은행명</h4>
                    <div className="bank_list">
                      <input
                        className="bankInput"
                        placeholder="선택하시오"
                        value={selectBank}
                        onClick={toggleDropdown}
                        readOnly
                      />
                      <button
                        className={`btn_dropdow ${
                          showDropdown ? "active" : ""
                        }`}
                        onClick={toggleDropdown}
                      >
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="BankIcon"
                        />
                      </button>
                      {showDropdown && (
                        <div className="layer_dropdown_banks">
                          <ul className="layer_dropdown">
                            {bankList.map((bank, index) => (
                              <li
                                key={index}
                                className="drop_bankList"
                                onClick={() => handleBankSelect(bank)}
                              >
                                <p className="drop-item">{bank}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bank_box">
                    <h4 className="settlTitle">계좌번호</h4>
                    <div className="bank_list">
                      <input
                        className={`bankInput ${
                          isValidAccount ? "" : "invalid"
                        }`}
                        placeholder="-없이 입력하세요"
                        value={accountNum}
                        onChange={handleAccountNumChange}
                      />
                    </div>
                    {!isValidAccount && (
                      <div className="error-message">
                        계좌 번호 형식이 올바르지 않습니다.
                      </div>
                    )}
                  </div>
                  <div className="bank_box">
                    <h4 className="settlTitle">예금주</h4>
                    <div className="bank_list">
                      <input
                        className="bankInput"
                        placeholder="예금주명을 정확히 입력하세요"
                        value={depositor}
                        onChange={(e) => setDepositor(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="reginster_btn_box">
                <button
                  className={`account_store_btn ${inputFilled ? "active" : ""}`}
                  onClick={handleSubmit}
                >
                  변경하기
                </button>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};
export default SettlementMain;
