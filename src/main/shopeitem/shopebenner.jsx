import React, { useState, } from 'react';
import {useNavigate } from 'react-router-dom';
import '../css/main.css';
// import itembutton from '../../itemdata/itemdata';
// import itembutton0 from '../img/itemimg0.gif'
// import itembutton1 from '../img/itembutton1.webp'
// import itembutton2 from '../img/itembutton2.webp'
// import itembutton3 from '../img/itembutton3.webp'
import '../../main/itemcss/item.css';
import items1 from '../../itemdata/itemdata';
const MyComponent = () => {
  let navigate = useNavigate();
//   const items = [
//     { name: '실시간 차트', image: itembutton0 },
//     { name: 'KREAM카드', image: itembutton1 },
//     { name: '여름마켓 입장', image: itembutton2 },
//     { name: '반팔 티셔츠', image: itembutton3 },
//     { name: '30% 적립', image: 'path/to/image5.jpg' },
//     { name: '폴로랄프로렌', image: 'path/to/image6.jpg' },
//     { name: '로맨틱 삼바', image: 'path/to/image7.jpg' },
//     { name: '티켓 & 머치', image: 'path/to/image8.jpg' },
//     { name: '내 폰 시세', image: 'path/to/image9.jpg' },
//     { name: '스투시', image: 'path/to/image10.jpg' }
//   ];

let [items] = useState(items1)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="trend_keywords_grid">
      <div className="flicking-viewport">
        <div
          className="trending_keyword_slide"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div className="trending_keyword_item" key={index}>
              <img onClick={()=>{navigate(item.path);}} className='img-mainbutton1' src={item.image} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="moving-control" >
        <button style={{backgroundColor:'white'}}
          className={`arrow prev ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
        >
          &lt;
        </button>
        <div className="page-indicator">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={currentIndex === index ? 'active' : ''}
            ></span>
          ))}
        </div>
        <button style={{backgroundColor:'white'}}
          className={`arrow next ${currentIndex === totalPages - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
