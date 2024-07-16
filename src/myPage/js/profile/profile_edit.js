import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from '../MypageList.js';
import '../../css/profile/Profile_edit.css';
import { useState, useRef, useEffect } from 'react';
import blank_profile from '../../../img/login-page/blank_profile.4347742.png';
import Modal_my_self from './Introduce.js';
import FrofilName from './Profile_name.js';
import NameProfile_email from './Name.js';
import axios from 'axios';

const Profile_edit = () =>{
    const axiosBaseURL = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
      });
      
      let [date, setDate] = useState({});//데이터 id
      const defaultProfileImg = blank_profile;
      let [userImg, setUserImg] = useState(defaultProfileImg);//프로필 이미지변경
      const fileInputRef = useRef(null);
      let [modalSelf, setModalSelf] = useState(false);//소개 변경스위치
      
      
        useEffect(() => {
            axiosBaseURL.get('http://localhost:3000/my/profile-edit')

            //fetch(`http://localhost:3000/my/profile-edit`)
                .then(response => response.json())
                .then(data =>{
                    console.log(data)
                    setDate({
                        img: data.img,
                        userId: data.userId,
                        userName: data.userName,
                        mySelf: data.userBio
                    });
                    if(data.img){
                        setUserImg(data.img);
                    }
                })
                .catch(error =>{
                    console.log('profile 에러 useEffect', error);
                });
        }, []);
    


    const ImgChange = async (e) =>{
        const file = e.target.files[0];
        if(file) {
            try{
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('http://localhost:3000/my/profile-edit/img', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok){
                    const data = await response.json();
                    setUserImg(data.imageUrl);
                    setDate(prevState => ({
                        ...prevState,
                        img: data.imageUrl,
                    }));
                }else{
                    console.log("업로드 실패")
                }

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

    


return(

<div>
    <Header />
    <div className="container snb_area">
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
                            <img className='img_profile' src = {userImg} alt='Profile' />
                            <input
                                hidden
                                id='img'
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
                                className='del_Button' 
                                onClick={()=>{setUserImg(defaultProfileImg)}}
                            >삭제</button>
                            
                        </div>
                    </div>
                </div>
                
                <div className='profileGroup'>
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