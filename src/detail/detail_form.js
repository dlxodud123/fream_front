import "./css/detail_form.css";
import Footer from "../common/footer";
import Detail_header from "../common/detail_header.js";
import Detail_img from "./detail_img.js";
import Detail_info from "./detail_info.js";
import Detail_size from "./detail_size.js";
import { useEffect, useState } from "react";
import Detail_shoes from "./detail_shoes.js";
import Detail_shoes2 from "./detail_shoes2.js";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail_form = () => {
    let [final_size, setFinal_Size] = useState("모든 사이즈");
    const {id} = useParams();

    let [main_info_shoes, setMain_info_shoes] = useState([]);

    useEffect(() => {
        axios.get(`http://192.168.42.142:3001/products/${id}`)
        .then((data) => {
            if (data.data && data.data.length > 0) {
                setMain_info_shoes(data.data[0]);
                console.log("data : ", data.data[0]);  
            } else {
                console.log("데이터가 비어 있음");
            }
        })
        .catch((error) => {
            console.log("실패함", error);  
        });
      }, [id]);

    return(
        <>
            <div className="body1">

                {/* <img src={`${process.env.PUBLIC_URL}/images/kream_img001.jpg`} alt="asdf"></img> */}
                {/* {
                    shoes && (
                        <div>
                            <p>{shoes.prid}</p>
                            <p>{shoes.nameKor}</p>
                            <p>{shoes.nameEng}</p>
                            <p>{shoes.category}</p>
                            <p>{shoes.brand}</p>
                            <p>{shoes.color}</p>
                            <p>{shoes.gender}</p>
                            <p>{shoes.price}</p>
                            <img src={`${process.env.PUBLIC_URL}/images/${shoes.imgName}`} alt={shoes.nameKor} />
                        </div>
                    )
                } */}
                <Detail_header final_size={final_size} setFinal_Size={setFinal_Size}></Detail_header>
                <div className="detail_container">
                    <Detail_img detail_main_image={main_info_shoes.imgName}></Detail_img>
                    <div style={{height:"1680px", width:"1px",marginLeft:"40px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                    <Detail_info main_info_shoes={main_info_shoes} final_size={final_size} setFinal_Size={setFinal_Size} className="detail_info"></Detail_info>
                </div>
                <div className="detail_cotainer2">
                    <Detail_shoes></Detail_shoes>
                </div>
                <div className="detail_container3">
                    <Detail_size></Detail_size>
                </div>
                <div className="detail_container4">
                    <Detail_shoes2></Detail_shoes2>
                </div>
                <div className="detail_container4">
                    <Detail_shoes2></Detail_shoes2>
                </div>
                <div style={{height:"50px"}}></div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Detail_form;