
import React, { useState } from 'react';

function ModalSellEnd({ onClose, selectedButton, setSelectedButton }) {
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);

    const openModalProduct = (button) => {
        setSelectedButton(button);
        setIsModalProductOpen(true);
        onClose();
    };

    const closeModalProduct = () => {
        setIsModalProductOpen(false);
    };


    const btns = ['전체','취소완료','배송완료','반품완료','반품거부','교환완료','교환거부'];

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
                                                className={`productBtn ${btn === '취소완료' ||btn === '반품거부' || btn === '교환거부' ? 'special' : ''} ${btn === selectedButton ? 'focused' : ''}`}
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

export default ModalSellEnd;
