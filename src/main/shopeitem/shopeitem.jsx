import React from 'react';
import { useNavigate } from 'react-router-dom';



export const Shopeitem = ({ shopdata, i}) => {
  const navigate = useNavigate();
  return (

    <div className="">
      <div className="card"  style={{border:'none'}}>
        <img
          onClick={()=>navigate(`/products/${shopdata.prid}`)} className="card-img-top" style={{backgroundColor:'#f4f4f4'}}
          src={`./images/${shopdata.imgName}`}
          alt={shopdata.nameKor}
        />
        <div className="card-body">
          <h5  onClick={()=>navigate(`/products/${shopdata.id}`)} className="card-title cursor">{shopdata.nameKor}</h5>
          <p  onClick={()=>navigate(`/products/${shopdata.id}`)} className="card-tex cursor">{shopdata.brand}</p>
          <p  onClick={()=>navigate(`/products/${shopdata.id}`)} className="card-text cursor">{shopdata.price}</p>
          <p onClick={()=>navigate(``)}>dsf</p>
        </div>
    
      </div>
    </div>
  );
};
