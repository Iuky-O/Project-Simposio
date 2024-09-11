import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '../Styles/Carousel.css';

const Carousel = ({ children, slidesToScroll = 1, slidesVisible = 1 }) => {
  const options = { slidesToScroll, align: 'start' };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', updateButtons);
    updateButtons();
  }, [emblaApi]);

  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container" style={{ display: 'flex' }}>
          {children.map((child, index) => (
            <div 
              className="carousel__slide" 
              key={index} 
              style={{ minWidth: `${100 / slidesVisible}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel__button prev"
        onClick={() => emblaApi.scrollPrev()}
        disabled={!canScrollPrev}
      >
        Prev
      </button>
      <button
        className="carousel__button next"
        onClick={() => emblaApi.scrollNext()}
        disabled={!canScrollNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
