import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpeakersStyles from '../Styles/SpeakersStyles.css';

import { Options_Speakers } from '../Data/SpeakersData';

function Speakers() {

  const navigate = useNavigate(); 

  const handleSpeakerClick = (index) => {
    navigate(`/aboutspeaker/${index}`); 
  };
  
  return (
    <div className='speakers'>

      <div className='topic'>
        <h1 className='heading-speaker'>Lista de <span>Palestrantes</span></h1>
      </div>

      <div className='speakers-container' onClick={() => ('/spearks')}>

        {Options_Speakers.map((item, index) => (
          <div className='speaker-card' key={index} onClick={() => handleSpeakerClick(index)}>
            <img src={item.image} alt='' />
            <div className='speaker-info'>
              <div className='text-container'>
                <h4>{item.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Speakers;
