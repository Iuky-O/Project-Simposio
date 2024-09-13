import React from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/AboutLecturesStyles.css';
import { Options_Lectures } from '../Data/LecturesData';

function AboutLectures() {
  const { id } = useParams(); // Pegar o id da URL
  const lectureId = parseInt(id); // Converter id para número
  const lecture = Options_Lectures.find((palestra) => palestra.id === lectureId); // Encontrar a palestra pelo id

  if (!lecture) {
    return <h2>Palestra não encontrada</h2>;
  }

  return (
    <div className="about-speaker" id="about">
      <div className="about-content">
        <h2 className="heading-lectures">{lecture.title}</h2>

        <div className="participations-lectures">
          <h3 className="topic-part">Informações da Palestra</h3>

          <div className="card-info">
            <p>Data: {lecture.data}</p>
            <p>Horário: {lecture.horario}</p>
            <p>{lecture.responsavel}</p>
            <p>{lecture.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutLectures;
