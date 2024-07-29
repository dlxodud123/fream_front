import React, { useEffect, useState } from 'react';
import '../../css/address/addressLayer.css';
import DaumAddress from './SerchAddress.js';
import axios from 'axios';

function ModifyAddress({ onClose, name: initialName, phone: initialPhone, postcode: initialPostcode, address: initialAddress, detailAddress: initialDetailAddress, isDefault: initialIsDefault, id, fetchData }) {
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);
    const [postcode, setPostcode] = useState(initialPostcode);
    const [address, setAddress] = useState(initialAddress);
    const [detailAddress, setDetailAddress] = useState(initialDetailAddress || '');
    const [isDefaultDelivery, setIsDefaultDelivery] = useState(initialIsDefault);
    const [handleSearchButtonClick, setHandleSearchButtonClick] = useState(false);


    // useEffect(() => {
    //     setName(name);
    //     setPhone(phone);
    //     setPostcode(postcode);
    //     setAddress(address);
    //     setDetailAddress(initialDetailAddress);
    //     setIsDefaultDelivery(isDefault);

    // }, [name, phone, postcode, address, initialDetailAddress, isDefault]);

   

    const handleSave = async () => {
        try {
            await axios.put(`/api/my/address/${id}`, {
                id: id,
                name: name,
                phone: phone,
                postcode: postcode,
                address: address,
                detailAddress: detailAddress,
                isDefault: isDefaultDelivery ? '1' : '0',

            });
            fetchData(); // 부모 컴포넌트의 주소 목록을 다시 가져오기
            onClose(); // 모달 닫기
        } catch (error) {
            console.error("ModifyAddress :", error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'postcode':
                setPostcode(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'detailAddress':
                setDetailAddress(value);
                break;
            default:
                break;
        }
    };


    const handlePhoneChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, ''); // 숫자 외의 문자 제거
        setPhone(newValue);
    };


    const handleCancel = () => { //취소버튼
        onClose();
    };

    const handleCheckboxChange = (event) => {
        setIsDefaultDelivery(event.target.checked);
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
                                            name="name"
                                            value={name}
                                            onChange={handleInputChange}
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
                                            name="phone"
                                            value={phone}
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
                                            value={postcode}
                                            id="sample6_postcode"
                                            name="postcode"
                                            placeholder="우편 번호를 검색하세요"
                                            className='textAddress Num'
                                            readOnly
                                        />
                                         <button className='btn btn_zipcode small' 
                                                 onClick={() => setHandleSearchButtonClick(true)}>
                                        우편번호</button>

                                        {handleSearchButtonClick && <DaumAddress onClose={() => setHandleSearchButtonClick(false)} 
                                                                                 setPostcode={setPostcode} 
                                                                                 setAddress={setAddress} />}
                                    </div>
                                </div>

                                <div className='input_box'>
                                    <h4 className='input_title'>주소</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            id="sample6_address"
                                            name="address"
                                            value={address}
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
                                            onChange={handleInputChange}
                                            placeholder="건물,아파트,동/호수 입력"
                                            className='textAddress'
                                        />
                                    </div>
                                </div>

                                <div className='deliver_check'>
                                    <div className='checkbox'>
                                        <div className="form-check">
                                        <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={isDefaultDelivery}
                                                onChange={handleCheckboxChange}
                                            />
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
