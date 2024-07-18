import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding-top: 10px;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
`;

function StyleCategoryCard({ image, title }) {
  return (
    <Card>
      <ImageContainer>
        <Image src={image} alt={title} />
      </ImageContainer>
      <Title>{title}</Title>
    </Card>
  );
}

export default StyleCategoryCard;
