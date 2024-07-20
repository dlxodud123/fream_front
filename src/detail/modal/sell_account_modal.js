import './../css/modal/sell_account_modal.css';
import { useState } from "react";

const Sell_account_modal = () => {
    let [accountModal, setAccountModal] = useState(false);

    return(
        <>
            <button onClick={() => setAccountModal(true)} style={{backgroundColor:"rgba(0,0,0,0.9)", color:"white", borderRadius:"10px", fontWeight:"bold", width:"100px", height:"40px", marginTop:"70px", marginLeft:"240px"}}>
                계좌 추가
            </button>
            {
                accountModal ? (
                    <>
                        <div className="sell_account_modal-container">
                            <div className="sell_acount_modal-content">
                                asdf
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div></div>
                    </>
                )
            }
        </>
    )
}

export default Sell_account_modal;