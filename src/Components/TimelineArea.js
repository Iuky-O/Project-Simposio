import React from 'react';
import Carousel from '../Utils/Carrousel';
import '../Styles/TimelineArea.css';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const slides = [
  <div>
    <p className='text-date'>21/10/2024</p>
    <h2> DIA 1</h2>
    <p className='text-palestra'>Palestra 1</p>
    <p className='text-info'>testedbsajkfwelsg 17:00 PM</p>
    <p className='text-curso'>Curso 1 </p>
    <p className='text-info'>testedbsajkfwelsg 18:00 PM</p>
    </div>,
  <div>DIA 2</div>,
  <div>DIA 3</div>,
  <div>DIA 4</div>,
  <div>DIA 5</div>,
];
const TimelineArea = () => {
  return (
    <div className="timeline-area">
      <h2>Minha Timeline</h2>
      <Carousel slidesToScroll={2} slidesVisible={3}>
        {slides}
      </Carousel>
    </div>
    
  );
};

export default TimelineArea;
