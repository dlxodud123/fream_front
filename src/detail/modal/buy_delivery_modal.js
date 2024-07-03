import "./../css/modal/buy_delivery_modal.css";
import { useEffect, useState } from "react";

const Buy_delivery_modal = () => {

    const [deliveryModal, setDeliveryModal] = useState(false);

    let [zonecode, setZonecode] = useState();
    let [roadaddress, setRoadaddress] = useState();
    let [bname, setBname] = useState();
    let [buildingname, setBuildingname] = useState();


    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
    
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script);
        };
      }, []);

      const delivery = () => {
        new window.daum.Postcode({
          oncomplete: function(data) {
            setZonecode(data.zonecode);
            setRoadaddress(data.roadAddress);
            setBname(data.bname);
            setBuildingname(data.buildingName);
          }
        }).open();
      };

    return(
        <>
            <button onClick={() => setDeliveryModal(true)} style={{border:"1px solid black", width:"650px", borderColor:"rgba(0,0,0,0.1)", marginTop:"10px", height:"50px", backgroundColor:"#f4f4f4"}}>
                <div style={{color:"grey", textAlign:"left", marginLeft:"12px"}}>
                    주소를 추가해주세요. 
                </div>
            </button>
            {
                deliveryModal &&
                <div className={"buy_delivery_modal-container"}>
                    <div className={'buy_delivery_modal-content'}>
                        <div style={{display:"flex"}}>
                            <div style={{width:"420px", fontSize:"20px", fontWeight:"bold", marginLeft:"50px", marginTop:"15px"}}>
                                새 주소 추가
                            </div>
                            <div>
                                <button onClick={() => setDeliveryModal(false)} style={{width:"30px", height:"30px", border:"none", fontSize:"30px", fontWeight:"100", color:"rgba(0,0,0,0.5)", marginLeft:"8px"}}>x</button>
                            </div>
                        </div>
                        <div style={{width:"460px", height:"450px", marginLeft:"30px", marginTop:"10px"}}>
                            <div style={{textAlign:"left", fontSize:"14px", fontWeight:"bold"}}>이름</div>
                            <div style={{marginTop:"5px"}}>
                                <input type="text" placeholder="수령인의 이름" className="name_input_txt">
                                </input>
                            </div>

                            {/* <div style={{textAlign:"left", height:"20px"}}><p style={{fontSize:"11px"}}>올바른 이름을 입력해주세요. (2 - 50자)</p></div> */}
                            <div style={{height:"20px"}}></div>

                            <div style={{textAlign:"left", fontSize:"13px", fontWeight:"bold", marginTop:"20px"}}>휴대폰 번호</div>
                            <div style={{marginTop:"5px"}}>
                                <input type="text" placeholder="- 없이 입력" className="name_input_txt">
                                </input>
                            </div>

                            {/* <div style={{textAlign:"left", height:"20px"}}><p style={{fontSize:"11px"}}>정확한 휴대폰 번호를 입력해주세요.</p></div> */}
                            <div style={{height:"20px"}}></div>

                            <div style={{textAlign:"left", fontSize:"13px", fontWeight:"bold", marginTop:"20px"}}>우편번호</div>
                            <div style={{marginTop:"5px", display:"flex"}}>
                                <input readOnly type="text" placeholder="우편 번호를 검색하세요" className="name_input_txt">
                                </input>
                                <button onClick={() => delivery()} style={{width:"85px", height:"35px", border:"1px solid rgba(0,0,0,0.5)", fontSize:"11px", color:"rgba(0,0,0,0.7)", borderColor:"rgba(0,0,0,0.3)"}}>
                                    우편번호
                                </button>
                            </div>

                            <div style={{textAlign:"left", fontSize:"13px", fontWeight:"bold", marginTop:"30px"}}>주소</div>
                            <div style={{marginTop:"5px", display:"flex"}}>
                                <input readOnly type="text" placeholder="우편 번호 검색 후, 자동입력 됩니다" className="name_input_txt">
                                </input>
                            </div>

                            
                            <div style={{textAlign:"left", fontSize:"13px", fontWeight:"bold", marginTop:"30px"}}>상세 주소</div>
                            <div style={{marginTop:"5px", display:"flex"}}>
                                <input type="text" placeholder="건물, 아파트, 동/호수 입력" className="name_input_txt">
                                </input>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Buy_delivery_modal;