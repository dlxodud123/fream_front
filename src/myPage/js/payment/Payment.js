import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from "../MypageList";
import '../../css/payment/Payment.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardModal from './modal/CardModal';

const Payment = () => {
    const [ modalOpen, setModalOpen ] = useState(false)
    const openModalProduct = () => setModalOpen(true);
    const closeModalProduct = () => setModalOpen(false);
    

    const [ date , setDate ] =useState([]);
    const axiosBaseURL = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
    });
    useEffect(() => {
        axiosBaseURL.get('http://localhost:3000/my/payment')
            .then(response => response)
            .then(data =>{
                console.log(data)
                setDate({
                    img: data.img,
                    userId: data.userId,
                    userName: data.userName,
                    mySelf: data.userBio
                });
            })
            .catch(error =>{
                console.log('profile 에러 useEffect', error);
            });
    }, []);

    return(
    <div>
    <Header />
    <div className="container_box">
        <div className="bd-sidebar">
            <MypageList />
        </div>
        <div className="box-container">
            <div className="content_payment">
                <div className="titlePayment">
                    <h3>결제정보</h3>
                    <p>수수료(패널티, 착불배송비 등)가 정산되지 않을 경우,
                            별도 고지 없이 해당 금액을 결제 시도할 수 있습니다.</p>
                </div>
                <div className="btn_box">
                    <button
                        type="button"
                        className="unitAll_card"
                        onClick={openModalProduct}>
                        +새 카드 추가하기
                    </button>
                </div>

            </div>
        { date.length == 0 ? (
            <div>
                <div className='payment_eara'>
                    <p className='paymentNull'>추가하신 결제 정보가 없습니다.</p>
                </div>
            </div>
        ) : (
            <div>

            </div>
        )}
  
        </div>
        </div>
        <Footer />
        { modalOpen && <CardModal onClose={closeModalProduct}/>}   
    </div>
    )   
}

export default Payment;
