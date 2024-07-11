import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from '../MypageList.js';
import '../../css/profile/Profile.css';
import { useEffect, useState } from 'react';
import EmailAdress from '../mypage_login_info/EmaillAdress.js'
import PasswordChang from '../mypage_login_info/PasswordCh.js'
import Layer from '../mypage_login_info/Layer.js'

const Profile = () =>{
    const [ password, setPassword ] = useState('');
    useEffect(() => { //비번
        const fetchPw = async () => {
            const beforePw = 'nn'; //API 호출
            setPassword(beforePw);
        };
        fetchPw();
    }, []);

    const [isLayer, setIsLayer] = useState(false);
    const toggleLayer = () => {
        setIsLayer(!isLayer);
    };
    
    const [selectedSize, setSelectedSize] = useState(null);
    const handleConfirmSize = (size) => {
        setSelectedSize(size);
    };

return(

<div>
<Header />
<div className="container">
    <div className="row">
        <div className="col-sm-3">
            <MypageList />
        </div>
        <div className="col-sm-9">
            <div className='content-title'>
                <div className='title'>
                    <h3>로그인 정보</h3>
                </div>
            </div>
            <div className='profile_info'>
                <div className='profile_group'>
                    <h4 className='group_title'>내 계정</h4>
                    <EmailAdress />
                    
                    <PasswordChang password={password}/>
                </div>
               
                <div className='profile_group' style={{paddingTop: '58px'}}>
                    <h4 className='group_title'>개인 정보</h4>
                    <div className='unit'>
                        <h5 className='title'>휴대폰 번호</h5>
                        <div className='unit_content'>
                            <p className='outline'>이거 모름</p>
                            <button
                                type="button"
                                className="unitAll"
                                onClick={() => { }}
                                >변경
                            </button>
                        </div>
                    </div>
                    <div className='unit'>
                        <h5 className='title'>신발 싸이즈</h5>
                        <div className='unit_content'>
                            <p className='outline'>{selectedSize}</p>
                            <button 
                                type="button"
                                className="unitAll"
                                onClick={toggleLayer}>
                            변경
                            </button>
                            {isLayer && <Layer onClose={toggleLayer} onConfirm={handleConfirmSize} />}
                        </div>
                    </div>
                </div>
                <div className='profile_group' style={{paddingTop: '58px'}}>
                    <h4 className='group_title'>광고성 정보 수신</h4>
                    <div className='unit to_receive'>
                        <div className='unit_content'>
                            <p className='desc'>문자 메시지</p>
                            <span>수신 동의</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                    name="msgOption" id="inlineRadio1" value="1" />
                                <label class="form-check-label" for="inlineRadio1" />
                            </div>
                            <span className='label_txt'>수신거부</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                    name="msgOption" id="inlineRadio2" value="2" />
                                <label class="form-check-label" for="inlineRadio2" />
                            </div>
                        </div>
                    </div>
                    <div className='unit to_'>
                        <div className='unit_content'>
                            <p className='desc'>이메일</p>
                            <span>수신 동의</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                    name="emailOption" id="inlineRadio1" value="1" />
                                <label class="form-check-label" for="inlineRadio1" />
                            </div>
                            <span className='label_txt'>수신거부</span>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" 
                                    name="emailOption" id="inlineRadio2" value="2" />
                                <label class="form-check-label" for="inlineRadio2" />
                            </div>
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