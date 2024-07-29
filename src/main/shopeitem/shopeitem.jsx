import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiBookmark } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import './shop.css';
import Shopmodal from './shopmodal';
import { UserAuthContext } from '../../Auth/UserAuthContext';

export const Shopeitem = ({ shopdata, i }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState([]);

  const { isLoggedIn } = useContext(UserAuthContext);

  const handleToggle = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      navigate('/login');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmToggle = (sizes) => {
    setSelectedSize(sizes);
    setIsChecked(sizes.length > 0); // Change to FaBookmark if sizes are selected
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
          <p onClick={() => navigate(`/products/${shopdata.id}`)} className="card-text cursor">{shopdata.brand}</p>
          <p onClick={() => navigate(`/products/${shopdata.id}`)} className="card-text cursor">{shopdata.price}원</p>
          <div onClick={handleToggle} style={{ display: 'inline-block', cursor: 'pointer' }}>
            <div style={{ display: 'flex' }}>
              {isChecked ? <FaBookmark size={22} /> : <BiBookmark size={25} />}
              <p style={{ marginLeft: '4px', marginTop: '4px', fontSize: '13px', color: 'rgb(0,0,0,0.4)' }}>1,232</p>
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <Shopmodal
          selectedSize={selectedSize}
          confirmToggle={confirmToggle}
          closeModal={closeModal}
          showModal={showModal}
          prId={shopdata.prid}
        />
      )}
    </div>
  );
};
