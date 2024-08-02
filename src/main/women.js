import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../data/data';
import Header from '../common/main_header';
import Footer from '../common/footer';
import Mainbutton from './mainbutton';
import { useEffect, useState } from 'react';
import Womendata from './womendata/womendata';
import  Womenshoes  from './womenshoes';
import axios from 'axios';

function Women(){
  let [womenshoes,setWomenshoes] = useState([]);
  const [count, setCount] = useState(3); // Initialize to show first 3 items
  const loadMore = () => {
    setCount(count + 3); // Increase count by 3
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/woman");
        console.log(response.data)
        setWomenshoes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
    return(
        <>
        <Header></Header>
        <Mainbutton/>

        <div style={{width:"1280px", margin:"auto"}}>
        <div style={{marginLeft:"60px"}}>
          <h6 >Most Popular</h6>
          <h4 className='font__color-a'>여성추천</h4>
        </div>
        <div className="row">
    
        {womenshoes.slice(0, count).map((womenshoes, i) => (
          <Womenshoes key={womenshoes.id} womenshoes={womenshoes} i={i + 1} />
        ))}
      </div>
      {count < Womendata.length && (
        <div className="center-button">
          <button className="load-more-button" onClick={loadMore}>더보기</button>
        </div>
      )}
    </div>
        <Footer></Footer>
        </>
    )
}

export default Women;