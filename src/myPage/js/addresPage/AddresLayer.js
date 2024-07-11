import React, { useState } from 'react';
import '../../css/address/address.css';

function AddresLayer({onClose}) {
    const [newAddress, setNewAddress] = useState('');

    const handleCancel = () => {
        onClose();
    };

    const handleSave = ()=>{

    }

return(
    <div className='ovdrflowLi- h'>
        <div className="layer-background">
            <div className='layer-container'>
                <div className='layer-header'>
                    <h2 className='layer-title'>새주소 추가</h2>
                </div>
                <div>
                <div className="overflow-auto">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="이름"
                    className="new-address-input"
                />
                </div>
                <div className="overflow-auto">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="휴대폰 번호"
                    className="new-address-input"
                />
                </div>
                <div className="overflow-auto">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="주소"
                    className="new-address-input"
                />
                </div>
                <div className="overflow-auto">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="새 주소 입력"
                    className="new-address-input"
                />
                </div>
                <div className="overflow-auto">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="상세 주소"
                    className="new-address-input"
                />
                </div>
                <div className="overflow-auto">
                <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="새 주소 입력"
                    className="new-address-input"
                />
                </div>
               
                </div>
                <div className='layer_btn'>
                    <button onClick={handleCancel}>취소</button>
                    <button onClick={handleSave}>저장하기</button>
                </div>
            </div>
        </div>
    </div>
)
}

export default AddresLayer;