import React from 'react';
import Carousel from '../Utils/Carrousel'; 
import '../Styles/TimelineArea.css'; 

const slides = [
    <div>DIA 1</div>,
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
