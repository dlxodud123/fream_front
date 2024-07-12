import React, { useState } from 'react';
import '../../css/shoes_sizeLayer.css';

function Layer({ onConfirm ,onClose  }) {
    const sizes = [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300];
    let [ selecteSize, setSelecteSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelecteSize(size);
        console.log(size)//싸이즈 확인
    };

    const handleConfirmClick = () => {
        if (selecteSize !== null) {
            onConfirm(selecteSize);
        }
        onClose();
    };

    return (
        <div className='layer_lg'>
            <div className="layer-background">
                <div className='layer-container'>
                    <div className='layer-title'>
                        <h2 >사이즈 선택</h2>
                    </div>
                    <div className="overflow-auto">
                        <div className='info_size_list'>
                            <div className="row row-cols-3"
                                 style={{margin: '0px', backgroundColor: '#fff'}}>
                                {sizes.map(size => (
                                <div 
                                key={size} 
                                className={`col size_item ${selecteSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}>
                                <span>{size}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='shoes_size_layerBtn'>
                        <button className='shoes_con' onClick={handleConfirmClick}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layer;
