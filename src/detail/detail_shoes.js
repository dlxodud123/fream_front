import "./css/detail_shoes.css";
import React, { useEffect, useState } from "react";
import data from "../data/data.js";
import axios from "axios";

const Detail_shoes = () => {

    const axiosBaseURL = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true, // 이 부분 추가
    });
    
    const loadMore = () => {
        setCount(count + 5);
    };
    
    const [shoes, setShoes] = useState([]);
    const [count, setCount] = useState(5);

    useEffect(() => {
        axiosBaseURL
        .get(`/api/products/recent-views`)
        .then((data) => {
            if (data.data && Array.isArray(data.data)) {
                setShoes(data.data)
                console.log("최근 : ", data.data);  
            } else {
                console.log("데이터가 비어 있음");
            }
        })
        .catch((error) => {
            console.log("실패함", error);  
        });
      }, []);

    return(
        <div >
            <div style={{marginLeft:"10px", marginBottom:"15px", fontWeight:"bold", fontSize:"22px"}}>
                최근 본 상품
            </div>
            <div style={{display:"flex", flexWrap: "wrap"}}>
                {shoes.slice(0, count).map((shoe, i) => {
                    const rawImgName = shoe.imgName;

                    if (!rawImgName) {
                        return null; 
                    }

                    let cleanedImgName = rawImgName;
          
                    if (rawImgName.startsWith("['") && rawImgName.endsWith("']")) {
                      cleanedImgName = rawImgName.substring(2, rawImgName.length - 2);
                    }
          
                    const imgNameArray = cleanedImgName.split("', '");
                    const imageUrls = imgNameArray.map((imgName) => {
                      return `/api/admin/products/files/${imgName}`;
                    });

                    return ( 
                        <div key={shoe.id} style={{boxSizing: "border-box"}}>
                            <Shoesitem0 img={imageUrls[0]} shoe={shoe} i={i + 1} />
                        </div>
                    )
                })}
            </div>

            {/* {count < data.length && (
                <div style={{textAlign:"center"}}>
                    <button style={{width:"130px", height:"60px", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.1)", backgroundColor:"white"}} onClick={loadMore}>더보기</button>
                </div>
            )} */}
        </div>
    )
}

const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
};

const Shoesitem0 = (props) => {
    return(
      <div style={{}}>
        <img className="img" src={props.img} />
        <div style={{marginLeft:"10px", marginBottom:"30px"}}>
            <div style={{fontWeight:"bold"}}>{props.shoe.brand}</div>
            <div style={{width:"220px"}}>{props.shoe.nameEng}</div>
            <div style={{width:"220px", color:"rgba(0,0,0,0.3)", fontSize:"15px"}}>{props.shoe.nameKor}</div>
            <div style={{fontWeight:"bold", fontSize:"18px"}}>{formatPrice(props.shoe.price)}원</div>
        </div>
      </div>
    )
}
export default Detail_shoes;