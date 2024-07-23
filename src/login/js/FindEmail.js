import '../css/Find.css'
import Header from "../../common/header";
import Footer from '../../common/footer';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트


const FindEmail = () => {
    let [phonNumber, setPhoneNumber] = useState('');
    let [findEmailBut, setFindEmailBut] = useState('findEmailBut')
    let [phonNum, setPhonNum] = useState('');
    const [email, setEmail] = useState(''); // 이메일 상태 추가
    const [error, setError] = useState(''); // 오류 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용

    const phonChange =(e) =>{
        const { value } = e.target;
        const filterPhon = value.replace(/[^\d]/g, '');
        setPhoneNumber(filterPhon);
        setPhonNum(filterPhon); 

        if(/^010\d{7,8}$/.test(filterPhon)){
            setFindEmailBut('emailBut')
        }else{
            setFindEmailBut('findEmailBut');
        }
    };

    const findeEmail = async () => {
        try {
            const response = await axios.post('/api/login/find_email', {
                phonNum: phonNum
            });

            if (response.data.email) {
                setEmail(response.data.email); // 응답에서 이메일을 추출하여 상태 업데이트
                setError(''); // 오류 상태 초기화
            } else {
                setEmail(''); // 이메일이 없는 경우 상태 초기화
                alert('등록된 이메일이 없습니다.'); // 오류 메시지 설정

            }
        } catch (error) {
            console.error('find_email 문제', error);
            alert('서버 오류가 발생했습니다.');
        }
    };
    const handlePasswordClick = () => {
        navigate('/login/find_password');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };


return(
    <div>
        <Header />
        <div className="content">
            { email? (
                <div className="area">
                <h2 className="help_title success"><span>이메일 주소 찾기에</span> <span>성공하였습니다.</span></h2>
                <div className='FindEmail_success'>
                    <span>이메일 주소</span>
                    <p>{email}hodjfi@naver.com</p>
                </div>
                <div className='emailSuccess_btn_box'>
                    <button className='email_btn'
                        onClick={handlePasswordClick}
                        >비밀번호 찾기</button>
                    <button className='emailSuccess_login_btn'
                        onClick={handleLoginClick}
                        >로그인</button>
                </div>
            </div>
        ): (
            <div className="area">
                <h2 className="help_title">이메일 아이디 찾기</h2>
                <div className='notice'>
                    <p className='text'>
                        가입 시 등록한 휴대폰 번호를 입력하면 <br/>
                        이메일 주소의 일부를 알려드립니다.
                    </p>
                </div>
                <div>
                    <h3 className='title'>휴대폰 번호</h3>
                    <div className='input_item'>
                        <input
                            id='phone'
                            type='tel'
                            placeholder='가입하신 휴대폰 번호' 
                            className='input_tel'
                            value={phonNumber}
                            onChange={phonChange}>
                        </input>
                    </div>
                </div>
                <div className='input_but'>
                    <button className={findEmailBut} onClick={findeEmail}>이메일 아이디 찾기</button>
                </div>
            </div>
        
        )}      
        </div>
        <Footer />
    </div>
)
}
export default FindEmail;