
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Shopmodal({ isChecked, setIsChecked, closeModal, showModal, prId }) {
  const [selectedBoxes, setSelectedBoxes] = useState([]); // 선택된 박스의 인덱스를 배열로 관리
  const [activeBox, setActiveBox] = useState(null); // 클릭 및 누르고 있는 박스의 인덱스를 상태로 관리
  const [finalSizeArr, setFinalSizeArr] = useState([]);

  const sizeArr = [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295];

  const axiosBaseURL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // 이 부분 추가
  });


  const handleBoxClick = (index) => {
    setSelectedBoxes((prevSelectedBoxes) =>
      prevSelectedBoxes.includes(index)
        ? prevSelectedBoxes.filter((boxIndex) => boxIndex !== index)
        : [...prevSelectedBoxes, index]
    );
  };

  const handleMouseDown = (index) => {
    setActiveBox(index);
  };

  const handleMouseUp = () => {
    setActiveBox(null);
  };

  const getBoxStyle = (index) => ({
    borderRadius: '10px',
    border: selectedBoxes.includes(index) ? '1px solid black' : '1px solid rgb(0,0,0,0.3)',
    width: '150px',
    height: '50px',
    marginTop: '20px',
    paddingTop: '10px',
    marginLeft: index % 3 === 0 ? 0 : '20px',
    backgroundColor: activeBox === index ? 'rgba(0,0,0,0.1)' : 'white',
    color: 'black',
    cursor: 'pointer',
    fontWeight: selectedBoxes.includes(index) ? 'bold' : 'normal',
  });

  const finalSave = () => {
    const token = localStorage.getItem('jwtToken');
    const newFinalSizeArr = selectedBoxes.map((selected) => sizeArr[selected]);
    setFinalSizeArr(newFinalSizeArr);
    console.log("확인", typeof newFinalSizeArr);
    axiosBaseURL
    .post(`http://192.168.42.142:3001/wishes/toggle/${prId}/${newFinalSizeArr}`,{},
     // 요청 본문이 필요 없는 경우 빈 객체로 전달
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
    
      .then((data) => {
        console.log("data:", data);
        if (data.data && data.data.length > 0) {

        }
      })
      .catch((error) => {
        console.log("실패함", error);
      });

  }

  return (
    <>
      <div className={`modal ${showModal ? 'show' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p style={{ fontWeight: 'bold', fontSize: '19px' }}>관심 상품 저장</p>
          <div className="modalbox" style={{ height: '500px', overflowY: 'auto', boxSizing: 'content-box', paddingRight: '16px' }}>
            <span className="close" onClick={closeModal}>&times;</span>

<<<<<<< HEAD
            <div style={{ display: 'flex', marginRight: '20px' }}>
              {[220, 225, 230].map((size, index) => (
                <div
                  key={index}
                  style={getBoxStyle(index)}
                  onClick={() => handleBoxClick(index)}
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseUp={handleMouseUp}
                >
                  {size}
                </div>
              ))}
            </div>
=======
          <div style={{ display: 'flex', marginRight: '20px' }}>
            {[235, 240, 245].map((size, index) => (
              <div
                key={index}
                style={getBoxStyle(index + 3)} // 인덱스를 고유하게 만들기 위해 추가
                onClick={() => handleBoxClick(index+3)}
                onMouseDown={() => handleMouseDown(index + 3)}
                onMouseUp={handleMouseUp}
              >
                {size}
              </div>
            ))}
          </div>
>>>>>>> 5a650b3ab6d7857d73df27763e2d226734303e56

            <div style={{ display: 'flex', marginRight: '20px' }}>
              {[235, 240, 245].map((size, index) => (
                <div
                  key={index}
                  style={getBoxStyle(index + 3)}
                  onClick={() => handleBoxClick(index + 3)}
                  onMouseDown={() => handleMouseDown(index + 3)}
                  onMouseUp={handleMouseUp}
                >
                  {size}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', marginRight: '20px' }}>
              {[220, 250, 255].map((size, index) => (
                <div
                  key={index}
                  style={getBoxStyle(index + 6)}
                  onClick={() => handleBoxClick(index + 6)}
                  onMouseDown={() => handleMouseDown(index + 6)}
                  onMouseUp={handleMouseUp}
                >
                  {size}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', marginRight: '20px' }}>
              {[220, 260, 265].map((size, index) => (
                <div
                  key={index}
                  style={getBoxStyle(index + 9)}
                  onClick={() => handleBoxClick(index + 9)}
                  onMouseDown={() => handleMouseDown(index + 9)}
                  onMouseUp={handleMouseUp}
                >
                  {size}
                </div>
              ))}
            </div>

<<<<<<< HEAD
            <div style={{ display: 'flex', marginRight: '20px' }}>
              {[270, 275, 280].map((size, index) => (
                <div
                  key={index}
                  style={getBoxStyle(index + 12)}
                  onClick={() => handleBoxClick(index + 12)}
                  onMouseDown={() => handleMouseDown(index + 12)}
                  onMouseUp={handleMouseUp}
                >
                  {size}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', marginRight: '20px' }}>
              {[285, 290, 295].map((size, index) => (
                <div
                  key={index}
                  style={getBoxStyle(index + 15)}
                  onClick={() => handleBoxClick(index + 15)}
                  onMouseDown={() => handleMouseDown(index + 15)}
                  onMouseUp={handleMouseUp}
                >
                  {size}
                </div>
              ))}
            </div>
=======
          <div style={{ display: 'flex', marginRight: '20px' }}>
            {[285, 290, 295].map((size, index) => (
              <div
                key={index}
                style={getBoxStyle(index + 15)} // 인덱스를 고유하게 만들기 위해 추가
                onClick={() => handleBoxClick(index + 15)}
                onMouseDown={() => handleMouseDown(index + 15)}
                onMouseUp={handleMouseUp}
              >
                {size}
              </div>
            ))}
          </div>
>>>>>>> 5a650b3ab6d7857d73df27763e2d226734303e56
          </div>
          <div style={{ display: 'flex', textAlign: 'center', marginLeft: '80px', marginTop: '40px' }}>
            <div
              onClick={closeModal}
              style={{
                border: '1px solid rgb(0,0,0,0.3)',
                width: '130px',
                height: '50px',
                borderRadius: '10px',
                paddingTop: '10px',
                cursor: 'pointer',
              }}
            >
              <p>취소</p>
            </div>
            <div
<<<<<<< HEAD
              onClick={() => confirmToggle(selectedBoxes)}
=======
              onClick={() => {
                // 확인 버튼 클릭 시 추가 로직을 넣을 수 있습니다.
                closeModal(); // 모달 닫기
                finalSave();
              }}
>>>>>>> 5a650b3ab6d7857d73df27763e2d226734303e56
              style={{
                border: '1px solid black',
                width: '130px',
                height: '50px',
                marginLeft: '30px',
                borderRadius: '10px',
                paddingTop: '10px',
                background: 'black',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <p>확인</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shopmodal;
