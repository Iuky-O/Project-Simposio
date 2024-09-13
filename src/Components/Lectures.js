import React, {useState} from "react";
import "../Styles/LecturesStyles.css";
import { Options_Lectures } from '../Data/LecturesData';
import { useNavigate } from 'react-router-dom';

const Lectures = () => {

  const navigate = useNavigate(); 

  const handleSpeakerClick = (index) => {
    navigate(`/aboutslectures/${index}`); 
  };

  // Separar palestras por dia
  const palestrasPorDia = Options_Lectures.reduce((acc, palestra) => {
    acc[palestra.dia] = acc[palestra.dia] || [];
    acc[palestra.dia].push(palestra);
    return acc;
  }, {});

  return (
    <div className="lecture-container">
      {Object.keys(palestrasPorDia).map((dia) => (
        <div key={dia} className="dia-section">
          <h2 className="dia-title">{dia}</h2>
          {palestrasPorDia[dia].map((palestra, index) => (
            <div key={palestra.id} className="lecture-card">
              <div className="lecture-content">
                <h3 className="lecture-title">{palestra.title}</h3>
                <p className="lecture-description">
                  Horário: {palestra.horario} - Data: {palestra.data}
                </p>
                <button className="lecture-button" onClick={() => handleSpeakerClick(palestra.id)}>Saiba Mais</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Lectures;
