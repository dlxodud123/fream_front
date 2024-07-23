import './../css/modal/sell_account_modal.css';
import { useEffect, useState } from "react";

const Sell_account_modal = () => {
    let [accountModal, setAccountModal] = useState(false);

    let [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    let [accountHolderNumberValue, setAccountHolderNumberValue] = useState('');
    const handleAccountNumber = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value !== '') {
            setAccountHolderNumberValue(value);
        } else if (value === '') {
            setAccountHolderNumberValue('');
        }
    };
    
    let [accountHolderWarning, setAccountHolderWarning] = useState(false);
    let [accountHolderValue, setAccountHolderValue] = useState('');
    const handleAccountHolder = (e) => {
        const value = e.target.value;
        setAccountHolderValue(value);
        if (value.length < 2 || value.length > 50) {
            setAccountHolderWarning(true);
        } else {
            setAccountHolderWarning(false);
        }
    }

    useEffect(() => {
        if (selectedValue == '') {
            console.log("asdfsadf");
        }
        if (accountHolderNumberValue == '') {
            console.log("aaasssddd");
        }
        // console.log(selectedValue);
        // console.log(accountHolderNumberValue);
        // console.log(accountHolderValue);
        if (!accountHolderWarning) {
            console.log("qwwcvxb");
        }
        // console.log(accountHolderWarning);
    }, [selectedValue, accountHolderNumberValue, accountHolderValue,accountHolderWarning])

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
                                <div style={{display:"flex"}}>
                                    <div style={{width:"200px", height:"50px", fontSize:"20px", fontWeight:"bold", marginLeft:"140px", marginTop:"15px"}}>
                                        판매 정산 계좌
                                    </div>
                                    <div style={{width:"20px", height:"50px", fontSize:"30px", fontWeight:"lighter", marginLeft:"100px", marginTop:"3px"}}>
                                        <button onClick={() => setAccountModal(false)} style={{border:"none", backgroundColor:"white"}}>x</button>
                                    </div>
                                </div>
                                <div style={{textAlign:"left", fontWeight:"bold", width:"400px", marginLeft:"40px", marginTop:"40px"}}>
                                    은행명
                                </div>
                                <select style={{border:"none", width:"410px", marginTop:"5px", borderBottom:"1px solid rgba(0,0,0,0.1)", height:"40px", color: selectedValue === '' ? "rgba(0,0,0,0.5)" : "black"}} value={selectedValue} onChange={handleSelectChange}>
                                    <option value="" style={{ color: "rgba(0,0,0,0.3)" }}>선택해주세요</option>
                                    <option value="국민은행">국민은행</option>
                                    <option value="신한은행">신한은행</option>
                                    <option value="우리은행">우리은행</option>
                                    <option value="하나은행">하나은행</option>
                                    <option value="기업은행">기업은행</option>
                                    <option value="농협은행">농협은행</option>
                                    <option value="토스뱅크">토스뱅크</option>
                                </select>
                                <div style={{textAlign:"left", fontWeight:"bold", width:"400px", marginLeft:"40px", marginTop:"30px"}}>
                                    계좌번호
                                </div>
                                <div>
                                    <input onChange={handleAccountNumber} value={accountHolderNumberValue} type='text' style={{width:"400px", border:"none", borderBottom:"1px solid rgba(0,0,0,0.1)", height:"40px"}} placeholder='- 없이 입력하세요'></input>
                                </div>
                                {accountHolderWarning ? (
                                    <div style={{height:"100px"}}>
                                        <div style={{textAlign:"left", fontWeight:"bold", width:"400px", marginLeft:"40px", marginTop:"30px"}}>
                                            예금주
                                        </div>
                                        <div>
                                            <input onChange={handleAccountHolder} value={accountHolderValue} type='text' style={{width:"400px", border:"none", borderBottom:"1px solid rgba(0,0,0,0.1)", height:"40px"}} placeholder='예금주명을 정확히 입력하세요.'></input>
                                        </div>
                                        <div style={{ color: "red", fontSize: "11px",fontWeight:500, textAlign:"left", height:"10px", marginLeft:"40px"}}>
                                            올바른 이름을 입력해주세요. (2 - 50자)
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{height:"100px"}}>
                                        <div style={{textAlign:"left", fontWeight:"bold", width:"400px", marginLeft:"40px", marginTop:"30px"}}>
                                            예금주
                                        </div>
                                        <div>
                                            <input onChange={handleAccountHolder} value={accountHolderValue} type='text' style={{width:"400px", border:"none", borderBottom:"1px solid rgba(0,0,0,0.1)", height:"40px"}} placeholder='예금주명을 정확히 입력하세요.'></input>
                                        </div>
                                    </div>
                                )}
                                {!(accountHolderValue === '') & !(selectedValue === '') & !(accountHolderNumberValue === '') & !accountHolderWarning ? (
                                    <>
                                        <div>
                                            <button style={{width:"120px", height:"50px", borderRadius:"10px", border:"none", backgroundColor:"rgba(0,0,0,1)", fontWeight:"bold", color:"white"}}>변경하기</button>
                                        </div> 
                                    </>
                                ) : (
                                    <>
                                        asdf
                                    </>
                                )}
                                {/* <div>
                                    <button style={{width:"120px", height:"50px", borderRadius:"10px", border:"none", backgroundColor:"rgba(0,0,0,0.1)", fontWeight:"bold", color:"white"}}>변경하기</button>
                                </div>
                                <div>
                                    <button style={{width:"120px", height:"50px", borderRadius:"10px", border:"none", backgroundColor:"rgba(0,0,0,1)", fontWeight:"bold", color:"white"}}>변경하기</button>
                                </div> */}
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