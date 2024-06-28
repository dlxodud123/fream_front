import '../css/Find.css';
import Footer from "../../common/footer";
import Header from "../../common/header";
import { Button } from 'react-bootstrap';
import { useState } from 'react';


const FindPw = () =>{
    let [phonNumber, setPhoneNumber] = useState('');
    let [phonNum, setPhonNum] = useState('')
    let [emailAddress, setEmailAddress] = useState('')

    // const sendEmail = (e) =>{
    //     const { value } = e.target;
    //     const filterEmail = value.replace(/^[^@]+@[^@]+\.[^@]{1,}$/);
    //     setEmailAddress(filterEmail);
    // }


    const sendPhonNum = (e) =>{
        const { value } = e.target;
        const filterPhon = value.replace(/[^\d]/g, '' && /^010\d{7,8}$/);
        setPhoneNumber(filterPhon);
        console.log(phonNumber)
    }

    return(

        <div>
        <Header />
        <div className="content">
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
                        value={phonNumber}
                        onChange={sendPhonNum}>
                        </input>
                    </div>
                </div>
                <div>
                    <h3 className='title_email'>이메일 주소</h3>
                    <div className='input_item'>
                        <input 
                        id='email'
                        type='tel' 
                        placeholder='예)kream@kream.co.kr' 
                        className='input_tel'
                        value={emailAddress}
                        // onChange={}
                        ></input>
                    </div>
                </div>
                <div className='input_but'>
                    <Button className='loginBut' >문자 발송하기</Button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default FindPw;