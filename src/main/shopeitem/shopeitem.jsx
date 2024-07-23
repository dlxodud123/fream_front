import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiBookmark } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import './shop.css';
import Shopmodal from './shopmodal';
export const Shopeitem = ({ shopdata, i }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="">
      <div className="card" style={{ border: 'none' }}>
        <img
          onClick={() => navigate(`/products/${shopdata.prid}`)} 
          className="card-img-top" 
          style={{ backgroundColor: '#f4f4f4' }}
          src={`./images/${shopdata.imgName}`}
          alt={shopdata.nameKor}
        />
        <div className="card-body">
          <h5 onClick={() => navigate(`/products/${shopdata.id}`)} className="card-title cursor">{shopdata.nameKor}</h5>
          <p onClick={() => navigate(`/products/${shopdata.id}`)} className="card-tex cursor">{shopdata.brand}</p>
          <p onClick={() => navigate(`/products/${shopdata.id}`)} className="card-text cursor">{shopdata.price}</p>
          <div onClick={handleToggle} style={{ display: 'inline-block', cursor: 'pointer' }}>
            <div style={{display:'flex'}}>
            {isChecked ? <FaBookmark size={22} /> : <BiBookmark size={25} />}
            <p style={{marginLeft:'4px',marginTop:'4px',fontSize:'13px',color:'rgb(0,0,0,0.4)'}}>1,232</p>
            </div>
          
          </div>
        </div>
      </div>
      <Shopmodal
       isChecked={isChecked} 
       setIsChecked={setIsChecked} 
       closeModal={closeModal}
       showModal={showModal}
       ></Shopmodal>
     
    </div>
  );
};


