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
    
    const [shoes, setShoes] = useState(data);
    const [count, setCount] = useState(5);

    useEffect(() => {
        axiosBaseURL
        .get(`http://192.168.42.142:3001/products/recent-views`)
        .then((data) => {
            if (data.data && data.data.length > 0) {
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
                {shoes.slice(0, count).map((shoes, i) => ( 
                    <div key={shoes.id} style={{  boxSizing: "border-box" }}>
                        <Shoesitem0 shoes={shoes} i={i + 1} />
                    </div>
                ))}
            </div>
            {/* {count < data.length && (
                <div style={{textAlign:"center"}}>
                    <button style={{width:"130px", height:"60px", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.1)", backgroundColor:"white"}} onClick={loadMore}>더보기</button>
                </div>
            )} */}
        </div>
    )
}

const Shoesitem0 = (props) => {
    return(
      <div style={{}}>
        <img className="img" src={props.shoes.img} />
        <div style={{marginLeft:"10px", marginBottom:"30px"}}>
            <div style={{fontWeight:"bold"}}>{props.shoes.brand}Adidas</div>
            <div style={{width:"220px"}}>{props.shoes.nameKor}Adidas x Clot Gazelle Indoor Halo Ivory Cloud White</div>
            <div style={{fontWeight:"bold", fontSize:"18px"}}>{props.shoes.price}원</div>
        </div>
      </div>
    )
}
export default Detail_shoes;