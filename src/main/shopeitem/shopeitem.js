import React from 'react';
import { useNavigate } from 'react-router-dom';



export const Shopeitem = ({ shoesitemsimg, i}) => {
  const navigate = useNavigate();
  return (

    <div className="">
      <div className="card"  style={{border:'none'}}>
        <img
          onClick={()=>navigate(`/product/${shoesitemsimg.id}`)} className="card-img-top" style={{backgroundColor:'#f4f4f4'}}
          src={shoesitemsimg.image}
          alt={shoesitemsimg.name}
        />
        <div className="card-body">
          <h5  onClick={()=>navigate(`/product/${shoesitemsimg.id}`)} className="card-title cursor">{shoesitemsimg.name}</h5>
          <p  onClick={()=>navigate(`/product/${shoesitemsimg.id}`)} className="card-tex cursor">{shoesitemsimg.title}</p>
          <p  onClick={()=>navigate(`/product/${shoesitemsimg.id}`)} className="card-text cursor">{shoesitemsimg.price}</p>
        </div>
      </div>
    </div>
  );
};
