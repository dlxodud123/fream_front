import { faCaretDown, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../css/buying/Buying.css';
import { useState } from "react";

function ModalProgres(props){
    const [sortDirection1, setSortDirection1] = useState(null); 
    const [sortDirection2, setSortDirection2] = useState(null); 


    const handleSort1 = () => {
        if (sortDirection1 === 'up') {
            setSortDirection1('down');
        } else {
            setSortDirection1('up');
        }
    };

    return(
        <div>
            <div className='purchas_head'>
                <div className='head_product'>
                    <button className='btn_buyFilter'>
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
                            상태
                            <span className="sortIcons">
                                <FontAwesomeIcon icon={faSortUp} className={`sortUpIcon ${sortDirection1 === 'up' ? 'active' : ''}`} />
                                <FontAwesomeIcon icon={faSortDown} className={`sortDownIcon ${sortDirection1 === 'down' ? 'active' : ''}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {
                props.buyBreakdown !== null ? (
                    <div className='empty_area'>
                        <p className='buyText'>구매 입찰 내역이 없습니다.</p>
                    </div>
                ) : (
                    <div>

                    </div>
                )
            }
        </div>
    )
}

export default ModalProgres;