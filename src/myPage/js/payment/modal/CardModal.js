import { useState } from "react";
import NumberPlateModal from './NumberModal.js'; // 번호판 모달 컴포넌트 임포트


function CardModal({ onClose }) {


    const [cardNumber, setCardNumber] = useState(['', '', '', '']);
    const [thirdDigit, setThirdDigit] = useState('');
    const [fourthDigit, setFourthDigit] = useState('');
    // 카드 등록 모달창 닫힘 막음
    const handleContainerClick = (event) => {
        event.stopPropagation(); 
    };
    // 번호판 모달 상태
    const [showNumberPlateModal, setShowNumberPlateModal] = useState(false); 

    const handleCardNumberChange = (event, index) => {
        let value = event.target.value.replace(/\D/g, ''); // 숫자만 남기기
        value = value.slice(0, 4); // 최대 4자리까지만 허용
        
        const newCardNumber = [...cardNumber];
        newCardNumber[index] = value;
        setCardNumber(newCardNumber);
        if (index === 2) {
            setThirdDigit(value);
        } else if (index === 3) {
            setFourthDigit(value);
        }
    };
    const handleInputClick = (index) => {
        if (index === 2) { // 3번째 입력 필드 클릭 시
            setShowNumberPlateModal(true);
        }
    };
   const handleNumberPlateSelect = (plate) => {
        setCardNumber([cardNumber[0], cardNumber[1], plate, cardNumber[3]]);
        setThirdDigit(plate.charAt(0)); // 번호판의 첫 번째 숫자를 세 번째 숫자로 설정
        setFourthDigit(plate.charAt(1)); // 번호판의 두 번째 숫자를 네 번째 숫자로 설정
        setShowNumberPlateModal(false);
    };


    return (
        <div className="product_layer">
            <div className="layer-background" onClick={onClose}>
                <div className="cardContainer_arae" onClick={handleContainerClick}>
                    <div className="layer_cardContainer">
                        <div className="cardContainer">
                            <span>카드등록</span>
                        </div>
                        <div className="container_card">
                            <div className="card_header">
                                카드 정보를 입력하고<br />
                                간편하게 결제하세요.
                            </div>
                            <div className="card-btn-container">
                                <div className="cardType">
                                    <p>카드 번호</p>
                                    <div className="cardNumInput">
                                        {cardNumber.map((num, index) => (
                                            <div key={index} className="cardNumOpen">
                                                <input
                                                    value={num}
                                                    onChange={(e) => handleCardNumberChange(e, index)}
                                                    onClick={()=>handleInputClick(index) }
                                                    maxLength="4"
                                                    placeholder="0000"
                                                    className="cardInput"
                                                />
                                                {index < cardNumber.length - 1 && <span className="divide">-</span>}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="form_feedback">올바른 카드번호를 입력해주세요.</p>
                                </div>


                                    <span>카드종류</span>
                                    <div className="btn_cardGroup">
                                        <button className="card-btnStyle">개인 카드</button>
                                        <button className="card-btnStyle">법인 카드</button>
                                    </div>
                                    <p className="btnMsg">법인카드가 개인 명의인 경우 개인 카드를 선택해주세요.</p>
                            </div>
                        </div>
                        <div className="NextBtn_box">
                            <button className="Next_btn">다음</button>
                        </div>
                    </div>
                </div>
            </div>
            {showNumberPlateModal && (
                <NumberPlateModal 
                    onClose={() => setShowNumberPlateModal(false)} 
                    onSelect={handleNumberPlateSelect} 
                />
            )}
        </div>
    );
}

export default CardModal;
