import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Shoesheader from "../../common/shopeheader";
import Footer from "../../common/footer";
import AdvancedExample from "./shopebenner";
import FilterComponent from "./FilterComponent";
import { Shopeitem } from "./shopeitem";
import shoesitems from "../shoesitemdata/shoesitemdata";
import '../css/main.css'; // Ensure this is imported to apply the CSS
import { data } from 'jquery';


function Shope() {
  let [shopdata, setShopData] = useState([]);
  let navigate = useNavigate();
  const [count, setCount] = useState(6);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true);
  const [filters, setFilters] = useState({
    category: {
      신발: true,
      스니커즈: false,
      샌들: false,
      플랫: false,
      로퍼: false,
      패션잡화: false,
      컬렉터블: false,
      뷰티: false,
      테크: false,
      캠핑: false,
    },
    gender: {
      MAN: false,
      WOMAN: false,
    },
    brand: {
      Adidas: false,
      Oofos: false,
      'Dr.Martens': false,
      UGG: false,
      Alexander: false,
      Keen: false,
      Crocs: false,
      Vans: false,
      Nike: false,
      Hermes: false,
      Fila: false,
      'New Balance': false,
      Salomon: false,
      OOFOS: false,
      Chloe: false,
      Asics: false,
      Timberland: false,
      Jordan: false,
      TawToe: false,
      Hoka: false,
      Birkenstock: false,
    },
    color: {
      Beige: false,
      Black: false,
      Blue: false,
      Brown: false,
      Gold: false,
      Green: false,
      Grey: false,
      Navy: false,
      Orange: false,
      Pink: false,
      Purple: false,
      Red: false,
      Silver: false,
      White: false,
      Yellow: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.13:3001/shop');
        const data = await response.json();
        setShopData(data); // 데이터 설정
        console.log(data); // 상태 업데이트 후의 데이터를 로그로 출력
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const loadMore = () => {
    setCount(prevCount => {
      const newCount = prevCount + 6;
      if (newCount >= filteredItems.length) {
        setIsLoadMoreVisible(false);
      }
      return newCount;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight * 0.8 && isLoadMoreVisible) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoadMoreVisible]);

  const filteredItems = shopdata.filter((item) => {
    const { MAN, WOMAN } = filters.gender;
    const selectedColors = Object.keys(filters.color).filter(color => filters.color[color]);
    const selectedBrands = Object.keys(filters.brand).filter(brand => filters.brand[brand]);

    const genderMatch = (MAN && WOMAN) || (!MAN && !WOMAN)
      ? true
      : MAN
      ? item.gender === 'MAN' || item.gender === 'UNIVERSAL'
      : WOMAN
      ? item.gender === 'WOMAN' || item.gender === 'UNIVERSAL'
      : true;
    const colorMatch = selectedColors.length > 0 ? selectedColors.includes(item.color) : true;
    const brandMatch = selectedBrands.length > 0 ? selectedBrands.includes(item.brand) : true;

    return genderMatch && colorMatch && brandMatch;
  });

  return (
    <>
      <Shoesheader />
      <div style={{ paddingTop: '120px' }}></div>
      <AdvancedExample />
      <div style={{ display: 'flex', width: "1280px", margin: "auto" }}>
        <FilterComponent shopdata={filters} onFiltersChange={handleFiltersChange} />
        <div style={{ width: '1200px' }} className="">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }} className="">
            {/* {shopdata.slice(0, count).map((item,i)=>{
              console.log("item:"+item);
                 <Shopeitem key={item.id} shopdata={item} i={i+1}/>
            })} */}
            {filteredItems.map((item, i) => (
              <Shopeitem key={i} shopdata={item} i={i + 1} />
            ))}
          </div>
          {isLoadMoreVisible && count < filteredItems.length && (
            <div className="center-button">
              <button className="load-more-button" onClick={loadMore}>더보기</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shope;
