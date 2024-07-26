import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from '../MypageList.js';
import '../../css/profile/Profile_edit.css';
import { useState, useRef, useEffect } from 'react';
import blank_profile from '../../../img/login-page/blank_profile.4347742.png';
import Modal_my_self from './Introduce.js';
import ProfilName from './Profile_name.js';
import NameProfile_email from './Name.js';
import axios from 'axios';

const Profile_edit = () =>{
      
      let [date, setDate] = useState({});//데이터
      const defaultProfileImg = blank_profile; //기본 이미지
      let [userImg, setUserImg] = useState(defaultProfileImg);//프로필 이미지변경
      const fileInputRef = useRef(null);
      let [modalSelf, setModalSelf] = useState(false);//소개 변경스위치
    
      
    useEffect(() => {
        axios.get('/api/my/profile-edit')
            // .then(response => console.log(response))
            .then(res=>{
                console.log("==================",res.data)
                setDate({
                    img: res.data.profileUrl || defaultProfileImg,
                    userId: res.data.userId,
                    userName: res.data.username,
                    profileName: res.data.profileName,
                    userBio: res.data.userBio
                });
                setUserImg(res.data.profileUrl || defaultProfileImg); 
                console.log("ffffffff",date.img)
            })
            .catch(error =>{
                console.log('profile 에러 useEffect', error);
            });
    }, []);
    
    const ImgChange = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        if (file) {
            try {
                formData.append('file', file);
                console.log('file', file);
                console.log("fileeeeeee : ",formData.get('file'));
                // console.log(formData);
                const response = await axios.put('/api/my/profile-edit/img', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                      },
                });
    
                const data = response.data;
                setUserImg(data.imageUrl);
                setDate(prevState => ({
                    ...prevState,
                    img: data.imageUrl
                }));
            } catch (error) {
                console.log('이미지 파일 업로드 에러 발생', error);
            }
        }
    };


    const clickImgBnt = () =>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const baseUrl = '/api/upload/ProfileImg/';
    const imageUrl = userImg.startsWith('/upload/ProfileImg/') ? baseUrl + userImg.split('/upload/ProfileImg/')[1] : userImg;

return(

<div>
    <Header />
        <div className="container_box">
            <div className="bd-sidebar">
                <MypageList />
            </div>
            <div className="box-container">
                <div className='profile-title'>
                    <div className='titlePoint'>
                        <h3>프로필 관리</h3>
                    </div>
                </div>
                <div className='user_profile'>
                    <div className='profile_thumb'>
                        <div className='profileIm'>
                            <img className='img_profile' src ={imageUrl}  alt='Profile' />{/*`/api/+${userImg}` */}
                            <input
                                hidden
                                id='img'
                                type='file' 
                                onChange={ImgChange} 
                                ref={fileInputRef}/>
                        </div>
                    </div>
                        
                    <div className='profile-box'>
                        <strong className='name'>{date.userId}</strong>
                        <div className='imgChangeBtn'>
                            <button type="file" className="imgCh" onClick={clickImgBnt}>이미지변경</button>
                            <button 
                                type='file' 
                                className='del_Button' 
                                onClick={()=>{setUserImg(defaultProfileImg)}}
                            >삭제</button>
                            
                        </div>
                    </div>
                </div>
                <div className='profile_info'>
                <div className='profileGroup'>
                    <h4 className='titleProf'>프로필 정보</h4>
                <ProfilName date={date} 
                            setDate={setDate}
                            />
                
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