
import React from 'react';


function SellingModal({ onClose, selectedButton, setSelectedButton }) {

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        onClose();
    };


    return (
        <div className="product_layer">
            <div className="layer-background" onClick={onClose}>
                <div className="productLayer_container">
                    <div className="productLayer_header">
                        <div>
                            <h2 className="title_product">선택한 상태 보기</h2>
                        </div>
                        <div className="productChoB">
                            <div className="productCho">
                                <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', justifyContent: 'center' }}>
                                    <li>
                                    <button 
                                            className={`productBtn ${selectedButton === '전체' ? 'focused' : ''}`}
                                            onClick={() => handleButtonClick('전체')}>
                                            <span>전체</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`productBtn ${selectedButton === '입찰 중' ? 'focused' : ''}`}
                                            onClick={() => handleButtonClick('입찰 중')}>
                                            <span>입찰 중</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`productBtn ${selectedButton === '기한만료' ? 'focused' : ''}`}
                                            onClick={() => handleButtonClick('기한만료')}>
                                            <span style={{color:'red'}}>기한만료</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellingModal;
