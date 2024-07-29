import { useEffect, useState } from "react";
import axios from 'axios';

function ProfileName({date,setDate}){
    const [profileTitleClass, setProfileTitleClass] = useState('profile_title');
    const [onBtn, setOnBtn] = useState(false)
    const [profileName, setProfileName] = useState(date.profileName);

    useEffect(() => {
        setProfileName(date.profileName);
      }, [date.profileName]);

    const handleSave = () => {
        setDate(prevDate => ({
        ...prevDate,
        profileName: profileName
      }));

    axios.put('/api/my/profile-edit?ProfileName=' + profileName)
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
                <h5 className={profileTitleClass}>프로필 이름</h5>
                <div className="unit_content">
                    <p className='modify_myslef'>{profileName}</p>
                    <button
                        type="button"
                        className="unit_all"
                        onClick={() => { setOnBtn(true); setProfileTitleClass('changeTitle'); }}
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