import "./css/detail_shoes.css";
import React, { useState } from "react";
import data from "../data/data.js";

const Detail_shoes = () => {
    const loadMore = () => {
        setCount(count + 5);
    };
    
    const [shoes, setShoes] = useState(data);
    const [count, setCount] = useState(5);

    return(
        <div >
            <div style={{marginLeft:"10px", marginBottom:"15px", fontWeight:"bold", fontSize:"22px"}}>
                최근 본 상품
            </div>
            <div style={{display:"flex", flexWrap: "wrap"}}>
                {shoes.slice(0, count).map((shoes, i) => ( 
                    <div key={shoes.id} style={{  boxSizing: "border-box" }}>
                        <Shoesitem0 shoes={shoes} i={i + 1} />
                        {/* {(i + 1) % 5 === 0 && <div style={{  height: 0 }}></div>} */}
                    </div>
                ))}
            </div>
            {count < data.length && (
                <div style={{textAlign:"center"}}>
                    <button onClick={loadMore}>더보기</button>
                </div>
            )}
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