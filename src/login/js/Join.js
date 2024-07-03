import '../css/Join.css';
import Header from '../../common/header';
import Footer from '../../common/footer';
import { useState } from 'react';
import { LoginForm, registerCheck } from './RegisterCh.js';

const Join = () => {

    let [clasCh, setclasCh] = useState('register_input');
    let [registerBtn, setRegisterBtn] = useState('registerBtn');
    let msg = <p className='inputError'>이메일 주소를 정확히 입력해 주세요</p>
    let [isFormValid, setIsFormValid] = useState(false)
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
        
        const isAllFieldsFilled = Object.values(formData).every(field => field !== '');
        setIsFormValid(isAllFieldsFilled);
        
    };
    
    return(
    <div>
        <Header/>
        <div className='join'>
        <div className='join_area'>
            <div className='register_ti'>
                <h2>회원가입</h2>
            </div>
            <div className='register_input'>
                <h3>ID</h3>
                <div className='input_item'>
                    <input
                        id='userId'
                        type='text'
                        name='userId'
                        value={formData.userId}
                        onChange={handleChange} />
                </div>
                    <button className='rddCheckBtn' onClick={LoginForm}>아이디 조회</button>
            </div>

            <div className={clasCh}>
                <h3>비밀번호*</h3>
                <div>
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

            <div className='register_input'>
                <h3>User Name</h3>
                <div className='input_item'>
                    <input
                        id='userName'
                        type='text'
                        name='userName'
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className={clasCh}>
                <h3>이메일 주소*</h3>
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
                {clasCh == 'inputError' ? msg : null}
            </div>

            <div className='register_input'>
                <h3>Phone</h3>
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

            <div className='register_input'>
                <h3>Age</h3>
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

            <div className='register_input'>
                <h3>Gender</h3>
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
                <button className={isFormValid ? 'register': 'registerBtn'} onClick={registerCheck}
                onChange={registerCheck}>가입하기</button>
            </div>
        </div>
        </div>
        <Footer />
    </div>
    );
}

export default Join;