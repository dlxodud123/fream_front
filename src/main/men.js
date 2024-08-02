import '../App.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MyPage from '../myPage/js/Mypage.js';
import App from '../App';
import data from '../data/data';
import Header from '../common/main_header';
import Footer from '../common/footer';
import Mainbutton from './mainbutton';
// import mendata from '../mendata/mendata';
import { Menshoes } from './menshoes';
import axios from 'axios';

function Men(){
    const [count, setCount] = useState(3); // Initialize to show first 3 items
    const loadMore = () => {
      setCount(count + 3); // Increase count by 3
    };
    let [menshoes,setMenshoes] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/api/man");
          console.log(response.data)
          setMenshoes(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
    return(
        <>
        <Header></Header>
        <Mainbutton></Mainbutton>

        <div style={{width:"1280px", margin:"auto"}}>
          <div style={{marginLeft:"60px"}}>
            <h6 >Most Popular</h6>
            <h4 className='font__color-a'>남성추천</h4>
          </div>
          <div className="row">
            {menshoes.slice(0, count).map((menshoes, i) => (
              <Menshoes key={menshoes.id} menshoes={menshoes} i={i + 1} />
            ))}
          </div>
      {count < menshoes.length && (
        <div className="center-button">
          <button className="load-more-button" onClick={loadMore}>더보기</button>
        </div>
      )}
    </div>
        <Footer></Footer>
        </>
        
    )
}

export default Men;