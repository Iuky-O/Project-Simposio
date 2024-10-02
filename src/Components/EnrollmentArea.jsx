import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/EnrollmentArea.css';

const EnrollmentArea = () => {
  const navigate = useNavigate(); 

  const handleSpeakerClick = () => {
    navigate(`/login`); 
  };

  const calculateTimeLeft = () => {
    const difference = +new Date('2024-10-21') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown-container">
      <div>
        <h1 className='chamada'>Venha fazer parte desta experiência!</h1>
        <p className='subtexto'>Clique no botão abaixo para garantir o seu ingresso por R$ 75,00 reais!</p>
        {/* Corrigido onClick */}
        <button className="ticket-button" id="ticket-button" onClick={() => handleSpeakerClick()}>
          COMPRAR MEU INGRESSO
        </button>
        <div id="message"></div>
      </div>
      <div className="countdown">
        <div className="countdown-item">
          <span>{timeLeft.days || '0'}</span>
          <span className="label">Dias</span>
        </div>
        <div className="countdown-item">
          <span>{timeLeft.hours || '0'}</span>
          <span className="label">Horas</span>
        </div>
        <div className="countdown-item">
          <span>{timeLeft.minutes || '0'}</span>
          <span className="label">Minutos</span>
        </div>
        <div className="countdown-item">
          <span>{timeLeft.seconds || '0'}</span>
          <span className="label">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentArea;
