import Header from '../../../common/header';
import Footer from '../../../common/footer';
import MypageList from "../MypageList";
import '../../css/payment/Payment.css';
import React, { useEffect, useState } from 'react';
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
        axiosBaseURL.get('/api/my/payment')
            .then(response => response)
            .then(data =>{
                console.log(data)
                setDate({
                
                });
            })
            .catch(error =>{
                console.log('payment 에러 useEffect', error);
            });
    }, []);
    const items = Array(3).fill(null); // 3개의 null 값을 가진 배열을 생성

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
        { date.length != 0 ? (
            <div>
                <div className='payment_eara'>
                    <p className='paymentNull'>추가하신 결제 정보가 없습니다.</p>
                </div>
            </div>
        ) : (
            <div>
                <div className='basicAccount'>
                    <div className='my_baxicAccount_box'>
                        <div className='accountInfo_bind'>
                            <div className='accountCard_info'>
                                <span className='card_name'>KB</span>
                            </div>
                                <div className='CardNumber'>
                                    <span className='num_bind_card'>
                                        {items.map((index) => (
                                            <React.Fragment key={index}>
                                            <span className='dot'>
                                                ••••
                                            </span>
                                            <span className='hypahe_card'>
                                                -
                                            </span>
                                            </React.Fragment>
                                        ))}
                                        <div className='card_lastNum'>
                                            <span className='lastCardNum'>3333</span>
                                        </div>
                                    </span>
                                    <span className='mark_card'>기본결제</span>
                                </div>

                        </div>
                        <div className='myAccount_del'>
                            <button className='myAccountDel_btn'>삭제</button>
                        </div>
                    </div>
                </div>
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
