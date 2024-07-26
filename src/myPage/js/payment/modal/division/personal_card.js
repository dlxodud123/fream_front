import React from 'react';

function PersonalCard({
    cardNumber,
    inputRefs,
    handleCardNumberChange,
    handleInputClick,
    showPinInput,
    pin,
    handlePinChange,
    showExpirationDateInput,
    expirationDate,
    handleExpirationDateChange,
    showDateOfBirthInput,
    dateOfBirth,
    handleDateChange
}) {
    return(
        <div>
        <div className="cardType">
                                <p>카드 번호</p>
                                <div className="cardinput_area">
                                    <div className="cardNumInput">
                                        {cardNumber.map((num, index) => (
                                            <div key={index} className="cardNumOpen">
                                                <input
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                    value={num}
                                                    onChange={(e) => handleCardNumberChange(e, index)}
                                                    onClick={() => handleInputClick(index)}
                                                    maxLength="4"
                                                    placeholder="0000"
                                                    className="cardInput"
                                                />
                                                {index < cardNumber.length - 1 && <span className="divide">-</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="form_feedback">올바른 카드번호를 입력해주세요.</p>
                            </div>

                            {showPinInput && (
                                <div className="cardType">
                                    <p>비밀 번호</p>
                                    <div className="cardinput_area">
                                        <div className="cardNumInput">
                                            <div className="cardNumOpen">
                                                <input
                                                    type="password"
                                                    value={pin}
                                                    onChange={handlePinChange}
                                                    maxLength="2"
                                                    placeholder="••"
                                                    className="cardInput"
                                                />••
                                            </div>
                                        </div>
                                    </div>
                                    <p className="form_feedback">비밀번호 앞 2자리</p>
                                </div>
                            )}

                            {showExpirationDateInput && (
                                <div className="cardType">
                                    <p>유효기간</p>
                                    <div className="cardinput_area">
                                        <div className="cardNumInput">
                                            <div className="cardNumOpen">
                                                <input
                                                    type="tel"
                                                    value={expirationDate}
                                                    onChange={handleExpirationDateChange}
                                                    placeholder="MM/YY"
                                                    className="expiration period"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="form_feedback">올바른 유효기간을 입력해주세요</p>
                                </div>
                            )}

                            {showDateOfBirthInput && (
                                <div className="cardType">
                                    <p>생년월일</p>
                                    <div className="cardinput_area">
                                        <div className="cardNumInput">
                                            <div className="cardNumOpen">
                                                <input
                                                    type="tel"
                                                    value={dateOfBirth}
                                                    onChange={handleDateChange}
                                                    placeholder="YYYY/MM/DD"
                                                    className="expiration period"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="form_feedback">카드 소유자 생년월일 8자리 (예:1000/12/01)</p>
                                </div>
                            )}
                            </div>
    )
}

export default PersonalCard;