import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import imgMainButton0 from '../img/main-button0.webp';
import imgMainButton1 from '../img/main-button1.webp';
import imgMainButton2 from '../img/main-button2.webp';
import imgMainButton3 from '../img/main-button3.webp';
import imgMainButton4 from '../img/main-button4.webp';
import './css/main.css';

const MainButtonContainer = styled.div`
  padding-top: 90px;
  width: 100%;
  max-width: 1280px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Column = styled.div`
  flex: 1 1 300px;
  max-width: 300px;
  margin: 10px;
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

function Mainbutton() {
  let navigate = useNavigate();

  return (
    <MainButtonContainer>
      <Row>
        <Column>
          <ImageContainer>
            <Image onClick={() => navigate('/')} src={imgMainButton0} alt="크림드로우" />
          </ImageContainer>
          <p>크림드로우</p>
          <ImageContainer>
            <Image src={imgMainButton1} alt="정가아래" />
          </ImageContainer>
          <p>정가아래</p>
        </Column>
        <Column>
          <ImageContainer>
            <Image onClick={() => navigate('/men')} src={imgMainButton2} alt="남성추천" />
          </ImageContainer>
          <p>남성추천</p>
          <ImageContainer>
            <Image onClick={() => navigate('/women')} src={imgMainButton3} alt="여성추천" />
          </ImageContainer>
          <p>여성추천</p>
        </Column>
        <Column>
          <ImageContainer>
            <Image src={imgMainButton0} alt="나이키" />
          </ImageContainer>
          <p>나이키</p>
          <ImageContainer>
            <Image src={imgMainButton4} alt="아디다스" />
          </ImageContainer>
          <p>아디다스</p>
        </Column>
      </Row>
    </MainButtonContainer>
  );
}

export default Mainbutton;
