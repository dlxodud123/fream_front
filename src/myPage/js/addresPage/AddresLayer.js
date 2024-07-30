import React, { useEffect, useState } from 'react';
import '../../css/address/addressLayer.css';
import DaumAddress from './SerchAddress.js';
import axios from 'axios';

function AddresLayer({ onClose, setDate }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(''); 
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); 
    const [isDefaultDelivery, setIsDefaultDelivery] = useState(false);
    
    const handleSave = async () => {
        const data = {
            address_id:null,
            userId: null,
            name: name,
            phone: phone,
            postalCode: postalCode,
            city: city,
            street: street,
            isDefault: isDefaultDelivery ? '1' : '0',
        };
        try {
            const response = await axios.post('/api/my/address', data);
            console.log('Success:', response.data);
            setDate(response.data); // 부모 컴포넌트의 상태 업데이트
            onClose(); // 모달 닫기
          } catch (error) {
              console.error('Error:', error);
          }
    };
  

    const handleCancel = () => {
        onClose();
    };

    const toggleSearchModal  = () => {
        setIsSearchModalOpen(!isSearchModalOpen);
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


    const handleCheckboxChange = (event) => {
        setIsDefaultDelivery(event.target.checked);
        console.log(isDefaultDelivery)
    };
    const isFormValid = () => {
        return name && phone && postalCode && city && street;
    };



    return(
    <div className='layer_lg'>
        <div className='layer-background'>
            <div className='layer_container'>
                <div className='layer-header'>
                    <h2 className='title_layer'>새주소 추가</h2>
                </div>

        <div className='layer_content'>  {/* class없음 */}
            <div className="delivery_bind">
                <div className='delivery_input'>
                    <div className='input_box'> {/* error class 변경해야함 */}
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
                    
                    <div className='input_box'> {/* error class 변경해야함 */}
                        <h4 className='input_title'>휴대폰 번호</h4>
                        <div className="input_item">
                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={handleInputChange}
                                placeholder="-없이입력"
                                className='textAddress phone'
                                />
                                <p className='input_error'>정확한 휴대폰 번호를 입력해 주세요</p>
                        </div>
                    </div>

                    <div className='input_box'> {/* error class 변경해야함 */}
                        <h4 className='input_title'>우편번호</h4>
                        <div className="input_item">
                            <input
                                type="text"
                                value={postalCode}
                                id="sample6_postcode"
                                name="postalCode"
                                placeholder="우편 번호를 검색하세요"
                                className='textAddress Num'
                                readOnly
                                />
                            <button className='btn btn_zipcode'
                                    onClick={toggleSearchModal}>
                                        우편번호
                            </button>
                            {isSearchModalOpen  && <DaumAddress onClose={toggleSearchModal}
                                                                    setPostalCode={setPostalCode}
                                                                    setCity={setCity}
                                                                    />}
                        </div>
                    </div>

                    <div className='input_box'> {/* error class 변경해야함 */}
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

                    <div className='input_box'> {/* error class 변경해야함 */}
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
                        <div class="form-check">
                            <input class="form-check-input" 
                                    type="checkbox"
                                    checked={isDefaultDelivery}
                                    onChange={handleCheckboxChange}/>
                            <label class="form-check-label" htmlFor="flexCheckDefault">
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

)
}

export default AddresLayer;