import '../css/Find.css'
import Header from "../../common/header";
import Footer from '../../common/footer';
import { Button } from 'react-bootstrap';
import { useState } from 'react';


const FindEmail = () => {

    let [phonNumber, setPhoneNumber] = useState('');
    let [findEmailBut, setFindEmailBut] = useState('findEmailBut')
    let [phonNum, setPhonNum] = useState('');
    
    const phonChange =(e) =>{
        setPhonNum(e.target.value);//phonNum입력값 전송
        console.log(phonNum);

        const { value } = e.target;
        const filterPhon = value.replace(/[^\d]/g, '');
        setPhoneNumber(filterPhon);
        {
        if(/^010\d{7,8}$/.test(filterPhon)){
            setFindEmailBut('emailBut')
        }else{
            setFindEmailBut('findEmailBut');
        }}
    }



return(
    <div>
        <Header />
        <div className="content">
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
                    <Button className={findEmailBut} onClick={phonChange}>이메일 아이디 찾기</Button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
)
}
export default FindEmail;