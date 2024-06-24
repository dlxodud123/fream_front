import "./css/detail_form.css";
import Footer from "../common/footer";
import Header from "../common/header.js";
import Detail_img from "./detail_img.js";
import Detail_info from "./detail_info.js";
import Detail_size from "./detail_size.js";
import { createContext, useState } from "react";
import Detail_shoes from "./detail_shoes.js";
import Detail_shoes2 from "./detail_shoes2.js";

export let context1 = createContext();

const Detail_form = () => {
    return(
        <body className="body1">
            <Header></Header>
            <div className="detail_container">
                <Detail_img className="detail_img"></Detail_img>
                <div style={{height:"1680px", width:"1px",marginLeft:"40px", backgroundColor:"rgba(0,0,0,0.1)"}}></div>
                <Detail_info className="detail_info"></Detail_info>
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
            <div style={{height:"50px"}}></div>
            <Footer></Footer>
        </body>
    )
}

export default Detail_form;