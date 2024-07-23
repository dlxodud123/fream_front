import React, { useEffect, useState } from 'react';
import '../../css/address/addressLayer.css';
import DaumAddress from './SerchAddress.js';
import axios from 'axios';

function ModifyAddress({onClose, recipient, phone, postcode, address, id}) {
    const [recipientState, setRecipientState] = useState(recipient);
    const [phoneState, setPhoneState] = useState(phone);
    const [postcodeState, setPostcodeState] = useState(postcode);
    const [addressState, setAddressState] = useState(address);
    const [detailAddress, setDetailAddress] = useState('');
    const [handleSearchButtonClick, setHandleSearchButtonClick] = useState(false);

    const handleSave = async () => {
        try {
            await axios.put(`/api/my/address/${id}`, {
                id: address.id,
                recipient: recipientState,
                phone: phoneState,
                postcode: postcodeState,
                address: addressState,
                detailAddress
            });
            onClose(); 
        } catch (error) {
            console.error("ModifyAddress :", error);
        }
    };

    const handlePhoneChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, ''); // 숫자 외의 문자 제거
        setPhoneState(newValue);
    };


    const handleCancel = () => { //취소버튼
        onClose();
    };

    return (
        <div className='layer_lg'>
            <div className='layer-background'>
                <div className='layer_container'>
                    <div className='layer-header'>
                        <h2 className='title_layer'>배송지 수정</h2>
                    </div>

                    <div className='layer_content'>
                        <div className="delivery_bind">
                            <div className='delivery_input'>
                                <div className='input_box'>
                                    <h4 className='input_title'>이름</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            name="reciever"
                                            value={recipientState}
                                            onChange={(e) => setRecipientState(e.target.value)}
                                            placeholder="수령인의 이름"
                                            className='textAddress Name'
                                        />
                                        <p className='input_error'>올바른 이름을 입력해 주세요</p>
                                    </div>
                                </div>

                                <div className='input_box'>
                                    <h4 className='input_title'>휴대폰 번호</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            name="ponNum"
                                            value={phoneState}
                                            onChange={handlePhoneChange}
                                            placeholder="-없이 입력"
                                            className='textAddress phone'
                                        />
                                        <p className='input_error'>정확한 휴대폰 번호를 입력해 주세요</p>
                                    </div>
                                </div>

                                <div className='input_box'>
                                    <h4 className='input_title'>우편번호</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            value={postcodeState}
                                            id="sample6_postcode"
                                            name="postcode"
                                            placeholder="우편 번호를 검색하세요"
                                            className='textAddress Num'
                                            readOnly
                                        />
                                        <button className='btn btn_zipcode small' onClick={() => setHandleSearchButtonClick(true)}>우편번호</button>
                                        {handleSearchButtonClick && <DaumAddress onClose={() => setHandleSearchButtonClick(false)} setPostcode={setPostcodeState} setAddress={setAddressState} />}
                                    </div>
                                </div>

                                <div className='input_box'>
                                    <h4 className='input_title'>주소</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            id="sample6_address"
                                            name="address"
                                            value={addressState}
                                            placeholder="우편번호 검색 후, 자동입력 됩니다"
                                            className='textAddress Num'
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className='input_box'>
                                    <h4 className='input_title'>상세주소</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            id="sample6_detailAddress"
                                            name="detailAddress"
                                            value={detailAddress}
                                            onChange={(e) => setDetailAddress(e.target.value)}
                                            placeholder="건물,아파트,동/호수 입력"
                                            className='textAddress'
                                        />
                                    </div>
                                </div>

                                <div className='deliver_check'>
                                    <div className='checkbox'>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="1" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                기본배송지로 설정
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='btnLayer'>
                            <button className='outlineegrey medium' onClick={handleCancel}>취소</button>
                            <button className='outlineegrey medium save' onClick={handleSave }>저장하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModifyAddress;
