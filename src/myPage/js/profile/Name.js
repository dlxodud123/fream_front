import axios from "axios";
import { useEffect, useState } from "react";


function NameProfile_email({date, setDate}){
    const [profile_titleCh, setProfile_titleCh] = useState('profile_title')
    const [ onBtn, setOnBtn] = useState(false);
    const [ userName, setUserName] = useState(date.userName)

    useEffect(() => {
      setUserName(date.userName);
    }, [date.userName]);

    const handleSave = () => {
      setDate(prevDate => ({
        ...prevDate,
        userName: userName,
      }));

      console.log(userName)
      axios.put('/api/my/profile-edit?userName='+ userName)
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
        setUserName(date.userName);
          setOnBtn(false);
      };

    return(
        <div>
            {onBtn == false ? (
            <div className='group'>
                <h5 className={profile_titleCh}>이름</h5>
                <div className="unit_content">
                    <p className='modify_myslef'>{userName}</p>
                    <button
                        type="button"
                        className="unit_all"
                        value={userName}
                        onClick={()=>{setOnBtn(true); setProfile_titleCh('changeTitle')}}
                        >변경
                    </button>
                </div>
            </div>
            ) : (
                <div>
            <div className='group'>
                <h5 className={profile_titleCh}>이름</h5>
                <div className="unit_content">
                    <input 
                        className='inputPrfileN'
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}/>
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

export default NameProfile_email;