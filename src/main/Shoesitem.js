import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ItemContainer = styled.div`
  text-align: center;
  flex: 1 1 300px;
  max-width: 300px;
  margin: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    flex: 1 1 48%;
    max-width: 48%;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    flex: 1 1 31%;
    max-width: 31%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  background: #f4f4f4;
  cursor: pointer;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  text-align: left;
  margin: 10px 0;
`;

const Brand = styled.h6`
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const Name = styled.h4`
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const Price = styled.h6`
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

function Shoesitem0(props) {
  const navigate = useNavigate();
  const { brand, nameKor, price, imgName, prid } = props.shoes;
  const getImagePath = (imgName, prid) => {
    return imgName ? `/api/admin/products/files/${imgName}` : `/api/admin/products/files/${prid}_1.png`;
  };
 
  return (
    <ItemContainer>
      <Image onClick={() => navigate(`/products/${prid}`)} src={ getImagePath(imgName, prid)} />
      <InfoContainer>
        <Brand onClick={() => navigate(`/products/${prid}`)}>{brand}</Brand>
        <Name onClick={() => navigate(`/products/${prid}`)}>{nameKor}</Name>
        <Price onClick={() => navigate(`/products/${prid}`)}>{price}원</Price>
      </InfoContainer>
    </ItemContainer>
  );
}

export { Shoesitem0 };
