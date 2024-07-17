import "./css/main.css";
import React from 'react';
import { Carousel } from 'react-bootstrap';

function Benner(){
    return(
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <Carousel interval={2000}>
          <Carousel.Item>
            <img
              className="img-a"
              style={{ width:'100%', height: '500px', objectFit: 'cover', backgroundColor:'white'}}
            />
          </Carousel.Item>
          <Carousel.Item>
          <img
            className='img-b'
            style={{ width:'100%',height: '500px', objectFit: 'cover' }}
          />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-c"
              style={{ width:'100%',height: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-d"
              style={{ width:'100%',height: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-e"
              style={{ width:'100%',height: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    )
}

export default Benner;