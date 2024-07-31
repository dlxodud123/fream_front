import Header from "../../../common/header";
import MypageList from "../MypageList";
import '../../css/address/address.css';
import { useState, useEffect } from "react";
import AddresLayer from './AddresLayer.js';
import Footer from "../../../common/footer";
import ModifyAddress from './Modify_address.js';
import axios from "axios";

const Address = () => {
    const [addressArry, setAddressArry] = useState([]); // 주소 데이터를 저장할 배열
    const [addressLayer, setAddressLayer] = useState(false);//새 배송지 모달창 열기
    const [modiLayer, setModiLayer] = useState(false);//수정 모달창 열기
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [formValues, setFormValues] = useState({
        address_id: "",
        postalCode: "",
        city: "",
        name: "",
        phone: "",
        street: "",
        currentId: null,
        isDefault: false,
    });



    const fetchData = async () => {
        try {
            const res = await axios.get('/api/my/address');
            console.log(res);
            const transformedData = res.data.map(item => ({
                address_id: item.addressId,
                userId: item.userId,
                name: item.name,
                phone: item.phone,
                postalCode: item.postalCode,
                city: item.city,
                street: item.street,
                isDefault: item.isDefault === '1',
            }));
            const sortedData = transformedData.sort((a, b) => b.isDefault - a.isDefault);

            console.log("기본 배송지 확인: ",sortedData);
            setAddressArry(sortedData);
        } catch (error) {
            console.log('address 에러 useEffect', error);
        }
    };

    useEffect(() => { // 백엔드 get 코드
        fetchData();
    }, []);

    const deleteAddress = async (id) => {
        try {
            console.log(id);
            await axios.delete(`/api/my/address/${id}`);

            await fetchData(); // 주소 데이터 다시 가져오기

        } catch (error) {
            console.error('주소 삭제 실패:', error);
        }
    };


    const setDefaultAddress = async (index) => {
        const updatedAddresses = addressArry.map((address, i) => ({
            ...address,
            isDefault: i === index ? true : false,
        }));
        const defaultAddress = updatedAddresses.splice(index, 1)[0];
        updatedAddresses.unshift(defaultAddress);

        setAddressArry(updatedAddresses);

        const id = defaultAddress.address_id;
            // console.log("아이디 값 : ",id)
        try {
            // ID 값을 파라미터로 포함하여 PUT 요청
            await axios.put(`/api/my/address/is_default/${id}`);
        
        } catch (error) {
            console.error('기본 배송지 설정 실패:', error);
        }
    };

    const formatPhoneNumber = (phone) => {
        // 하이픈을 추가하여 전화번호 포맷을 맞추는 함수
        if (!phone) return "";
    
        // 전화번호 길이에 따라 하이픈을 추가
        if (phone.length === 11) {
            return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
        } else if (phone.length === 10) {
            return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
        }
    };

    const maskPhoneNumber = (phone) => {
        const formattedPhone = formatPhoneNumber(phone); // 하이픈을 추가한 후
        if (!formattedPhone) return "";
        const parts = formattedPhone.split("-");
        if (parts.length !== 3) return formattedPhone; // 잘못된 형식의 경우 원본 반환
    
        const maskedPart2 = parts[1] ? parts[1].charAt(0) + "●".repeat(parts[1].length - 1) : "";
        const maskedPart3 = parts[2] ? parts[2].charAt(0) + "●".repeat(parts[2].length - 1) : "";
    
        return `${parts[0]}-${maskedPart2}-${maskedPart3}`;
    };


    const maskName = (name) => {
        if (!name) return "";
        return name.charAt(0) + "*".repeat(name.length - 1);
    };

    const toggleAddressLayer = () => {
        setAddressLayer(!addressLayer);
    };

    const toggleModiLayer = () => {
        setModiLayer(!modiLayer);
    };

    const startEditing = (index) => { //모디파이모달창의 트리거 역할
        if (index < 0 || index >= addressArry.length) {
            console.error("인덱스 xx:", index);
            return;
        }

        const addressToEdit = addressArry[index];
        setFormValues({
            name: addressToEdit.name,
            phone: addressToEdit.phone,
            postalCode: addressToEdit.postalCode,
            city: addressToEdit.city,
            street: addressToEdit.street,
            address_id: addressToEdit.address_id,
            isDefault: addressToEdit.isDefault
        });
        setCurrentEditIndex(index);
        setModiLayer(true);
    };

    const handleModifySave = (updatedAddress) => {
    // 서버에 수정된 주소를 업데이트
    axios.put(`/api/my/address`, updatedAddress)
        .then(() => {
            fetchData(); // 주소 목록 다시 가져오기
            setModiLayer(false); // 모달 닫기
        })
        .catch(error => {
            console.error('주소 수정 실패:', error);
        });
}

    

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
                                {addressLayer && <AddresLayer  onClose={toggleAddressLayer} setDate={setAddressArry} />}
                            </div>
                        </div>
                        {  addressArry.length > 0  ? (
                        <div className="address_list">
                        {addressArry.map((address, index) => (
                            <div key={address.address_id} className={index === 0 ? "address_item" : "address_other"}>
                                <div className={address.isDefault ? "my_active" : "active_other"}>
                                    <div className="info_bind">
                                        <div className="address_info">
                                            <div className="name_box">
                                                <span className="address_name">{maskName(address.name)}</span>
                                                {address.isDefault && <span className="mark">기본 배송지</span>}
                                            </div>
                                            <p className="phone">{maskPhoneNumber(address.phone)}</p> {/* 마스킹된 전화번호 */}
                                            <div className="address_box">
                                                <span>{address.postalCode}</span>
                                                <span>{address.street}, {address.city}</span>
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
                                                    onClick={()=>deleteAddress(address.address_id)}>삭제</button>
                                        </div>
                                    </div>
                                </div>
                            ))}                        
                        {   modiLayer && (<ModifyAddress
                                        onClose={toggleModiLayer}
                                        name={formValues.name}
                                        phone={formValues.phone}
                                        postalCode={formValues.postalCode}
                                        city={formValues.city}
                                        street={formValues.street}
                                        isDefault={formValues.isDefault}
                                        address_id={formValues.address_id}
                                        fetchData={fetchData}
                                        handleSave={handleModifySave}

                            />
                        )}
                        </div>
                        ):(
                        <div className="address_list">
                          <div className="addressNull">
                            <div className='payment_eara'>
                                <p className='paymentNull'>주소 정보가 없습니다.</p>
                            </div>
                          </div>
                        </div>
                        )}
                    </div>
                </div>
            <Footer />
        </div>
    );
};

export default Address;
