import Header from "../../../common/header";
import MypageList from "../MypageList";
import '../../css/address/address.css';
import { useState, useEffect } from "react";
import AddresLayer from './AddresLayer.js';
import Footer from "../../../common/footer";
import DaumAddress from "./SerchAddress";
import ModifyAddress from './Modify_address.js';
import axios from "axios";

const Address = () => {
    let [date, setDate] = useState({});//데이터

    const [addressArry, setAddressArry] = useState([]); // 주소 데이터를 저장할 배열
    const [addressLayer, setAddressLayer] = useState(false);//새 배송지 모달창 열기
    const [modiLayer, setModiLayer] = useState(false);//수정 모달창 열기

    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [recipient, setRecipient] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => { //백앤드 get 코드
        const setDate = async () => {
            // 주석 처리된 실제 백엔드 호출 부분
            // axios.get('/api/my/address')
            //     .then(res => {
            //         console.log("address get data : ", res.data);
            //         setAddressArry(res.data);
            //     })
            //     .catch(error => {
            //         console.log('address 에러 useEffect', error);
            //     });

            // 대신 더미 데이터 사용
            const dummyData = [
                {
                    id: 1,
                    recipient: "홍길동",
                    phone: "010-1234-5678",
                    postcode: "12345",
                    address: "서울특별시 강남구 테헤란로 123",
                    isDefault: true
                },
                {
                    id: 2,
                    recipient: "김철수",
                    phone: "010-9876-5432",
                    postcode: "67890",
                    address: "부산광역시 해운대구 해운대해변로 456",
                    isDefault: false
                },
                {
                    id: 3,
                    recipient: "이영희",
                    phone: "010-1111-2222",
                    postcode: "54321",
                    address: "대구광역시 중구 중앙대로 789",
                    isDefault: false
                }
            ];
            setAddressArry(dummyData);
            console.log("Address array set:", dummyData); // 디버깅
        };

        setDate();
    }, []);

    const deleteAddress = async (id) => {
        try {
            await axios.delete(`/api/my/address/${id}`);
            await setDate(); //주소 데이터 다시 가지고 옴
        } catch (error) {
            console.error('주소 삭제 실패:', error);
        }
    };

    const setDefaultAddress = (index) => {
        const newAddressArry = [...addressArry];
        const [defaultAddress] = newAddressArry.splice(index, 1); // 클릭된 주소 제거
        defaultAddress.isDefault = true; // 기본 배송지로 설정
        newAddressArry.forEach((address) => address.isDefault = false); // 나머지 주소 기본 배송지 해제
        newAddressArry.unshift(defaultAddress); // 클릭된 주소를 첫 번째로 이동
        setAddressArry(newAddressArry); // 상태 업데이트
    };

    const maskPhoneNumber = (phoneNumber) => { //전화번호 암호화화
        if (!phoneNumber) return "";
        const parts = phoneNumber.split("-");
        if (parts.length !== 3) return phoneNumber;

        const maskedPart2 = parts[1].substr(0, 1) + "●".repeat(parts[1].length - 1);
        const maskedPart3 = parts[2].substr(0, 1) + "●".repeat(parts[2].length - 1);

        return `${parts[0]}-${maskedPart2}-${maskedPart3}`;
    };
    const maskName = (name) => {
        if (!name) return "";
        const firstChar = name.charAt(0); // 첫 번째 글자 추출
        const maskedPart = "*".repeat(name.length - 1); // 나머지 부분 마스킹
        return firstChar + maskedPart;
    };
    const toggleAddressLayer = () => {
        setAddressLayer(!addressLayer);
    };
    const toggleModiLayer = () => {
        setModiLayer(!modiLayer);
    };
    const startEditing = (index) => { //모디파이모달창의 트리거 역할
        if (index < 0 || index >= addressArry.length) {
            console.error("Invalid index:", index);
            return;
        }
        setCurrentEditIndex(index);
        const addressToEdit = addressArry[index];
        if (addressToEdit) {
            setRecipient(addressToEdit.recipient);
            setPhone(addressToEdit.phone);
            setPostcode(addressToEdit.postcode);
            setAddress(addressToEdit.address);
            setModiLayer(true); // 수정 모달창 열기
        } else {
            console.error("Address index:", index);
        }
    };

    return (
        <div>
            <Header />
                <div className="container_box">
                    <div className="bd-sidebar">
                        <MypageList />
                    </div>
                    <div className="box-container">
                        <div className="content_title">
                            <div className="titlePoint">
                                <h3>주소록</h3>
                            </div>
                            <div className="btn_box">
                                <button
                                    type="button"
                                    className="unitAll_address"
                                    onClick={toggleAddressLayer}>
                                    +새 배송지 추가
                                </button>
                                {addressLayer && <AddresLayer  onClose={toggleAddressLayer}
                                                                date={date} 
                                                                setDate={setDate}/>}
                            </div>
                        </div>

                        <div className="address_list">
                            {addressArry.map((address, index) => (
                                <div key={address.id} className={index === 0 ? "address_item" : "address_other"}>
                                    <div className={index === 0 ? "my_active" : "active_other"}>
                                        <div className="info_bind">
                                            <div className="address_info">
                                                <div className="name_box">
                                                    <span className="address_name">{maskName(address.recipient)}</span>
                                                    {address.isDefault && <span className="mark">기본 배송지</span>}
                                                </div>
                                                <p className="phone">{maskPhoneNumber(address.phone)}</p>
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
                                                onClick={()=> startEditing(index)}>
                                                수정
                                            </button>
                                            <button className="del B"
                                                    onClick={()=>deleteAddress(address.id)}>삭제</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {modiLayer && <ModifyAddress
                                        onClose={toggleModiLayer}
                                        recipient={recipient}
                                        phone={phone}
                                        postcode={postcode}
                                        address={address}
                        />
                        }
                    </div>
                </div>
            <Footer />
        </div>
    );
};

export default Address;
