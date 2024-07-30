
import React, { useState } from 'react';

function Modal({ onClose, selectedButton, setSelectedButton }) {
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);

    const openModalProduct = (button) => {
        setSelectedButton(button);
        setIsModalProductOpen(true);
        onClose();
    };

    const closeModalProduct = () => {
        setIsModalProductOpen(false);
    };


    const btns = ['전체','대기중','발송완료','입고대기','입고완료','검수중','검수보류','검수합격','배송중',
                    '거래실패', '상품준비 중','반품신청','접수완료','회수중','회수완료','교환신청','교환중'];

    return (
        <div className="product_layer">
            <div className="layer-background" onClick={onClose}>
                <div className="productLayer_container" onClick={e => e.stopPropagation()}>
                    <div className="productLayer_header">
                        <div>
                            <h2 className="title_product">선택한 상태 보기</h2>
                        </div>
                        <div className="productChoB">
                            <div className="productCho">
                                <div className='head_product'>
                                    {btns.map((btn, index) => (
                                        <button key={index} 
                                                className={`productBtn ${btn === '검수보류' || btn === '거래실패' ? 'special' : ''} ${btn === selectedButton ? 'focused' : ''}`}
                                         onClick={() => openModalProduct(btn)}>
                                            {btn}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalProductOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModalProduct}>&times;</span>
                        <p>{selectedButton} 상태를 보고 있습니다.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
