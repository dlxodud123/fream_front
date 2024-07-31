import React from 'react';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import './css/main.css';

const StyledCarousel = styled(Carousel)`
  width: 100%;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  background-color: white;
`;

function Benner() {
  return (
    <StyledCarousel interval={2000}>
      <Carousel.Item>
        <CarouselImage className="img-a" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage className="img-b" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage className="img-c" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage className="img-d" />
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage className="img-e" />
      </Carousel.Item>
    </StyledCarousel>
  );
}

export default Benner;
