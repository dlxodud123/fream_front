import { useState } from 'react';


function EmailAdress(props){
    let [emailCange, setEmailCange] = useState(false);
    let [inputEmail, setInputEmail] = useState('');
    let [inputClassCh , setInputClassCh] = useState('desc_all')
    let [btnSaveCh , setBtnSaveCh] = useState('btnSaveCh')
return(
    <div>
        { emailCange == false ? (
        <div className='unit'>
            <h5 className='title'>이메일 주소</h5>
            <div className='unit_content'>
                <p className='outline'>date.email****</p>
                <button
                    type="button"
                    className="unitAll"
                    onClick={() => { setEmailCange(true) }}
                    >변경
                </button>
            </div>
        </div>
        ):(
        <div className='profile_group'>
            <div className='unitCh'>
                <h5 className='titleCh'>이메일 주소 변경</h5>
                <input className={inputClassCh}
                        placeholder={'dat.email'}
                        id='email'
                        onChange={(e)=>{setInputEmail(e.target.value)
                                            {
                                            const regex = /^[^@]+@[^@]+\.[^@]{1,}$/;
                                                if(regex.test(inputEmail)){
                                                    setInputClassCh('desc_all')
                                                    setBtnSaveCh('btnSaveCh')
                                                }else{
                                                    setInputClassCh('desc_emailEr')
                                                    setBtnSaveCh('btnSaveChEr')
                                                }
                                            }
                                        }} 
                    /> 
            </div>
            <div className='modify_btn_box'>
                <button
                    type="button"
                    className="btnCancellCh"
                    onClick={() => { setEmailCange(false) }}
                    >취소
                </button>
                <button
                    type="button"
                    className={btnSaveCh}
                    onClick={() => { }}
                    >인증 메일 발송
                </button>
            </div>
        </div>
        )}
    </div>
)
}

export default EmailAdress;