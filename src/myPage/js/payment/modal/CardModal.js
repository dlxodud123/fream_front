import { useState, useRef } from "react";
import NumberPlateModal from './NumberModal.js'; // 번호판 모달 컴포넌트 임포트
import PersonalCard from "./division/personal_card.js";

function CardModal({ onClose }) {
    const [cardNumber, setCardNumber] = useState(['', '', '', '']);
    const [showNumberPlateModal, setShowNumberPlateModal] = useState(false); 
    const [currentInputIndex, setCurrentInputIndex] = useState(null);
    const inputRefs = useRef([]);
    const [pin, setPin] = useState(''); // 비밀번호 상태 추가
    const [expirationDate, setExpirationDate] = useState(''); // 유효기간 상태 추가
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [showPinInput, setShowPinInput] = useState(false);
    const [showExpirationDateInput, setShowExpirationDateInput] = useState(false);
    const [showDateOfBirthInput, setShowDateOfBirthInput] = useState(false);
    const [personalCardOpen, setPersonalCardOpen] =useState(false)

    const handleInputChange = () =>{
        setPersonalCardOpen(prev => !prev)
    }


    const handleContainerClick = (event) => {
        event.stopPropagation(); 
    };


    const handleCardNumberChange = (event, index) => {
        // 입력값을 막는 대신, 모달을 통해서만 값을 받습니다.
        if (index < 2) {
            let value = event.target.value.replace(/\D/g, '');
            value = value.slice(0, 4); 

            const newCardNumber = [...cardNumber];
            newCardNumber[index] = value;
            setCardNumber(newCardNumber);

            if (value.length === 4 && index < 3) {
                setCurrentInputIndex(index + 1);
                inputRefs.current[index + 1].focus(); 
                if (index === 1 || index === 2) {
                    setShowNumberPlateModal(true); 
                }
            }
             // 카드 번호 입력 완료 시 다음 단계로 이동
             if (newCardNumber.every(num => num.length === 4)) {
                setShowPinInput(true);
            }
        }
    };

    
    const handleNumberPlateSelect = (plate) => {
        if (typeof plate === 'string' && plate.length === 4) {
            const newCardNumber = [...cardNumber];
            newCardNumber[currentInputIndex] = plate;
            setCardNumber(newCardNumber);
            setShowNumberPlateModal(false);
            
            // 포커스 이동 및 모달 처리는 현재 입력 필드가 마지막이 아닌 경우에만 수행
            if (currentInputIndex < inputRefs.current.length - 1) {
                const nextIndex = currentInputIndex + 1;
                inputRefs.current[nextIndex].focus();
                setCurrentInputIndex(nextIndex);
            }

            // 카드 번호 입력 완료 시 다음 단계로 이동
            if (newCardNumber.every(num => num.length === 4)) {
                setShowPinInput(true);
            }
        } else {
            console.error('Invalid plate format:', plate);
        }
    };

    // const handleInputClick = (index) => {
    //     if (index === 2 || index === 3) {
    //         setCurrentInputIndex(index);
    //         setShowNumberPlateModal(true);
    //     }
    // };
    const handleInputClick = (index) => {
        setCurrentInputIndex(index);
        if (index >= 2 && index <= 3) {
            setShowNumberPlateModal(true);
        }
    };


    // 비밀번호 앞2자리
    const handlePinChange = (event) => {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length <= 2) {
            setPin(value);
            // 비밀번호 입력 완료 시 다음 단계로 이동
            if (value.length === 2) {
                setShowExpirationDateInput(true);
            }
        }
    };


    const handleExpirationDateChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // 모든 비숫자 문자를 제거
            if (value.length > 4) value = value.slice(0, 4); // 최대 4자리로 제한
        let month = value.slice(0, 2); // 월
        let year = value.slice(2); // 년도

        if (parseInt(month, 10) > 12) {
            month = '12';
        } 
        if (month.length === 1) {
            if (month === '1') {
                if (year.length > 0) {
                    month = '0' + month;
                }
            }
            else if (month === '0') {
                if (year.length > 0) {
                    month = '0' + month;
                }
            } else {
                month = '0' + month;
            }
        }
        const formattedDate = `${month}/${year}`;

        setExpirationDate(formattedDate);
        if (month.length === 2 && year.length === 2) {
            setShowDateOfBirthInput(true); // 유효기간 입력 완료 시 다음 단계로 이동
        }
    };

    const handleDateChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // 숫자만 남기기
        if (value.length > 8) value = value.slice(0, 8); // 최대 8자리로 제한
        let year = value.slice(0, 4);
        let month = value.slice(4, 6);
        let day = value.slice(6);
        if (month > 12) month = '12';
        if (day > 31) day = '31';
        if (month.length === 1) month = '0' + month;
        if (day.length === 1) day = '0' + day;
        let formattedDate = year;
        if (month) {
            formattedDate += `/${month}`;
        }
        if (day) {
            formattedDate += `/${day}`;
        }
        setDateOfBirth(formattedDate);
        setDateOfBirth(formattedDate);
        if (year.length === 4 && month.length === 2 && day.length === 2) {
            setDateOfBirth(formattedDate); // 생년월일 입력 완료 시 다음 단계로 이동
        }
    };


    return (
        <div className="product_layer">
            <div className="layer-background card-input" onClick={onClose}>
                <div className="cardContainer_arae card-bady" onClick={handleContainerClick}>
                    <div className="layer_cardContainer">
                        <div className="cardContainer">
                            <span>카드등록</span>
                        </div>
                        <div className="container_card">
                            <div className="card-btn-container">
                                <div className="card_header">
                                    카드 정보를 입력하고<br />
                                    간편하게 결제하세요.
                                </div>
                                {/*  */}

                                {personalCardOpen && (
                                    <PersonalCard 
                                        cardNumber={cardNumber}
                                        inputRefs={inputRefs}
                                        handleCardNumberChange={handleCardNumberChange}
                                        handleInputClick={handleInputClick}
                                        showPinInput={showPinInput}
                                        pin={pin}
                                        handlePinChange={handlePinChange}
                                        showExpirationDateInput={showExpirationDateInput}
                                        expirationDate={expirationDate}
                                        handleExpirationDateChange={handleExpirationDateChange}
                                        showDateOfBirthInput={showDateOfBirthInput}
                                        dateOfBirth={dateOfBirth}
                                        handleDateChange={handleDateChange}
                                    />
                                )}
                        </div>
                        <span>카드종류</span>
                                <div className="btn_cardGroup">
                                    <button className="card-btnStyle"
                                            onClick={handleInputChange}>개인 카드</button>
                                    <button className="card-btnStyle">법인 카드</button>
                                </div>
                                <p className="btnMsg">법인카드가 개인 명의인 경우 개인 카드를 선택해주세요.</p>
                    </div>
                        <div className="NextBtn_box">
                            <button className="Next_btn">다음</button>
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
    </div>
    );
}

export default CardModal;
