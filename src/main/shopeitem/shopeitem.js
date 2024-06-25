import React from 'react';
import { useNavigate } from 'react-router-dom';



export const Shopeitem = ({ shoesitemsimg, i}) => {
  const navigate = useNavigate();
  return (

    <div className="">
      <div className="card" >
        <img
          onClick={()=>navigate(`/product/${shoesitemsimg.id}`)} className="card-img-top" style={{backgroundColor:'black'}}
          src={shoesitemsimg.image}
          alt={shoesitemsimg.name}
        />
        <div className="card-body">
          <h5 className="card-title">{shoesitemsimg.name}</h5>
          <p className="card-text">{shoesitemsimg.title}</p>
          <p className="card-text">{shoesitemsimg.price}</p>
        </div>
      </div>
    </div>
  );
};
