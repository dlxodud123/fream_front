import React, { useEffect, useState } from 'react';
import '../../css/address/addressLayer.css';
import DaumAddress from './SerchAddress.js';
import axios from 'axios';

function AddresLayer({ onClose, date, setDate }) {
    const [recipient, setRecipient] = useState('');
    const [ponNum, setPonNum] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [handleSearchButtonClick, setHandleSearchButtonClick] = useState(false);
    const [isDefaultDelivery, setIsDefaultDelivery] = useState('0');

    const handleSave = async () => {
        const data = {
            recipient,
            ponNum,
            postcode,
            address,
            detailAddress,
        };
        try {
            const response = await axios.post('/api/my/addres', data);
            console.log('Success:', response.data);
          } catch (error) {
              console.error('Error:', error);
          }
    };
  

    const handleCancel = () => {
        onClose();
    };

    const toggleLayer = () => {
      setHandleSearchButtonClick(!handleSearchButtonClick);
    };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'detailAddress') {
        setDetailAddress(value);
    }
    };

    const handleCheckboxChange = (event) => {
        setIsDefaultDelivery(event.target.checked);
        console.log(isDefaultDelivery)
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
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
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
                                value={ponNum}
                                onChange={(e) => setPonNum(e.target.value)}
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
                                value={postcode}
                                id="sample6_postcode"
                                name="postcode"
                                placeholder="우편 번호를 검색하세요"
                                className='textAddress Num'
                                readOnly
                                />
                            <button className='btn btn_zipcode'
                                    onClick={()=>setHandleSearchButtonClick(true)}>우편번호</button>
                                      {handleSearchButtonClick && <DaumAddress onClose={toggleLayer}
                                                                                setPostcode={setPostcode}
                                                                                setAddress={setAddress}
                                                                               />}
                        </div>
                    </div>

                    <div className='input_box'> {/* error class 변경해야함 */}
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

                    <div className='input_box'> {/* error class 변경해야함 */}
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
                        <div class="form-check">
                            <input class="form-check-input" 
                                    type="checkbox"
                                    onChange= {handleCheckboxChange}
                                    value="1" />
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
                <button className='outlineegrey medium save' onClick={handleSave}>저장하기</button>
            </div>
            </div>
        </div>
    </div>
    </div>

)
}

export default AddresLayer;