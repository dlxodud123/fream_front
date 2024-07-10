import { useState } from "react";

function Modal_my_self ({
    date,
    setDate,
  }) {
    const [newMySelf, setNewMySelf] = useState(date.mySelf); //자기소개
    const [isEditing, setIsEditing] = useState(false);
    const [profile_titleCh, setProfile_titleCh] = useState('profile_title')
    const [inputCh, setInputCh] = useState('modify_textarea')
  
    const handleSave = () => {
      setDate(prevDate => ({
        ...prevDate,
        mySelf: newMySelf,
      }));
      setIsEditing(false);
    };
  
    const handleCancel = () => {
      setNewMySelf(date.mySelf);
      setIsEditing(false);
    };
  
    return (
      <div>
        {isEditing == false ? (
        <div>
          <div className='group'>
            <h5 className={profile_titleCh}>소개</h5>
              <div className="unit_content">
                <p className='modify_myslef'>{date.mySelf || '나를 소개하세요'}</p>
                <button
                    type="button"
                    className="unit_all"
                    onClick={() => setIsEditing(true) ||
                      setProfile_titleCh('letterThickly') || 
                      setInputCh('changeTextarea')}
                    >변경
                </button>
              </div>
            </div>
        </div>
        ) : (
          <div>
        <div className='group'>
            <h5 className={profile_titleCh}>소개</h5>
            <div className="unit_content">
              <input
                value={newMySelf}
                onChange={(e) => setNewMySelf(e.target.value)}
                className='inputPrfileN'
                autoComplete='off'
                maxLength={500}
              />
            </div>
            </div>
            <div className="modify_btn_box">
              <button className="btn_cancell" onClick={handleCancel}>
                취소
              </button>
              <button className="btn_save" onClick={handleSave}>
                저장
              </button>
            </div>
            </div>
            )}
      </div>
    );
  };

  export default Modal_my_self;