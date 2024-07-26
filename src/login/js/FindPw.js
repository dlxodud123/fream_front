// import '../css/Find.css';
import Footer from "../../common/footer";
import Header from "../../common/header";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

const FindPw = () =>{
    let [inputPhonNumber, setInputPhoneNumber] = useState('');
    let [emailAddress, setEmailAddress] = useState('');
    let [findEmailBut, setFindEmailBut] = useState('findEmailBut')
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isSuccess, setIsSuccess] = useState(false); // 성공 여부 상태 추가
    const [error, setError] = useState(''); // 오류 메시지 상태 추가
    const isValidPhoneNumber = (phoneNumber) => /^010\d{7,8}$/.test(phoneNumber);
    const isValidEmail = (email) => /^[^@]+@[^@]+\.[^@]{1,}$/.test(email);
    
    useEffect(() => {
        if (isValidPhoneNumber(inputPhonNumber) && isValidEmail(emailAddress)) {
            setFindEmailBut('emailBut'); // 모든 조건이 맞으면 버튼 CSS 변경
        } else {
            setFindEmailBut('findEmailBut');
        }
    }, [inputPhonNumber, emailAddress]);


    const findePassword = async () => {
        try {
            const response = await axios.post(`/api/login/find_email`, {
                phonNum: inputPhonNumber,
                email: emailAddress,
            });
            if (response.data.success) { // 서버 응답에서 성공 여부 확인
                setIsSuccess(true);
                setError(''); // 오류 메시지 초기화
            } else {
                setIsSuccess(false);
                alert('등록된 정보가 없습니다.'); // 오류 메시지 설정
            }
        } catch (error) {
            console.error('find_password 문제', error);
            alert('서버 오류가 발생했습니다.');
            setIsSuccess(false);
        }
    };
        
    const sendPhonNum = (e) =>{
        const { value } = e.target;
        const filterPhon = value.replace(/[^\d]/g, '' && /^010\d{7,8}$/);
        setInputPhoneNumber(filterPhon);
        console.log(inputPhonNumber)
    }
    const sendEmail = (e) => {
        const { value } = e.target;
        const filterEmail = value;
        setEmailAddress(filterEmail);
    };
    const handleLoginClick = () => {
        navigate('/login');
    };
        

    return(
        <div>
        <Header />
        <div className="content">
          { isSuccess ? (
          <div className="area">
                <div className='notice'>
                    <p className='success_textMag'>
                        임시 비밀번호를 전송하였습니다. <br/>
                        전송 받은 임시 비밀번호로 로그인해주세요.
                    </p>
                </div>
                <div className='input_success_but'>
                    <button className='success_login_btn'
                            onClick={handleLoginClick}
                            >로그인
                    </button>
                </div>
            </div>
          ):(
            <div className="area">
                <h2 className="help_title">비밀번호 찾기</h2>
                <div className='notice'>
                    <p className='text'>
                        가입 시 등록한 휴대폰 번호와 이메일을 입력하면, <br/>
                        휴대폰으로 임시 비밀번호를 전송해 드립니다.
                    </p>
                </div>
                <div>
                    <h3 className='title_phon'>휴대폰 번호</h3>
                    <div className='input_item'>
                        <input
                            id='pnone'
                            type='tel' 
                            placeholder='가입하신 휴대폰 번호' 
                            className='input_tel'
                            value={inputPhonNumber}
                            onChange={sendPhonNum}>
                        </input>
                    </div>
                </div>
                <div>
                    <h3 className='title_email'>이메일 주소</h3>
                    <div className='input_item'>
                        <input 
                            id='email'
                            type='tell' 
                            placeholder='예)kream@kream.co.kr'
                            className='input_tel'
                            value={emailAddress}
                            onChange={sendEmail}
                        ></input>
                    </div>
                </div>
                <div className='input_but'>
                    <button className={findEmailBut} 
                            onClick={findePassword}        
                    >문자 발송하기</button>
                </div>
            </div>
            
          )}
        </div>
        <Footer />
    </div>
    )
}

export default FindPw;