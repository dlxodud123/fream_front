import React, { useEffect, useState } from 'react';
import '../../css/address/addressLayer.css';
import DaumAddress from './SerchAddress.js';
import axios from 'axios';

function AddresLayer({ onClose }) {
    const [recipient, setRecipient] = useState('');
    const [ponNum, setPonNum] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [handleSearchButtonClick, setHandleSearchButtonClick] = useState(false); // 상태 변수 추가

    const axiosBaseURL = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    const ModifyAddress = async () => {
      const data = {
          recipient,
          ponNum,
          postcode,
          address,
          detailAddress,
      };
      try {
        const response = await 
        axiosBaseURL.get('http://localhost:3000/my/addres', {
          //fetch('http://localhost:3000/my/profile-edit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log('Success:', result);
          
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
      

    return(
    <div className='layer_container'>
        <div className='layer-head---'>
        <div className='layer-header'>
            <h2 className='title_layer'>배송지 수정</h2>
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
                                    className='text'
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
                                className='text'
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
                                className='text'
                                readOnly
                                />
                            <button className='btn btn_zipcode samll'
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
                                className='text'
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
                                className='text'
                                />
                        </div>
                    </div>
                <div className='deliver_check'>
                    <div className='checkbox'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" />
                            <label class="form-check-label" for="flexCheckDefault">
                                기본배송지로 설정
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className='btnLayer'>
                <button className='outlineegrey medium' onClick={() => setIsEditing(false)}>취소</button>
                <button className='outlineegrey medium save' onClick={saveEdit}>저장하기</button>
            </div>
            </div>
        </div>
    </div>
)
}

export default ModifyAddress;


