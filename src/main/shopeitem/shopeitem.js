import React from 'react';

export const Shopeitem = ({ shoesitemsimg, i }) => {
  return (
    <div className="">
      <div className="card">
        <img
          className="card-img-top"
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
