
import { useState } from "react";

function EmailAdress({ date, userEmail }) {
    let [emailChange, setEmailChange] = useState(false);
    let [inputEmail, setInputEmail] = useState('');
    let [inputClassCh, setInputClassCh] = useState('desc_all');
    let [btnSaveCh, setBtnSaveCh] = useState('btnSaveCh');

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setInputEmail(value);

        const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
        if (value === '') {
            setInputClassCh('desc_all');
            setBtnSaveCh('btnSaveCh');
        } else if (regex.test(value)) {
            setInputClassCh('desc_all');
            setBtnSaveCh('btnSaveCh');
        } else {
            setInputClassCh('desc_emailEr');
            setBtnSaveCh('btnSaveChEr');
        }
    };

    return (
        <div>
            {emailChange === false ? (
                <div className='unit_Prof'>
                    <h5 className='login_info_title'>이메일 주소</h5>
                    <div className='unit_content'>
                        <p className='outline'>{date.userEmail}</p>
                        <button
                            type="button"
                            className="unitAll_Btn"
                            onClick={() => setEmailChange(true)}
                        >변경
                        </button>
                    </div>
                </div>
            ) : (
                <div className='profile_group'>
                    <div className='unitCh'>
                        <h5 className='login_titleCh'>이메일 주소 변경</h5>
                        <input
                            className={inputClassCh}
                            placeholder={userEmail} // 수정
                            id='email'
                            value={inputEmail}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className='modify_btn_box'>
                        <button
                            type="button"
                            className="cancellBtn"
                            onClick={() => setEmailChange(false)}
                        >취소
                        </button>
                        <button
                            type="button"
                            className={btnSaveCh}
                            onClick={() => { /* 여기에 이메일 발송 로직 추가 */ }}
                        >인증 메일 발송
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmailAdress;
