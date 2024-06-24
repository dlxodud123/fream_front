import img1 from "./../img/img2.png";
import "./css/detail_shoes.css";

const Detail_shoes = () => {
    return(
        <>
            <div>
                <p style={{fontSize:"20px", fontWeight:"bold"}}>나머지 신발 보기</p>
            </div>
            <div className="detail_shoes">
                <div>
                    <img src = {img1} alt = {'loding'} style={{width:"220px", height:"220px"}}></img>
                    <div style={{width:"220px"}}>
                        <div style={{fontWeight:"bold"}}>신발 이름</div>
                        <div>상세 설명</div>
                        <div style={{fontWeight:"bold", marginTop:"10px"}}>가격</div>
                    </div>
                </div>
                <div style={{width:"25px"}}></div>
                <div>
                    <img src = {img1} alt = {'loding'} style={{width:"220px", height:"220px"}}></img>
                    <div style={{width:"220px"}}>
                        <div style={{fontWeight:"bold"}}>신발 이름</div>
                        <div>상세 설명</div>
                        <div style={{fontWeight:"bold", marginTop:"10px"}}>가격</div>
                    </div>
                </div>
                <div style={{width:"25px"}}></div>
                <div>
                    <img src = {img1} alt = {'loding'} style={{width:"220px", height:"220px"}}></img>
                    <div style={{width:"220px"}}>
                        <div style={{fontWeight:"bold"}}>신발 이름</div>
                        <div>상세 설명</div>
                        <div style={{fontWeight:"bold", marginTop:"10px"}}>가격</div>
                    </div>
                </div>
                <div style={{width:"25px"}}></div>
                <div>
                    <img src = {img1} alt = {'loding'} style={{width:"220px", height:"220px"}}></img>
                    <div style={{width:"220px"}}>
                        <div style={{fontWeight:"bold"}}>신발 이름</div>
                        <div>상세 설명</div>
                        <div style={{fontWeight:"bold", marginTop:"10px"}}>가격</div>
                    </div>
                </div>
                <div style={{width:"25px"}}></div>
                <div>
                    <img src = {img1} alt = {'loding'} style={{width:"220px", height:"220px"}}></img>
                    <div style={{width:"220px"}}>
                        <div style={{fontWeight:"bold"}}>신발 이름</div>
                        <div>상세 설명</div>
                        <div style={{fontWeight:"bold", marginTop:"10px"}}>가격</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail_shoes;