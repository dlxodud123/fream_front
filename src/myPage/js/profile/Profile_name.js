import { useState } from "react";
import axios from 'axios';

function FrofilName({date,setDate}){
    const [profile_titleCh, setProfile_titleCh] = useState('profile_title')
    const [onBtn, setOnBtn] = useState(false)
    const [profileName, setProfileName] = useState(date.profileName);
  
    const handleSave = () => {
      setDate(prevDate => ({
        ...prevDate,
        ProfileName: profileName,
      }));
      const updatedData = { profileName };
      axios.post('/my/profile-edit/ProfileName', updatedData)
      .then(response => {
          console.log(response.data);
          setOnBtn(false);
    })
      .catch(error => {
          console.error(error);
          setOnBtn(false);
        });
    };
  
    
    const handleCancel = () => {
        setProfileName(date.profileName);
        setOnBtn(false);
    };



    return(
    <div>
        { onBtn == false ? (
            <div className='group'>
                <h5 className={profile_titleCh}>프로필 이름</h5>
                <div className="unit_content">
                    <p className='modify_myslef'>{profileName}</p>
                    <button
                        type="button"
                        className="unit_all"
                        onClick={()=>{setOnBtn(true); setProfile_titleCh('changeTitle')}}
                        >변경
                    </button>
                </div>
            </div>
        ):(
            <div>
            <div className='group'>
                <h5 className={profile_titleCh}>프로필 이름</h5>
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

export default FrofilName;