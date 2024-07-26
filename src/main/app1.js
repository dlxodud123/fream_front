import "./css/main.css";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { MyPage } from "../myPage/js/Mypage.js";
import App from "../App.js";
// import data from '../data/data';
import header from "../common/header.js";
import Header from "../common/main_header.js";
import { Shoesitem0 } from "./Shoesitem.js";
import Benner from "./benner.js";
import axios from "axios";
import Mainbutton from "./mainbutton.js";
import mendata from "../mendata/mendata.js";
import MainHeader from "../common/main_header.js";

import Footer from "../common/footer.js";

function App1() {
  let navigate = useNavigate();

  let [shoes, setShoes] = useState([]);
  const [count, setCount] = useState(3); // Initialize to show first 3 items
  const loadMore = () => {
    setCount(count + 3); // Increase count by 3
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axiosBaseURL.get(
        //   "http://localhost:3001/home"
        //   // "http://43.200.110.19:8080/home"
        // );
        const response = await axios.get("/api/home");
        const data = response.data;

        setShoes(response.data);
        console.log(response.data); // 상태 업데이트 후의 데이터를 로그로 출력
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <MainHeader></MainHeader>
        <div style={{ paddingTop: "80px" }}></div>
        <Benner></Benner>

        <Mainbutton></Mainbutton>

        {/* <div className="container"> */}

        <div style={{ width: "1280px", margin: "auto" }}>
          <div className="row">
            <div style={{ marginLeft: "68px" }} className="font-a">
              <h6>Most Popular</h6>
              <h4 className="font__color-a">인기상품</h4>
            </div>
            <div className="row">
              {shoes.slice(0, count).map((shoes, i) => (
                <Shoesitem0 key={shoes.id} shoes={shoes} i={i + 1} />
              ))}
            </div>
            {count < shoes.length && (
              <div className="center-button">
                <button className="load-more-button" onClick={loadMore}>
                  더보기
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: "50px" }}></div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App1;
