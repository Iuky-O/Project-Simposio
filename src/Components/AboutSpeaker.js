import React from 'react';
import { useParams } from 'react-router-dom';
import {Styles} from '../Styles/AboutSpeakerStyles.css'
import { Options_Speakers } from '../Data/SpeakersData';
import { FcNext } from "react-icons/fc";

function AboutSpeaker() {

  const { id } = useParams(); // Pegar o id da URL
  const speaker = Options_Speakers[id]; // Encontrar o palestrante pelo id

  if (!speaker) {
    return <h2>Palestrante não encontrado</h2>;
  }

  return (
    <div class="about-speaker" id="about">
            <div class="about-img">
            <img src={speaker.image} alt={speaker.name} />
            </div>

            <div class="about-content">
                <h2 class="heading">{speaker.name}</h2>
                
                <p>{speaker.title}</p>

                <div className='participations'>
                  <h3 className='topic-part'>Participações no Evento:</h3>

                  <div className='card-info'>
                    <p>{speaker.lectures}</p> 
                  </div> 
                </div>
     
            </div>
        </div>
  );
}

export default AboutSpeaker;
