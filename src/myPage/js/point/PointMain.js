import Header from '../../../common/header';
import Footer from '../../../common/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MypageList from '../MypageList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import '../../css/point/PointMain.css';
import PointModal from './Point_modal.js';

const PointMain = () => {
    const data = [
        {
            type: 'earn',         // 적립
            date: '2021/2/23',
            event: '이벤트 적립',
            challenge: '스타일 챌린지',
            expiration: '2344/23/43',
            points: 4000
        },
        {
            type: 'use',          // 사용
            date: '2021/3/15',
            event: '이벤트 사용',
            challenge: '퀴즈 챌린지',
            expiration: '2344/24/44',
            points: 3000
        },
        {
            type: 'earn',         // 적립
            date: '2021/4/10',
            event: '이벤트 적립',
            challenge: '테스트 챌린지',
            expiration: '2344/25/45',
            points: 1500
        },
        {
            type: 'use',          // 사용
            date: '2021/5/22',
            event: '이벤트 사용',
            challenge: '챌린지 테스트',
            expiration: '2344/26/46',
            points: 2000
        }
    ];
    const [ modalOpen, setModalOpen ] = useState(false)
    const openModalProduct = () => setModalOpen(true);
    const closeModalProduct = () => setModalOpen(false);
    

    const [ date , setDate ] =useState([]);
    const axiosBaseURL = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
    });
    useEffect(() => {
        axiosBaseURL.get('/api/my/point')
            .then(response => response)
            .then(data =>{
                console.log(data)
                setDate({
                    // img: data.img,
                    // userId: data.userId,
                    // userName: data.userName,
                    // mySelf: data.userBio
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
            <div className="content_point">
                <div className="titlePoint">
                    <h3>포인트</h3>
                    <button className='btn_help'>
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </button>
                </div>
            </div>
                <div className='dashbord_point'>
                    <div className='point_summary'>
                        <div className='point_info'>
                            <p className='titlePo'>사용가능한 포인트</p>
                            <p className='keepPoint'>0P</p>
                        </div>
                        <div className='divide'>
                            <div className='divide_line'></div>
                        </div>
                        <div className='point_info'>
                            <p className='titlePo'>이번달 소멸예정 포인트</p>
                            <p className='extinctPoint'>0P</p>
                        </div>
                    </div>
                    <div className='register_point'>
                        <button className='PointBtn'
                                onClick={openModalProduct}
                        >+포인트 적립하기</button>
                    </div>
                </div>
                <p className='pointMsg'>포인트 유효기간은 적립일부터 최대 1년까지이며, 
                    유형에 따라 달라질 수 있습니다.</p>
                { date.length != 0 ? (
                    <div>
                        <table className='point_eara'>
                            <tr>
                                <th className='history header'>상세 내역</th>
                                <th className='history Header'>적립/사용</th>
                            </tr>
                        </table>
                        <div className='point_empty'>
                            <p className='pointNullmsg'>적립 또는 사용한 내역이 없습니다.</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <table className='point_eara'>
                            <tr>
                                <th className='history header'>상세 내역</th>
                                <th className='history Header'>적립/사용</th>
                            </tr>
                        </table>
                        {data.map((item, index) => (
                        <div className='save_po' key={index}>
                            {item.type === 'earn' ? (
                                <div className='savePoint'>적립</div>
                            ) : (
                                <div className='usePoint'>사용</div>
                            )}
                            <div className='save_list'>
                                <div className='save_detail'>
                                    <span className='saveDay'>{item.date}</span>
                                    <span className='note'>{item.event}</span>
                                    <span className='note'>{item.challenge}</span>
                                    <span className='saveDay'>유효기간: {item.expiration}</span>
                                </div>
                                <div className='point_score'>
                                    <p style={{ color: item.type === 'use' ? 'red' : 'inherit' }}>
                                        {item.type === 'earn' ? `+${item.points}` : `-${item.points}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
        
        </div>
        </div>
        <Footer />
        { modalOpen && <PointModal onClose={closeModalProduct}/>}   
    </div>
    )   
}

export default PointMain;
