import React from 'react';
import { Carousel } from 'react-bootstrap';
import slideImage1 from '../../assets/images/1.jpg';
import slideImage2 from '../../assets/images/6.jpg';
import slideImage3 from '../../assets/images/8.jpg';

const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="ratio ratio-16x9">
          <img
            className="d-block w-100"
            src={slideImage1}
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Capture Joyful Moments!</h3>
          <p>Create Happy Memories With Us!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="ratio ratio-16x9">
          <img
            className="d-block w-100"
            src={slideImage2}
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Turn Smiles into Art!</h3>
          <p>Bright Moments, Beautiful Photos!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="ratio ratio-16x9">
          <img
            className="d-block w-100"
            src={slideImage3}
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Capture the Joy, Frame the Fun!</h3>
          <p>Freeze the Fun With Perfect Pictures!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
