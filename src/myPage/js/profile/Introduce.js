import axios from "axios";
import { useEffect, useState } from "react";

function Modal_my_self ({ date,setDate }) {
    const [newMySelf, setNewMySelf] = useState(date.userBio); //자기소개
    const [isEditing, setIsEditing] = useState(false);
    const [profile_titleCh, setProfile_titleCh] = useState('profile_title')
    const [inputCh, setInputCh] = useState('modify_textarea')
  
    useEffect(() => {
      setNewMySelf(date.userBio);
    }, [date.userBio]);

    const handleSave = () => {
      setDate(prevDate => ({
        ...prevDate,
        userBio: newMySelf,
      }));
      // console.log(newMySelf)
        axios.put('/api/my/profile-edit?userBio=' + newMySelf )
        .then(response => {
        console.log(response.data);
        setIsEditing(false);
        })
        .catch(error => {
        console.error(error);
        setIsEditing(false);
            });
        };
  
    const handleCancel = () => {
      setNewMySelf(date.userBio);
      setIsEditing(false);
    };
  
    return (
      <div>
        {isEditing == false ? (
        <div>
          <div className='group'>
            <h5 className={profile_titleCh}>소개</h5>
              <div className="unit_content">
                <p className='modify_myslef'>{newMySelf || '나를 소개하세요'}</p>
                <button
                    type="button"
                    className="unit_all"
                    value={newMySelf}
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