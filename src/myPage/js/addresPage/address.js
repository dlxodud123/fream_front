import Header from "../../../common/header";
import MypageList from "../MypageList";
import '../../css/address/address.css';
import { useState, useEffect } from "react";
import AddresLayer from './AddresLayer.js';
import Footer from "../../../common/footer";
import DaumAddress from "./SerchAddress";
import ModifyAddress from './Modify_address.js';

const Address = () => {
    const [addressLayer, setAddressLayer] = useState(false);
    const [addressArry, setAddressArry] = useState([]); // 주소 데이터를 저장할 배열
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [recipient, setRecipient] = useState("");
    const [phone, setPhone] = useState("");

//   useEffect(() => {
//         // 여기서 실제 데이터 fetch를 구현합니다. 현재는 더미 데이터를 사용합니다.
//         const fetchData = async () => {
//             const response = await fetch('/api/address'); // 실제 API 엔드포인트로 변경하세요
//             const data = await response.json();
//          setAddressArry(data);
//         };
//          fetchData();
//         }, []);


// 더미 데이터 생성
    useEffect(() => {
            const fetchData = async () => {
            const dummyData = [
                {
                    recipient: "홍길동",
                    phone: "010-1234-5678",
                    postcode: "12345",
                    address: "서울특별시 강남구 테헤란로 123",
                    isDefault: true
                },
                {
                    recipient: "김철수",
                    phone: "010-9876-5432",
                    postcode: "67890",
                    address: "부산광역시 해운대구 해운대해변로 456",
                    isDefault: false
                },
                {
                    recipient: "이영희",
                    phone: "010-1111-2222",
                    postcode: "54321",
                    address: "대구광역시 중구 중앙대로 789",
                    isDefault: false
                }
            ];
            setAddressArry(dummyData);
        };

        fetchData();
    }, []);

    const toggleLayer = () => {
        setAddressLayer(!addressLayer);
    };

    const setDefaultAddress = (index) => {
        const newAddressArry = [...addressArry];
        const [defaultAddress] = newAddressArry.splice(index, 1); // 클릭된 주소 제거
        defaultAddress.isDefault = true; // 기본 배송지로 설정
        newAddressArry.forEach((address) => address.isDefault = false); // 나머지 주소 기본 배송지 해제
        newAddressArry.unshift(defaultAddress); // 클릭된 주소를 첫 번째로 이동
        setAddressArry(newAddressArry); // 상태 업데이트
    };

    const startEditing = (index) => {
        setCurrentEditIndex(index);
        const addressToEdit = addressArry[index];
        setRecipient(addressToEdit.recipient);
        setPhone(addressToEdit.phone);
        setPostcode(addressToEdit.postcode);
        setAddress(addressToEdit.address);
        setIsEditing(true);
    };

    const saveEdit = () => {
        const newAddressArry = [...addressArry];
        newAddressArry[currentEditIndex] = {
            recipient,
            phone,
            postcode,
            address,
            isDefault: addressArry[currentEditIndex].isDefault
        };
        setAddressArry(newAddressArry);
        setIsEditing(false);
        setCurrentEditIndex(null);
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <MypageList />
                    </div>
                    <div className="col-sm-9">
                        <div className="content_title">
                            <div className="titlePoint">
                                <h3>주소록</h3>
                            </div>
                            <div className="btn_box">
                                <button
                                    type="button"
                                    className="unitAll_address"
                                    onClick={() => setAddressLayer(true)}>
                                    +새 배송지 추가
                                </button>
                                {addressLayer && <AddresLayer onClose={toggleLayer}
                                                              setPostcode={setPostcode}
                                                              setAddress={setAddress}/>}
                            </div>
                        </div>

                        <div className="address_list">
                            {addressArry.map((address, index) => (
                                <div key={index} className="address_item">
                                    <div className="my_active">
                                        <div className="info_bind">
                                            <div className="address_info">
                                                <div className="name_box">
                                                    <span className="address_name">{address.recipient}</span>
                                                    {address.isDefault && <span className="mark">기본 배송지</span>}
                                                </div>
                                                <p className="phone">{address.phone}</p>
                                                <div className="address_box">
                                                    <span>{address.postcode}</span>
                                                    <span>{address.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn_bind">
                                            {index !== 0 && (
                                                <button
                                                    className="outlinegrey B"
                                                    onClick={() => setDefaultAddress(index)}>
                                                    기본배송지
                                                </button>
                                            )}
                                            <button
                                                className="modify B"
                                                onClick={() => startEditing(index , address)}>
                                                수정
                                            </button>
                                            <button className="del B">삭제</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isEditing && <ModifyAddress onClose={toggleLayer}
                                                     setPostcode={setPostcode}
                                                     setAddress={setAddress}
                                                      />}
                        {isEditing && (
                            <div className="edit_form">
                                <h3>주소 수정</h3>
                                <label>
                                    수취인:
                                    <input
                                        type="text"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                </label>
                                <label>
                                    전화번호:
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </label>
                                <label>
                                    우편번호:
                                    <input
                                        type="text"
                                        value={postcode}
                                        onChange={(e) => setPostcode(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setAddressLayer(true)}>
                                        우편번호 찾기
                                    </button>
                                    {addressLayer && (
                                        <DaumAddress
                                            onClose={toggleLayer}
                                            setPostcode={setPostcode}
                                            setAddress={setAddress}
                                        />
                                    )}
                                </label>
                                <label>
                                    주소:
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </label>
                                <button type="button" onClick={saveEdit}>저장</button>
                                <button type="button" onClick={() => setIsEditing(false)}>취소</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Address;
