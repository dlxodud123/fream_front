import React, { useState } from 'react';
import '../../css/shoes_sizeLayer.css';

function Layer({ onConfirm ,onClose, date, setDate  }) {
    const sizes = ['220', '225', '230', '235', '240', '245', '250', 
                    '255', '260', '265', '270', '275', '280', '285', '290', '295', '300'];
    let [ newSize, setNewSize] = useState(null);

    const handleSizeClick = (uSize) => {
        setNewSize(uSize);
        // console.log(size)//싸이즈 확인
    };
    const handleConfirmClick = () => {
        if (newSize !== null) {
            onConfirm(newSize);  // 부모 컴포넌트로 선택한 사이즈 전달
            onClose();
        } 
        // else {
        //     alert('사이즈를 선택해주세요.');
        // }
    };

    // const handleConfirmClick = async () => {
    //     if (newSize !== null) {
    //         try {
    //             const response = await axios.post('/api/my/profile', { size: newSize });
    //             console.log('Size selected:', response.data);
    //             onConfirm(newSize);
    //             onClose();
    //         } catch (error) {
    //             console.error('Error selecting size:', error);
    //             alert('사이즈 선택 중 오류가 발생했습니다.');
    //         }
    //     } else {
    //         alert('사이즈를 선택해주세요.');
    //     }
    // };




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
                                {sizes.map(uSize => (
                                <div 
                                key={uSize} 
                                className={`col size_item ${newSize === uSize ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(uSize)}>
                                <span>{uSize}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='shoes_size_layerBtn'>
                        <button className='shoes_con' 
                                onClick={handleConfirmClick}>
                        확인</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layer;
