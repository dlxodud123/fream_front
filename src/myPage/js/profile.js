import Header from '../../common/header';
import Footer from '../../common/footer';
import MypageList from './MypageList.js';
import '../css/Profile.css';
import { useState, useRef, useEffect } from 'react';
import blank_profile from '../../img/login-page/blank_profile.4347742.png';




const Profile = () =>{
    // let date = {
    //      userId : 'userId' ,
    //      userName : 'userName' 
    // }


    const defaultProfileImg = blank_profile;
    let [userImg, setUserImg] = useState(defaultProfileImg);
    const fileInputRef = useRef(null);
    let [date, setDate] = useState({userId: '', userName: ''});
    let [modalProfilName, setModalProfilName] = useState(false);
    let [modalName, setModalName] = useState(false);

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
                            <img src = {userImg} alt='Profile' />
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
                    <div className='group'>
                        <div className='unit'>
                            <h5 className='profile_title'>프로필 이름</h5>
                            <div className='unit_content'>
                                <p className='modify_id'>{date.userId}userId</p>
                                <button type='button' className='unit_all' 
                                    onClick={()=>{ setModalProfilName(true) }}
                                >변경</button>
                            </div>
                        </div>
                            {
                                modalProfilName==true ? <Modal_profilName setModalProfilName={setModalProfilName}></Modal_profilName> : null
                            }

                        <div className='unit'>
                            <h5 className='profile_title'>이름</h5>
                            <div className='unit_content'>
                                <p className='modify_id'>{date.email}userId</p>
                                <button type='button' className='unit_all'
                                    onClick={()=>{ setModalName(true)}}
                                >변경</button>
                            </div>
                        </div>
                            {
                                modalName==true ? <Modal_name setModalName={setModalName}></Modal_name> : null
                            }
                        <div className='unit' style={{marginBottom: '58px'}}>
                            <h5 className='profile_title'>소개</h5>
                            <div className='unit_content'>
                                <p className='modify_id'>소개어떻게해</p>
                                <button type='button' className='unit_all'>변경</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <Footer />
    </div>
    </div>

)}

function Modal_profilName(props){
return(
    <div>
        <p className='input_text'>변경 후 30일이 지나야 다시 
                변경 가능하므로 신중히 변경해 주세요
        </p>
        <div className='modify_btn_box'>
            <button className='btn_cancell' onClick={()=>{props.setModalProfilName(false)}}>취소</button>
            <button className='btn_save'>저장</button>
        </div>
    </div>
    )
}

function Modal_name(props){
    return(
        <div>
            <div className='modify_btn_box'>
                <button className='btn_cancell' onClick={()=>{props.setModalName(false)}}>취소</button>
                <button className='btn_save'>저장</button>
            </div>
        </div>
    )
}

export default Profile;