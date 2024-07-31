import axios from 'axios';
import { useState } from 'react';


function PasswordChang({date, setDate}){
    let [handlePw , setHandlePw] = useState(false);
    // const [userPw, setUserPw] = useState(''); //저장되어있던 pw
    const [oldPw, setOldPw] = useState(''); //저장확인용 pw
    const [newPw, setNewPw] = useState(''); //새로운 pw
    let [ filterCss1 , setFilterCss1 ] = useState('desc_pw')
    let [ filterCss2 , setFilterCss2 ] = useState('desc_pw')
    let [storeBtn, setStoreBtn ] = useState('login_storeBtn')

    const changePassword = async () => {
        console.log("oldPwwwww",oldPw)
        console.log("newPwwwww",newPw)
        try{
            const response = await axios.put('/api/my/profile/pwd',{
                                    oldPassword : oldPw,
                                    newPassword : newPw
        })
        console.log("dldii",response)
        console.log("response",response)
        if (response.status === 200) {
            const userData = response.data;
            console.log(userData)
            if (userData) {
                console.log('비밀번호 변경 성공:', userData);
                setDate(prevDate => ({
                    ...prevDate,
                    oldPw: newPw,
                }));
                setHandlePw(false);
            } 
        }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('비밀번호 변경 실패.');
                alert('이전 비밀번호가 일치하지 않습니다.');
            } else {
                console.error('An error occurred:', error);
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            }
        }
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
        if (pwPattern.test(oldPw) && pwPattern.test(newPw)) {
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
                        type="password"
                        placeholder='현재 비밀번호를 입력하세요'
                        onChange={(e) => handlePwChange(e, setOldPw, setFilterCss1)}
                        value={oldPw}
                    />
                </div>
                <div className='unitCh'>
                    <h5 className='login_titleCh'>새 비밀번호</h5>
                    <input className={filterCss2}
                        placeholder='영문,숫자,특수문자 조합 8-16자'
                        type="password"
                        onChange={(e) => handlePwChange(e, setNewPw, setFilterCss2)}
                        value={newPw}
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
                        onClick={changePassword}
                    >저장
                    </button>
                </div>
            </div>
        )}
    </div>
);
}

export default PasswordChang;