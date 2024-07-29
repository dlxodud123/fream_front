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
    const [addressArry, setAddressArry] = useState([]); // 주소 데이터를 저장할 배열
    const [addressLayer, setAddressLayer] = useState(false);//새 배송지 모달창 열기
    const [modiLayer, setModiLayer] = useState(false);//수정 모달창 열기
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [formValues, setFormValues] = useState({
        postcode: "",
        address: "",
        name: "",
        phone: "",
        detailAddress: "",
        currentId: null,
        isDefault: false,
    });



    const fetchData = async () => {
        try {
            const res = await axios.get('/api/my/address');
            const transformedData = res.data.map(item => ({
                address_id: item.address_id,
                userId: item.userId,
                name: item.name,
                phone: item.phone,
                postcode: item.postcode,
                address: item.address,
                detailAddress: item.detailAddress,
                isDefault: item.isDefault === '1',
            }));
            setAddressArry(transformedData);
        } catch (error) {
            console.log('address 에러 useEffect', error);
        }
    };

    useEffect(() => { // 백엔드 get 코드
        fetchData();
    }, []);

    const deleteAddress = async (id) => {
        try {
            await axios.delete(`/api/my/address/${id}`);

            await fetchData(); // 주소 데이터 다시 가져오기

        } catch (error) {
            console.error('주소 삭제 실패:', error);
        }
    };

    const setDefaultAddress = (index) => {
        const updatedAddresses = [...addressArry];
        const [defaultAddress] = updatedAddresses.splice(index, 1);
        defaultAddress.isDefault = true;
        updatedAddresses.forEach(address => address.isDefault = false);
        updatedAddresses.unshift(defaultAddress);
        setAddressArry(updatedAddresses);
    };

    // const maskPhoneNumber = (phoneNumber) => { //전화번호 암호화화
    //     if (!phoneNumber) return "";
    //     const parts = phoneNumber.split("-");
    //     if (parts.length !== 3) return phoneNumber;

    //     const maskedPart2 = parts[1].substr(0, 1) + "●".repeat(parts[1].length - 1);
    //     const maskedPart3 = parts[2].substr(0, 1) + "●".repeat(parts[2].length - 1);

    //     return `${parts[0]}-${maskedPart2}-${maskedPart3}`;
    // };

    const maskPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return "";
        const [part1, part2, part3] = phoneNumber.split("-");
        return `${part1}-${part2.charAt(0)}${"●".repeat(part2.length - 1)}-${part3.charAt(0)}${"●".repeat(part3.length - 1)}`;
    };


    const maskName = (name) => {
        if (!name) return "";
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
            postcode: addressToEdit.postcode,
            address: addressToEdit.address,
            detailAddress: addressToEdit.detailAddress,
            currentId: addressToEdit.address_id,
            isDefault: addressToEdit.isDefault
        });
        setCurrentEditIndex(index);
        setModiLayer(true);
    };

    const handleModifySave = (updatedAddress) => {
        // 서버에 수정된 주소를 업데이트
        axios.put(`/api/my/address/${updatedAddress.currentId}`, updatedAddress)
            .then(() => {
                fetchData(); // 주소 목록 다시 가져오기
                setModiLayer(false); // 모달 닫기
            })
            .catch(error => {
                console.error('주소 수정 실패:', error);
            });
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
                                {addressLayer && <AddresLayer  onClose={toggleAddressLayer}/>}
                            </div>
                        </div>
                        {  addressArry.length >0  ? (
                            <div>
                        <div className="address_list">
                            {addressArry.map((address, index) => (
                                <div key={address.id} className={index === 0 ? "address_item" : "address_other"}>
                                    <div className={index === 0 ? "my_active" : "active_other"}>
                                        <div className="info_bind">
                                            <div className="address_info">
                                                <div className="name_box">
                                                    <span className="address_name">{maskName(address.name)}</span>
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
                                                    onClick={()=>deleteAddress(address.address_id)}>삭제</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {   modiLayer && (<ModifyAddress
                                        onClose={toggleModiLayer}
                                        name={formValues.name}
                                        phone={formValues.phone}
                                        postcode={formValues.postcode}
                                        address={formValues.address}
                                        detailAddress={formValues.detailAddress}
                                        isDefault={formValues.isDefault}
                                        id={formValues.currentId}
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
