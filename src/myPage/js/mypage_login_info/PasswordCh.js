import axios from 'axios';
import { useState } from 'react';


function PasswordChang({date, setDate}){
    let [handlePw , setHandlePw] = useState(false);
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    let [ filterCss1 , setFilterCss1 ] = useState('desc_pw')
    let [ filterCss2 , setFilterCss2 ] = useState('desc_pw')
    let [storeBtn, setStoreBtn ] = useState('login_storeBtn')


    // const maskPw = (userPw) =>{
    //     if(!userPw) return '';
    //     return '●'.repeat(userPw.length);
    // }


    const handleSave = () => {
        axios.put('/api/my/profile?userPw='+ currentPw)
        .then(response => {
            if (response.data.verified) {
                return axios.put('/api/my/profile-password', { newPassword: newPw });
            } else {
                throw new Error('이전 비밀번호가 일치하지 않습니다.');
            }
        })
        .then(response => {
            console.log(response.data);
            setDate(prevDate => ({
                ...prevDate,
                userPw: newPw,
            }));
            setHandlePw(false);
            setDate(prevDate => ({
            ...prevDate,
            userPw : currentPw
        }))
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
    };


    const pwPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/;
    const handlePwChange = (e, setPw, setCss) => {
        const value = e.target.value;
        setPw(value);
        if (pwPattern.test(value)) {
            setCss('desc_pw');
        } else {
            setCss('btnCancellCh Er');
        }
        checkFormValidity();

    };
    const checkFormValidity = () => {
        if (pwPattern.test(currentPw) && pwPattern.test(newPw)) {
            setStoreBtn('login_storeBtnEr');
        } else {
            setStoreBtn('login_storeBtn');
        }
    };
    

    return(
        <div>
            { handlePw == false ? ( 
            <div className='unit_Prof'>
                <h5 className='login_info_title'>비밀번호</h5>
                <div className='unit_content'>
                    <p className='outline'>●●●●●●●●●</p>
                    <button
                        type="button"
                        className="unitAll_Btn"
                        onClick={() => { setHandlePw(true) }}
                        >변경
                    </button>
                </div>
            </div>
            ) : (
                <div>
                <div className='unitCh'>
                    <h5 className='group_title' style={{ marginBottom: '20px' }}>비밀번호 변경</h5>
                    <h5 className='login_titleCh'>이전 비밀번호</h5>
                    <input className={filterCss1}
                        placeholder='현재 비밀번호를 입력하세요'
                        onChange={(e) => handlePwChange(e, setCurrentPw, setFilterCss1)}
                    />
                </div>
                <div className='unitCh'>
                    <h5 className='login_titleCh'>새 비밀번호</h5>
                    <input className={filterCss2}
                        placeholder='영문,숫자,특수문자 조합 8-16자'
                        type="password"
                        onChange={(e) => handlePwChange(e, setNewPw, setFilterCss2)}
                    />
                </div>
                <div className='modify_btn_box'>
                    <button
                        type="button"
                        className="cancellBtn"
                        onClick={() => setHandlePw(false)}
                    >취소
                    </button>
                    <button
                        type="button"
                        className={storeBtn}
                        onClick={handleSave}
                    >저장
                    </button>
                </div>
            </div>
        )}
    </div>
);
}

export default PasswordChang;