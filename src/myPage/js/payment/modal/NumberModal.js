import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const NumberPlateModal = ({ onSelect }) => {
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [selectedNumbers, setSelectedNumbers] = useState([]);//카드값 저장

    const shuffleNumbers = () => {
        const numbers = Array.from({ length: 10 }, (_, i) => i);
        const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
        setRandomNumbers(shuffledNumbers);
    };
    useEffect(() => {
        shuffleNumbers(); // 컴포넌트가 마운트될 때 숫자 셔플
    }, []);

    // const handleNumberSelect = (number) => {
    //     if (selectedNumbers.length < 4) {
    //         const newSelectedNumbers = [...selectedNumbers, number];
    //         setSelectedNumbers(newSelectedNumbers);
    //         if (newSelectedNumbers.length === 4) {
    //             const plate = newSelectedNumbers.join(''); // 배열을 문자열로 변환
    //             onSelect(plate);
    //         }
    //     }
    // };
    const handleNumberSelect = (number) => {
        onSelect(number.toString());
    };
    

    return (
        <div className="modalNum-background" onClick={() => onSelect([])}>
            <div className="modalNum-content" onClick={(e) => e.stopPropagation()}>
                <div className="number-buttons-container">
                    {randomNumbers.map((number) => (
                        <button
                            key={number}
                            className="number-button"
                            onClick={() => handleNumberSelect(number)}
                        >
                            {number}
                        </button>
                    ))}
                    <button className="arrow-button" onClick={() => onSelect('')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button className="arrow" onClick={shuffleNumbers}>
                        <span>재배열</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NumberPlateModal;
