import React, { useEffect, useState } from 'react';
import '../../css/address/addressLayer.css';
import DaumAddress from './SerchAddress.js';
import axios from 'axios';

function ModifyAddress({ fetchData, onClose, name: initialName, phone: initialPhone, postalCode: initialPostcode, city: initialcity, street: initialStreet, isDefault: initialIsDefault, address_id :initialAddress_id, handleSave  }) {
    const [address_id, setAddress_id] = useState(initialAddress_id);
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);
    const [postalCode, setPostalCode] = useState(initialPostcode);
    const [city, setCity] = useState(initialcity);
    const [street, setStreet] = useState(initialStreet || '');
    const [isDefaultDelivery, setIsDefaultDelivery] = useState(initialIsDefault);
    const [handleSearchButtonClick, setHandleSearchButtonClick] = useState(false);
    const [phoneError, setPhoneError] = useState(false);


    // const saveAddress = async () => {
    //     try {
    //         const updatedAddress = {
    //             address_id,
    //             name,
    //             phone,
    //             postalCode,
    //             city,
    //             street,
    //             isDefault: isDefaultDelivery ? '1' : '0'
    //         };
    //         // PUT 요청을 통해 주소를 수정
    //         await axios.put(`/api/my/address`, updatedAddress);
    //         fetchData(); // 부모 컴포넌트의 주소 목록을 다시 가져오기
    //         onClose(); // 모달 닫기
    //     } catch (error) {
    //         console.error("ModifyAddress :", error);
    //     }
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'postalCode':
                setPostalCode(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'street':
                setStreet(value);
                break;
            default:
                break;
        }
    };


    const handlePhoneChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, ''); // 숫자 외의 문자 제거
        if (newValue.startsWith("010")) {
            setPhone(newValue);
            setPhoneError(false);
        } else {
            setPhoneError(true);
        }
    };


    const handleCancel = () => { //취소버튼
        onClose();
    };

 
    const isFormValid = () => {
        return name && phone && postalCode && city && street;
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
                                            value={postalCode}
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
                                                                                 setPostalCode={setPostalCode} 
                                                                                 setCity={setCity} />}
                                    </div>
                                </div>

                                <div className='input_box'>
                                    <h4 className='input_title'>주소</h4>
                                    <div className="input_item">
                                        <input
                                            type="text"
                                            id="sample6_address"
                                            name="city"
                                            value={city}
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
                                            name="street"
                                            value={street}
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
                                                onChange={(e) => setIsDefaultDelivery(e.target.checked)}
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
                            <button className={`outlineegrey medium save ${isFormValid() ? 'valid' : ''}`} 
                                    onClick={handleSave}
                                    disabled={!isFormValid()}
                >저장하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModifyAddress;
