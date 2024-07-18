import { faCaretDown, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../css/buying/Buying.css';
import { useState } from "react";
import ModalSellEnd from "./modal/ModalSell_end.js";

function ModalDealEnd(props){
    const [sortDirection1, setSortDirection1] = useState(null); 
    const [sortDirection2, setSortDirection2] = useState(null); 
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('전체');
    const [sortedBuyBreakdown, setSortedBuyBreakdown] = useState(props.buyBreakdown);
    
    const openModalProduct = () => setIsModalProductOpen(true);
    const closeModalProduct = () => setIsModalProductOpen(false);


    const handleSort1 = () => {
        setSortDirection2(null); // 버튼 초기화
        if (sortDirection1 === 'up') {
            setSortDirection1('down');
        } else {
            setSortDirection1('up');
        }
    };
    const handleSort2 = () => {
        setSortDirection1(null); //버튼 초기화
        if (sortDirection2 === 'up') {
            setSortDirection2('down');
        } else {
            setSortDirection2('up');
        }
    };
    return(
        <div>
            <div className='purchas_head'>
                <div className='head_product'>
                    <button className='btn_buyFilter'
                            onClick={openModalProduct}>
                        전체
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className="buyIcon"
                        />
                    </button>
                </div>
                <div className='head_status'>
                    <div className='status_box'>
                        <button className='status_txt'
                            onClick={handleSort1}>
                            구매일
                            <span className="sortIcons">
                                <FontAwesomeIcon icon={faSortUp} className={`sortUpIcon ${sortDirection1 === 'up' ? 'active' : ''}`} />
                                <FontAwesomeIcon icon={faSortDown} className={`sortDownIcon ${sortDirection1 === 'down' ? 'active' : ''}`} />
                            </span>
                        </button>
                    </div>
                    <div className='status_box field'>
                        <button className='status_txt'
                            onClick={handleSort2}>
                            상태
                            <span className="sortIcons">
                                <FontAwesomeIcon icon={faSortUp} className={`sortUpIcon ${sortDirection2 === 'up' ? 'active' : ''}`} />
                                <FontAwesomeIcon icon={faSortDown} className={`sortDownIcon ${sortDirection2 === 'down' ? 'active' : ''}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            { props.buyBreakdown == null ? (
                    <div className='empty_area'>
                        <p className='buyText'>구매 입찰 내역이 없습니다.</p>
                    </div>
                ) : (
                    <div>
                        <ul>
                            {sortedBuyBreakdown.map(item => (
                                <li key={item.id} className="buyListItem">
                                    <div className="buyListBox">
                                        <div className="buyListImg">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="shoes_inputBox">
                                            <span>{item.name}</span>
                                            <span style={{color:'rgba(34,34,34,.5)'}}> {item.size}</span>
                                        </div>
                                        <div className="details-right">
                                            <div className="purchase_price">
                                                <span>정산일{'YY/MM/DD'}</span>
                                            </div>
                                            <div className="jonglyoil">
                                                <span>상태{'선택'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            {isModalProductOpen && <ModalSellEnd onClose={closeModalProduct}
                                          selectedButton={selectedButton} 
                                          setSelectedButton={setSelectedButton}/>}
        </div>
    )
}

export default ModalDealEnd;