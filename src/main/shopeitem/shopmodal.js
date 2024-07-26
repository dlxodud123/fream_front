import React, { useState, useEffect } from 'react';

function Shopmodal({ selectedSize, confirmToggle, closeModal, showModal }) {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [activeBox, setActiveBox] = useState(null);

  useEffect(() => {
    setSelectedBoxes(selectedSize);
    setActiveBox(null);
  }, [showModal, selectedSize]);

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

  return (
    <>
      <div className={`modal ${showModal ? 'show' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p style={{ fontWeight: 'bold', fontSize: '19px' }}>관심 상품 저장</p>
          <div className="modalbox" style={{ height: '500px', overflowY: 'auto', boxSizing: 'content-box', paddingRight: '16px' }}>
            <span className="close" onClick={closeModal}>&times;</span>

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
              onClick={() => confirmToggle(selectedBoxes)}
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
