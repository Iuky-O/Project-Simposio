import React from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/AboutLecturesStyles.css'; // Certifique-se de que o CSS é atualizado para este componente
import { Options_Lectures } from '../Data/LecturesData';

function AboutLectures() {
  const { id } = useParams(); // Pegar o id da URL
  const lectureId = parseInt(id); // Converter id para número
  const lecture = Options_Lectures.find((palestra) => palestra.id === lectureId); // Encontrar a palestra pelo id

  if (!lecture) {
    return <h2>Palestra não encontrada</h2>;
  }

  return (
    <div className="about-lectures" id="about">
      <div className="container-sections">
        {/* Seção da palestra */}
        <div className="lecture-info">
          <h2 className="heading-lectures">{lecture.title}</h2>
          <h3 className="topic-part">Informações da Palestra:</h3>
          <div className="card-info">
            <p>Data: {lecture.data}</p>
            <p>Horário: {lecture.horario}</p>
            <p>Responsável: {lecture.responsavel}</p>
            <p>{lecture.description}</p>
          </div>
        </div>

        {/* Imagem de fundo da palestra */}
        <div className="lecture-image-background">
        </div>
      </div>
    </div>
  );
}

export default AboutLectures;
