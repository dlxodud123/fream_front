import { useState } from "react";



function PointModal({ onClose }) {
    const [ pointCode, setPointCode ] = useState('')
    const [ butColorch, setButColorch] = useState("point-Btn solid")


    const handleContainerClick = (event) => {
        event.stopPropagation(); 
    };

    const handleClassCh = (event) => {
        const value = event.target.value;
        setPointCode(value);
        if (value) {
            setButColorch("point-Btn solid active");
        }
    };
    const handleCancel = () => {
        onClose(); // 모달 닫기
    };

    return (
        <div className="product_layer">
            <div className="layer-background" onClick={onClose}>
                <div className="pointModal_area" onClick={handleContainerClick}>
                    <div className="layer_cardContainer">
                        <div className="cardContainer">
                            <h2 className="modal_header">포인트 적립</h2>
                        </div>
                        <div className="point_layerContent">
                            <div className="point_header">
                                <h4>포인트 코드</h4>
                                <div>
                                    <input className="pointCode"
                                           onChange={handleClassCh}
                                        placeholder="쿠폰 코드를 입력하세요."/>
                                </div>
                            </div>
                            <p className="descriptionMsg">
                                • 유효기간이 지난 쿠폰 코드는 등록이 불가합니다.<br />
                                • 쿠폰에 따라 발급 수량 및 계정당 사용 횟수가 제한될 수 있습니다.
                            </p>
                        </div>
                            <div className="point-layerBtn"> 
                                <button className="point-Btn Outline"
                                        onClick={handleCancel}>취소</button>
                                <button className={butColorch}>적립하기</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PointModal;
