import React from 'react';
import { useParams } from 'react-router-dom';
import {Styles} from '../Styles/AboutSpeakerStyles.css'
import { Options_Speakers } from '../Data/SpeakersData';

function AboutSpeaker() {

  const { id } = useParams(); // Pegar o id da URL
  const speaker = Options_Speakers[id]; // Encontrar o palestrante pelo id

  if (!speaker) {
    return <h2>Palestrante não encontrado</h2>;
  }

  return (
    <div className='about-speaker'>
        <div className='about-speaker-img'>
            <img src={speaker.image} alt={speaker.name} />
        </div>
       
        <div class="about-content">
            <h2 className='heading-about-speaker'>{speaker.name}</h2>
            <p>{speaker.title}</p>

            <h2>Assuntos que irá ministrar</h2>

            <div className='lectures-course'>
                <div className='card-info'>
                   <p>{speaker.lectures}</p> 
                </div> 
            </div>
            
        </div>
      
    </div>
  );
}

export default AboutSpeaker;
