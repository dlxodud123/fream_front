// import '../css/Find.css';
import Footer from "../../common/footer";
import Header from "../../common/header";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import emailjs from 'emailjs-com';


const FindPw = () =>{
    let [inputPhoneNumber, setInputPhoneNumber] = useState('');
    let [emailAddress, setEmailAddress] = useState('');
    let [findEmailBut, setFindEmailBut] = useState('findEmailBut')
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isSuccess, setIsSuccess] = useState(false); // 성공 여부 상태 추가
    
    const isValidPhoneNumber = (phoneNumber) => /^010\d{7,8}$/.test(phoneNumber);
    const isValidEmail = (email) => /^[^@]+@[^@]+\.[^@]{1,}$/.test(email);
    
    useEffect(() => {
        if (isValidPhoneNumber(inputPhoneNumber) && isValidEmail(emailAddress)) {
            setFindEmailBut('emailBut'); // 모든 조건이 맞으면 버튼 CSS 변경
        } else {
            setFindEmailBut('findEmailBut');
        }
    }, [inputPhoneNumber, emailAddress]);

    const sendPhonNum = (e) =>{
        const { value } = e.target;
        const filterPhon = value.replace(/[^\d]/g, '' && /^010\d{7,8}$/);
        setInputPhoneNumber(filterPhon);
    }

    const sendEmail = (e) => {
        const { value } = e.target;
        setEmailAddress(value);
    };
    
    const handleLoginClick = () => {
        navigate('/login');
    };

    // function generateTemporaryPassword() {
    //     const length = 9; // 비밀번호 길이를 9자리로 설정
    //     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    //     let temporaryPassword = "";
    //     for (let i = 0; i < length; i++) {
    //         const randomIndex = Math.floor(Math.random() * charset.length);
    //         temporaryPassword += charset[randomIndex];
    //     }
    //     return temporaryPassword;
    // }
    function generateTemporaryPassword() {
        const length = 9; // 비밀번호 길이를 9자리로 설정
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
        const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberCharset = "0123456789";
        const specialCharset = "!@#$%^&*()_+[]{}|;:,.<>?";
    
        let temporaryPassword = "";
    
        // 각 카테고리에서 최소 1개씩 추가
        temporaryPassword += lowercaseCharset[Math.floor(Math.random() * lowercaseCharset.length)];
        temporaryPassword += uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)];
        temporaryPassword += numberCharset[Math.floor(Math.random() * numberCharset.length)];
        temporaryPassword += specialCharset[Math.floor(Math.random() * specialCharset.length)];
    
        // 나머지 길이만큼 랜덤하게 추가
        for (let i = 4; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            temporaryPassword += charset[randomIndex];
        }
    
        // 비밀번호를 랜덤하게 섞음
        temporaryPassword = shuffleString(temporaryPassword);
    
        // 조건 확인 및 조건에 맞지 않으면 다시 생성
        if (!isValidPassword(temporaryPassword)) {
            return generateTemporaryPassword();
        }
    
        return temporaryPassword;
    }
    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }
    
    function isValidPassword(password) {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password);
    
        return hasLowercase && hasUppercase && hasNumber && hasSpecial;
    }

    const findePassword = async () => {
        try {
            const response = await axios.post(`/api/login/find_UserPw`, {
                phonNum: inputPhoneNumber,
                email: emailAddress,
            });
            console.log(response)
            if (response.data) { // 서버 응답에서 성공 여부 확인
                sendVerificationEmail();
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
//  이메일 전송 코드

const sendVerificationEmail = () => {
    const temporaryPassword = generateTemporaryPassword();
        const templateParams = {
            to_email: emailAddress, //수신 이메일
            from_name : '임시 비밀번호 전송',
            randomPw: `임시 비밀번호는 ${temporaryPassword} 입니다.`, 
            reply_to: 'songheeselo@gmail.com'
        };

        emailjs
            .send(      
                'service_gd9bbsg',
                'template_0dmxz8e',
                templateParams,
                '이메일특수키필요', // 노출되면 안됨
            )
            .then((response) => {
                console.log('이메일 전송 완료 ', response);
             // 백엔드에 임시 비밀번호 업데이트 요청
             axios.post(`/api/login/update_password`, {
                phonNum: inputPhoneNumber,
                email: emailAddress,
                temporaryPassword: temporaryPassword
            })
            .then((response) => {
                if (response.data) {
                    console.log('비밀번호가 성공적으로 업데이트되었습니다.');
                    setIsSuccess(true);
                } else {
                    console.error('비밀번호 업데이트 실패:', response.data.message);
                    setIsSuccess(false);
                }
            })
            .catch((error) => {
                console.error('비밀번호 업데이트 오류:', error);
                setIsSuccess(false);
            });
        })
        .catch((error) => {
            console.error('이메일 보내기 실패:', error);
            setIsSuccess(false); // 실패 시 상태 업데이트
        });
};


    const handleVerification = () => {
        if (isValidPhoneNumber(inputPhoneNumber) && isValidEmail(emailAddress)) {
            findePassword();
        } else {
            alert('휴대폰 번호와 이메일을 올바르게 입력해 주세요.');
        }
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
                        이메일로 임시 비밀번호를 전송해 드립니다.
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
                            value={inputPhoneNumber}
                            onChange={sendPhonNum}>
                        </input>
                    </div>
                </div>
                <div>
                    <h3 className='title_email'>이메일 주소</h3>
                    <div className='input_item'>
                        <input 
                            id='email'
                            type='email' 
                            placeholder='예)kream@kream.co.kr'
                            className='input_tel'
                            value={emailAddress}
                            onChange={sendEmail}
                        ></input>
                    </div>
                </div>
                <div className='input_but'>
                    <button className={findEmailBut} 
                            onClick={handleVerification}        
                    >메일 발송하기</button>
                </div>
            </div>
            
          )}
        </div>
        <Footer />
    </div>
    )
}

export default FindPw;