import './css/main.css';
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { MyPage } from '../login/js/Mypage';
import App from '../App';
import data from '../data/data';
import header from '../common/header';
import Header from '../common/main_header';
import {Shoesitem0}from './Shoesitem';
import Benner from './benner';
import axios from 'axios';
import Mainbutton from './mainbutton';
import mendata from '../mendata/mendata';
import MainHeader from '../common/main_header';

import Footer from '../common/footer';




function App1() {
  let navigate = useNavigate();

  let [shoes,setShoes] = useState(data);
  const [count, setCount] = useState(3); // Initialize to show first 3 items
  const loadMore = () => {
    setCount(count + 3); // Increase count by 3
  };


  return (
    <>
    <div className="App">
      
      <MainHeader></MainHeader>
      <div style={{paddingTop:'80px'}}></div>
      <Benner></Benner>
 
      <Mainbutton></Mainbutton>

      {/* <div className="container"> */}

    <div style={{width:"1280px", margin:"auto"}}>
      <div className="row">
        <div style={{marginLeft:"60px"}} className='font-a'>
          <h6 >Most Popular</h6>
          <h4 className='font__color-a'>인기상품</h4>
      </div>
      <div className="row">
        {data.slice(0, count).map((shoes, i) => (
          <Shoesitem0 key={shoes.id} shoes={shoes} i={i + 1} />
        ))}
      </div>
      {count < data.length && (
        <div className="center-button">
          <button className="load-more-button" onClick={loadMore}>더보기</button>
        </div>
      )}
   </div>
</div>
        <div style={{height:'50px'}}></div>
      <Footer></Footer>
    </div>
    </>
    
  );
}


export default App1;
