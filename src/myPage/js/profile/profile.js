import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from '../MypageList.js';
import '../../css/profile/Profile.css';
import { useEffect, useState } from 'react';
import EmailAdress from '../mypage_login_info/EmaillAdress.js'
import PasswordChang from '../mypage_login_info/PasswordCh.js'
import Layer from '../mypage_login_info/Layer.js'
import axios from 'axios';

const Profile = () =>{
    let [date, setDate] = useState({});//데이터
    const [isLayer, setIsLayer] = useState(false); // 신발창 열기
    const [receiveEmail, setReceiveEmail] = useState('1');
    const [receiveMessage, setReceiveMessage] = useState('1');

    useEffect(() => {
        axios.get('/api/my/profile')
            .then(res=>{
                console.log("로그인 정보 : ",res.data)
                setDate({
                    userEmail: res.data.email,
                    userPw: res.data.userPw,
                    userPhone: res.data.phone,
                    userSize: res.data.userSize,
                    textMsg: res.data.receiveEmail,
                    emailMsg: res.data.receiveMessage
                });
                setReceiveEmail(res.data.receiveEmail);
                setReceiveMessage(res.data.receiveMessage);
            })
            .catch(error =>{
                console.log('profile 에러 useEffect', error);
            });
    }, []);


    // const saveProfile = (updatedData) => {
    //     const updatedProfile = { ...date, ...updatedData };
    //     setDate(updatedProfile);

    //     axios.put('/api/my/profile', updatedProfile)
    //         .then(response => {
    //             console.log('프로필 업데이트 성공:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('프로필 업데이트 오류:', error);
    //         });
    // };

    const toggleLayer = () => {
        setIsLayer(!isLayer);
    };
    
    const handleConfirmSize = (size) => {
        const updatedProfile = { ...date, userSize: size };
        setDate(updatedProfile);

        axios.put('/api/my/profile', updatedProfile)
            .then(response => {
                console.log('프로필 업데이트 성공:', response.data);
            })
            .catch(error => {
                console.error('프로필 업데이트 오류:', error);
            });
    };


    //문자 광고성 정보수신`
    const handleTextMsgChange = (e) => {
        const value = e.target.value;
        setReceiveMessage(value);

        axios.put('/api/my/profile', { newReceiveMsg: value })
            .then(response => {
                console.log('수신변경 성공 :', response.data);
            })
            .catch(error => {
                console.error('수신동의meg error :', error);
            });
    };
    //이메일 광고성 정보 수신
    const handleEmailMsgChange = (e) => { 
        const value = e.target.value;
        setReceiveEmail(value);
        axios.put('/api/my/profile', { newReceiveEmail: value })
            .then(response => {
                console.log('수신변경 성공:', response.data);
            })
            .catch(error => {
                console.error('수신동의email error', error);
            });
    };

return(

<div>
<Header />
    <div className="container_box ">
        <div className="bd-sidebar">
            <MypageList />
        </div>
        <div className="box-container">
            <div className='content-title'>
                <div className='titlePoint'>
                    <h3>로그인 정보</h3>
                </div>
            </div>
            <div className='profile_info'>
                <div className='profile_group'>
                    <h4 className='group_title'>내 계정</h4>
                    <EmailAdress date={date} setDate={setDate}/>  {/* 이메일 변경 */}
                   
                    <PasswordChang date={date} setDate={setDate} />  {/* 비밀번호 변경 */}
                </div>
               
                <div className='profile_group' style={{paddingTop: '58px'}}>
                    <h4 className='group_title'>개인 정보</h4>
                    <div className='unit_Prof'>
                        <h5 className='login_info_title'>휴대폰 번호</h5>
                        <div className='unit_content'>
                            <p className='outline'>{date.userPhone}</p>
                            <button
                                type="button"
                                className="unitAll_Btn"
                                onClick={''} 
                                >변경
                            </button>
                        </div>
                    </div>
                    <div className='unit_Prof'>
                        <h5 className='login_info_title'>신발 싸이즈</h5>
                        <div className='unit_content'>
                            <p className='outline'>{date.userSize}</p>
                            <button 
                                type="button"
                                className="unitAll_Btn"
                                onClick={toggleLayer}> 
                            변경
                            </button>
                        </div>
                    </div>
                    {isLayer && <Layer onClose={toggleLayer} 
                                       onConfirm={handleConfirmSize} 
                                       date={date}
                                       setDate={setDate} />}
                </div>
                <div style={{paddingTop: '58px', paddingBottom: '160px' }}>
                    <h4 className='group_title'>광고성 정보 수신</h4>
                    <div className='unit to_receive'>
                        <div className='unit_content'>
                            <p className='desc'>문자 메시지</p>
                            <span>수신 동의</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                        name="msgOption" id="inlineRadio1" value="1"
                                        checked={receiveMessage === '1'} onChange={handleTextMsgChange} />
                                <label class="form-check-label" for="inlineRadio1" />
                            </div>
                            <span className='label_txt'>수신거부</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                        name="msgOption" id="inlineRadio2" value="0" 
                                        checked={receiveMessage === '0'} onChange={handleTextMsgChange} />
                                <label class="form-check-label" for="inlineRadio2" />
                            </div>
                        </div>
                    </div>
                    <div className='unit to_receive'>
                        <div className='unit_content'>
                            <p className='desc'>이메일</p>
                            <span>수신 동의</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                    name="emailOption" id="inlineRadio1" value="1" 
                                    checked={receiveEmail === '1'} onChange={handleEmailMsgChange} />
                                <label class="form-check-label" for="inlineRadio1" />
                            </div>
                            <span className='label_txt'>수신거부</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                    name="emailOption" id="inlineRadio2" value="0" 
                                    checked={receiveEmail === '0'} onChange={handleEmailMsgChange} />
                                <label class="form-check-label" for="inlineRadio2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<Footer />
</div>

    );
};
export default Profile ;