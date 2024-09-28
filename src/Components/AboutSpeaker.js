import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/AboutSpeakerStyles.css';
import { Options_Speakers } from '../Data/SpeakersData'; // Certifique-se de que esse arquivo existe e contém as informações dos palestrantes
import { FiVolume2 } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

function AboutSpeaker() {
  const { id } = useParams(); // Pegar o id da URL
  const speaker = Options_Speakers[id]; // Encontrar o palestrante pelo id

  const [showParticipations, setShowParticipations] = useState(false); // Estado para controlar a exibição

  if (!speaker) {
    return <h2>Palestrante não encontrado</h2>;
  }

  return (
    <div className="about-speaker" id="about">
      <div className="container-sections">
        {/* Imagem do Palestrante */}
        <div className="about-img-speaker">
          <div className='about-img-name'>
            <img src={speaker.image} alt={speaker.name} className='img-speaker' />
            <h2 className="heading">{speaker.name}</h2>

          </div>
          
        </div>

        {/* Faixa Vertical de Ícones */}
        <div className="icon-container">
          <div className='icon-btn' onClick={() => setShowParticipations(false)} >
            <AiOutlineUser 
              className={`icon ${!showParticipations ? 'active' : ''}`} 
            />
          </div>
          <div className='icon-btn' onClick={() => setShowParticipations(true)}>
            <FiVolume2 
              className={`icon ${showParticipations ? 'active' : ''}`} 
            />
          </div>
        </div>

        {/* Conteúdo do Palestrante */}
        <div className="about-content-speaker">
          {showParticipations ? (
            <div className='participations-speaker'>
              <h2 className='topic-part'>Participações</h2>
              <div className='card-info-speaker'>
                <p>{speaker.lectures}</p>
              </div>
            </div>
          ) : (
            <div className='info-speaker'>
              <h2 className="topic-part">Descrição</h2>
              <p>{speaker.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutSpeaker;
