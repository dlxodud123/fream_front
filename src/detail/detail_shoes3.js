import "./css/detail_shoes3.css";
import React, { useEffect, useState } from "react";
import data from "../data/data.js";
import axios from "axios";

const Detail_shoes3 = (props) => {

    const axiosBaseURL = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true, // 이 부분 추가
    });

    const [shoes, setShoes] = useState(data);
    const [count, setCount] = useState(5);

    let id = props.detail_shoes_id;

    // useEffect(() => {
    // axiosBaseURL.get(`http://192.168.42.142:3001/products/${id}/gender`)
    // .then((data) => {
    //     if (data.data && data.data.length > 0) {
    //         console.log("data : ", data.data);  
    //         setShoes(data.data[0]);
    //     } else {
    //         console.log("데이터가 비어 있음");
    //     }
    // })
    // .catch((error) => {
    //     console.log("실패함", error);  
    // });
    // }, [gender]);

    return(
        <div style={{marginTop:"70px"}}>
            <div style={{marginLeft:"10px", marginBottom:"15px", fontWeight:"bold", fontSize:"22px"}}>
                성별 상품
            </div>
            <div style={{display:"flex", flexWrap: "wrap"}}>
                {shoes.map((shoes, i) => ( 
                    <div key={shoes.id} style={{  boxSizing: "border-box" }}>
                        <Shoesitem0 shoes={shoes} i={i + 1} />
                    </div>
                ))}
            </div>
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
export default Detail_shoes3;