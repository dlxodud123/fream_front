import '../css/Login.css';
import Header from '../../common/header';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../common/footer';
import {LoginForm} from './RegisterCh.js';

const LoginPage = () => {

    let [idEmail, setIdEmail] = useState(''); //입력한 아이디 값
    let [newPassw, setNewPassw] = useState('');
    let [classCh, setclassCh] = useState('login_data');
    let [passw, setPassw] = useState('login_data');
    let msg = <p className='input_error'>이메일 주소를 정확히 입력해 주세요</p>
    const isButtonActive = classCh ==='login_data'&& passw === 'login_data' && idEmail !== '' && newPassw !=='';
    const navigate = useNavigate();

    return(
        
    <div className='login_all'>
        <Header/>
        <div className='login_modl'>
            <div className='login_area'>
                <div className='login_title'>
                    <h2>KREAM</h2>
                    <p>KICKS RULE EVERYTHING AROUND ME</p>
                </div>
                
                <div className={classCh}>
                    <p>이메일 주소</p>
                    <input 
                        id='userId'
                        type='email'
                        placeholder='예)kream@kream.co.kr' 
                        onChange={(e)=>{
                            setIdEmail(e.target.value)
                            {
                            const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
                                if(regex.test(idEmail)){
                                    setclassCh('login_data')
                                    console.log(idEmail)
                                }else{
                                    setclassCh('login_dataE')
                                }
                            }
                        }}>
                    </input>
                    {classCh == 'login_dataE' ? msg : null} 
                </div>

                <div className={passw}>
                    <p>비밀번호</p>
                    <input
                    id='userPw'
                        type='password' 
                        onChange={(a)=>{
                            setNewPassw(a.target.value);
                            {
                            const pwPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,15}$/;
                                if(pwPattern.test(newPassw)){
                                setPassw('login_data')
                                console.log(newPassw)
                            }else{
                                setPassw('passw');
                            }
                            }
                        } }>
                    </input>
                    {passw == 'passw' ? <div className='passEr'>영문,숫자,특수문자를 조합해서 입력해주세요(8~16자)</div> : null}
                </div>
            
                <Button 
                    className={`loginBut${isButtonActive ? '_active' : ''}`}
                    variant="secondary" 
                    size="lg" 
                    onClick={LoginForm}>
                로그인</Button>
                
                <Row className='row'>
                    <Col onClick={()=> navigate('/join')} style={{cursor:'pointer'}}>이메일 가입</Col>
                    <Col onClick={()=> navigate('/login/find_email')}>이메일 찾기</Col>
                    <Col onClick={()=> navigate('/login/find_password')}>비밀번호 찾기</Col>
                </Row>
                
             
                <button type="button" className="btn btn-outline-dark">                    
                <span className='kaImg'></span>
                    카카오 로그인
                </button>
            </div>
        </div>
        <div>
            <butC classCh='login_data' passw='login_data'></butC>
        </div>
        <Footer />
    </div>
    );
}

export default LoginPage;