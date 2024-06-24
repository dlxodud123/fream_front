import '../css/Join.css';
import Header from '../../common/header';
import Footer from '../../common/footer';
import { useState } from 'react';
import { rddCheck, registerCheck } from './RegisterCh.js';

const Join = () => {

    let [idEmail, setIdEmail] = useState('');
    let [classCh, setclassCh] = useState('input_data');
    let [passw, setPassw] = useState('input_data');
    let [registerBtn, setRegisterBtn] = useState('registerBtn');
    let msg = <p className='input_error'>이메일 주소를 정확히 입력해 주세요</p>
    const [selectedOption, setSelectedOption] = useState('');

    const [formData, setFormData] = useState({
        userId: '',
        userPw: '',
        userName: '',
        email: '',
        phone: '',
        age: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });

        const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
        if(regex.test(idEmail)){
            setclassCh('login_data')
        }else{
            setclassCh('login_dataE')
        }
        

    };

    return(
    <div>
        <Header/>
        <div className='join'>
        <div className='join_area'>
            <div className='register'>
                <h2>회원가입</h2>
            </div>
            <div className={classCh}>
                <p>ID</p>
                <div className='input_item'>
                    <input
                        id='userId'
                        type='text'
                        name='userId'
                        value={formData.userId}
                        onChange={handleChange} />
                    <button className='rddCheckBtn' onClick={rddCheck}>아이디 조회</button>
                </div>
            </div>

            <div className={classCh}>
                <p>비밀번호*</p>
                <div className={passw}>
                <input
                    id='userPw'
                    type='password'
                    name='userPw'
                    value={formData.userPw}
                    onChange={handleChange}
                    placeholder='영문,숫자,특수문자 조합 8-16자'
                />
                </div>
            </div>

            <div className={classCh}>
                <p>User Name</p>
                <div className='input_item'>
                    <input
                        id='userName'
                        type='text'
                        name='userName'
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </div>
                {classCh == 'login_dataE' ? msg : null}
            </div>

            <div className={classCh}>
                <p>이메일 주소*</p>
                <div className='input_item'>
                    <input
                        id='email'
                        type='email'
                        placeholder='예)kream@kream.co.kr'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className={classCh}>
                <p>Phone</p>
                <div className='input_item'>
                    <input
                        id='phone'
                        type='text'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className={classCh}>
                <p>Age</p>
                <div className='input_item'>
                <input
                    id='age'
                    type='text'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                />
                </div>
            </div>

            <div className={classCh}>
                <p>Gender</p>
                <div style={{display:"flex"}}>
                <div className='radio_group'>
                    <label className='radio_label'>
                        <input
                            id='gender'
                            type="radio"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                            name="gender"
                        />
                        <label className='radioGroup'>Male</label>
                    </label>
                </div>
                <div className='radio_group'>
                    <label className='radio_label'>
                        <input
                            id='gender'                
                            type="radio"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                            name="gender"
                        />
                        <label className='radioGroup'>Female</label>
                    </label>
                </div>
                </div>
                <button className='registerBtn' onClick={registerCheck}
                onChange={
                    ()=>{}
                }>가입하기</button>
            </div>
        </div>
        </div>
        <Footer />
    </div>
    );
}

export default Join;