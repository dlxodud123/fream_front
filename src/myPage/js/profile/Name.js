import { useState } from "react";


function NameProfile_email({date, setDate}){
    const [profile_titleCh, setProfile_titleCh] = useState('profile_title')
    const [ onBtn, setOnBtn] = useState(false);
    const [ name, setName] = useState(date.email)

    const handleSave = () => {
        setDate(prevDate => ({
          ...prevDate,
          email: name,
        }));
        setOnBtn(false);
      };
    
      const handleCancel = () => {
        setName(date.email);
          setOnBtn(false);
      };

    return(
        <div>
            {onBtn == false ? (
            <div className='group'>
                <h5 className={profile_titleCh}>이름</h5>
                <div className="unit_content">
                    <p className='modify_myslef'>{name}</p>
                    <button
                        type="button"
                        className="unit_all"
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
                        value={name}
                        onChange={(e)=> setName(e.target.value)}/>
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