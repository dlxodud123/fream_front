import { useState } from 'react';
import './../css/modal/detail_interest.css';
import { BsBookmarkFill } from "react-icons/bs";
import axios from 'axios';

const Detail_interest = (props) => {
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]); // 선택된 박스의 인덱스를 배열로 관리
  const [activeBox, setActiveBox] = useState(null); // 클릭 및 누르고 있는 박스의 인덱스를 상태로 관리
  const [finalSizeArr, setFinalSizeArr] = useState([]);

  const sizeArr = [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295];

  const axiosBaseURL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // 이 부분 추가
  });

  const handleBoxClick = (index) => {
    setSelectedBoxes(prevSelectedBoxes =>
      prevSelectedBoxes.includes(index)
        ? prevSelectedBoxes.filter(boxIndex => boxIndex !== index) // 이미 선택된 박스를 클릭하면 선택 해제
        : [...prevSelectedBoxes, index] // 새로운 박스를 클릭하면 선택
    );
  };

  const handleMouseDown = (index) => {
    setActiveBox(index); // 마우스 버튼을 누르면 현재 박스를 활성화
  };

  const handleMouseUp = () => {
    setActiveBox(null); // 마우스 버튼을 놓으면 박스 비활성화
  };

  // 박스의 기본 스타일과 선택된 스타일을 정의
  const getBoxStyle = (index) => ({
    borderRadius: '10px',
    border: selectedBoxes.includes(index) ? '1px solid black' : '1px solid rgb(0,0,0,0.3)',
    width: '150px',
    height: '50px',
    marginTop: '20px',
    paddingTop: '10px',
    marginLeft: index % 3 === 0 ? 0 : '20px',
    backgroundColor: activeBox === index ? 'rgba(0,0,0,0.1)' : 'white', // 클릭 및 누르고 있는 박스의 배경색
    color: 'black', // 선택된 박스의 글씨 색
    cursor: 'pointer',
    fontWeight: selectedBoxes.includes(index) ? 'bold' : 'normal' // 선택된 박스의 글씨 굵기
  });

  const finalSave = () => {
    const token = localStorage.getItem('jwtToken');
    const newFinalSizeArr = selectedBoxes.map((selected) => sizeArr[selected]);
    setFinalSizeArr(newFinalSizeArr);
    console.log("확인", typeof newFinalSizeArr);
    axiosBaseURL
      .post(`/api/wishes/toggle/${props.prId}/${newFinalSizeArr}`, {}, // 요청 본문이 필요 없는 경우 빈 객체로 전달
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then((data) => {
        console.log("data:", data);
        if (data.data && data.data.length > 0) {
          // 추가 로직 필요 시 여기에 작성
        }
      })
      .catch((error) => {
        console.log("실패함", error);
      });
  }

  return (
    <>
      <div style={{ height: "100px" }}>
        <button
          onClick={() => {
            setShowInterestModal(true);
          }}
          style={{
            width: "560px",
            height: "70px",
            marginTop: "15px",
            borderRadius: "10px",
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <BsBookmarkFill size={22} />
          <label>&nbsp;관심상품</label>
        </button>
      </div>

      {showInterestModal && (
        <div className={'interest_modal-container'}>
          <div className={'interest_modal-content'}>
            <span className="close" onClick={() => setShowInterestModal(false)} style={{fontSize:"30px", marginRight:"10px", marginTop:"-10px"}}>x</span>
            <p style={{ fontWeight: 'bold', fontSize: '19px', marginTop:"10px" }}>관심 상품 저장</p>
            <div style={{ height: '430px', overflowY: 'auto', boxSizing: 'content-box', marginLeft:"15px" }}>
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

              <div style={{ display: 'flex', marginRight: '20px' }}>
                {[235, 240, 245].map((size, index) => (
                  <div
                    key={index}
                    style={getBoxStyle(index + 3)} // 인덱스를 고유하게 만들기 위해 추가
                    onClick={() => handleBoxClick(index + 3)}
                    onMouseDown={() => handleMouseDown(index + 3)}
                    onMouseUp={handleMouseUp}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', marginRight: '20px' }}>
                {[250, 255, 260].map((size, index) => (
                  <div
                    key={index}
                    style={getBoxStyle(index + 6)} // 인덱스를 고유하게 만들기 위해 추가
                    onClick={() => handleBoxClick(index + 6)}
                    onMouseDown={() => handleMouseDown(index + 6)}
                    onMouseUp={handleMouseUp}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', marginRight: '20px' }}>
                {[265, 270, 275].map((size, index) => (
                  <div
                    key={index}
                    style={getBoxStyle(index + 9)} // 인덱스를 고유하게 만들기 위해 추가
                    onClick={() => handleBoxClick(index + 9)}
                    onMouseDown={() => handleMouseDown(index + 9)}
                    onMouseUp={handleMouseUp}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', marginRight: '20px' }}>
                {[280, 285, 290].map((size, index) => (
                  <div
                    key={index}
                    style={getBoxStyle(index + 12)} // 인덱스를 고유하게 만들기 위해 추가
                    onClick={() => handleBoxClick(index + 12)}
                    onMouseDown={() => handleMouseDown(index + 12)}
                    onMouseUp={handleMouseUp}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', marginRight: '20px' }}>
                {[295, 300, 305].map((size, index) => (
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
            </div>
            <div style={{ display: 'flex', textAlign: 'center', marginLeft: '90px', marginTop: '40px' }}>
              <div
                onClick={() => setShowInterestModal(false)}
                style={{
                  border: '1px solid rgb(0,0,0,0.3)',
                  width: '130px',
                  height: '50px',
                  borderRadius: '10px',
                  paddingTop: '10px',
                  cursor: 'pointer'
                }}
              >
                <p>취소</p>
              </div>
              <div
                onClick={() => {
                  setShowInterestModal(false); 
                  finalSave();
                }}
                style={{
                  border: '1px solid black',
                  width: '130px',
                  height: '50px',
                  marginLeft: '30px',
                  borderRadius: '10px',
                  paddingTop: '10px',
                  background: 'black',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <p>확인</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Detail_interest;
