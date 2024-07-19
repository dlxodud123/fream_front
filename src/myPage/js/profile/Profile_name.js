import { useState } from "react";
import axios from 'axios';

function ProfileName({date,setDate}){
    const [profileTitleClass, setProfileTitleClass] = useState('profile_title');
    const [onBtn, setOnBtn] = useState(false)
    const [onEditMode, setOnEditMode] = useState(false);
    const [profileName, setProfileName] = useState(date.profileName);

    const axiosBaseURL = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
    });

    const handleSave = () => {

      axiosBaseURL.put('http://192.168.0.101:3001/my?profile-edit' + profileName)
      .then(response => {
          console.log(response.date);
          setDate(prevDate => ({
            ...prevDate,
            profileName,
        }));
        setOnEditMode(false);
        })
        .catch(error => {
            console.error(error);
            setOnEditMode(false);
        });
    };
  
    const handleCancel = () => {
        setProfileName(date.profileName);
        setOnEditMode(false);
    };



    return(
    <div>
        { onBtn == false ? (
            <div className='group'>
                <h5 className={profileTitleClass}>프로필 이름</h5>
                <div className="unit_content">
                    <p className='modify_myslef'>{date.img}</p>
                    <button
                        type="button"
                        className="unit_all"
                        onClick={() => { setOnEditMode(true); setProfileTitleClass('changeTitle'); }}
                        >변경
                    </button>
                </div>
            </div>
        ):(
            <div>
            <div className='group'>
                <h5 className={profileTitleClass}>프로필 이름</h5>
                <div className="unit_content">
                    <input
                        id="profileName"
                        className='inputPrfileN'
                        value={profileName}
                        onChange={(e)=> setProfileName(e.target.value)}/>
                </div>
            </div>
            <div>
            <div className="modify_btn_box">
              <button className="btn_cancell" onClick={handleCancel}>
                취소
              </button>
              <button className="btn_save" onClick={handleSave}>
                저장
              </button>
            </div>
          </div>
        </div>
        )}
    </div>

    )
}

export default ProfileName;