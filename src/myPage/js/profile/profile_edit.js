import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from '../MypageList.js';
import '../../css/profile/Profile_edit.css';
import { useState, useRef, useEffect } from 'react';
import blank_profile from '../../../img/login-page/blank_profile.4347742.png';
import Modal_my_self from './Introduce.js';
import FrofilName from './Profile_name.js';
import NameProfile_email from './Name.js';

const Profile_edit = () =>{
    
    let [date, setDate] = useState({userId: '', userName: '', mySelf: ''});//데이터 id
    const defaultProfileImg = blank_profile;
    let [userImg, setUserImg] = useState(defaultProfileImg);//프로필 이미지변경
    const fileInputRef = useRef(null);
    let [modalSelf, setModalSelf] = useState(false);//소개 변경스위치

    const ImgChange = (e) =>{
        const file = e.target.files[0];
        if(file) {
            try{
                const reader = new FileReader();
                reader.onload = () =>{
                    setUserImg(reader.result)
                };
                reader.readAsDataURL(file);
            }catch (error){
                console.log('이미지 파일 error발생' , error)
            }
        }
    };
    const clickImgBnt = () =>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    useEffect(() => {
        fetch(`http://192.168.42.142:3001/mypage`)
            .then(response => response.json())
            .then(data =>{
                setDate({
                    userId: data.userId,
                    email: data.email
                });
            })
            .catch(error =>{
                console.log('profile 에러 useEffect', error);
            });
    }, []);
    const [profile_titleCh, setProfile_titleCh] = useState('profile_title')

return(

<div>
    <Header />
    <div className="container">
        <div className="row">
            <div className="col-sm-3">
                <MypageList />
            </div>
            <div className="col-sm-9">
                <div className='profile-title'>
                    <div className='title'>
                        <h3>프로필 관리</h3>
                    </div>
                </div>
                
                <div className='user_profile'>
                    <div className='profile_thumb'>
                        <div className='profileIm'>
                            <img className='img_profile' src = {userImg} alt='Profile' />
                            <input
                                hidden
                                type='file' 
                                onChange={ImgChange} 
                                ref={fileInputRef}/>
                        </div>
                    </div>
                        
                    <div className='profile-box'>
                        <strong className='name'>userId{date.userId}</strong>
                        <div className='imgChangeBtn'>
                            <button type="file" className="imgCh" onClick={clickImgBnt}>이미지변경</button>
                            <button 
                                type='file' 
                                className='del' 
                                onClick={()=>{setUserImg(defaultProfileImg)}}
                            >삭제</button>
                            
                        </div>
                    </div>
                </div>
                
                <div className='profile_group'>
                    <h4 className='titleProf'>프로필 정보</h4>
                <FrofilName date={date} 
                            setDate={setDate}/>
                
                <NameProfile_email date={date}
                                   setDate={setDate} />
                    
                
                <Modal_my_self date={date}
                    setDate={setDate}
                    modalSelf={modalSelf}
                    setModalSelf={setModalSelf}
                    />
                </div>
                    </div>
                </div>
            </div>

        <Footer />
</div>


)}

export default Profile_edit;