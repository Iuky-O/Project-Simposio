import React from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/AboutCoursesStyles.css';
import { Options_Courses } from '../Data/CoursesData';

function AboutCourses() {
  const { id } = useParams(); // Pegar o id da URL
  const course = Options_Courses[id]; // Encontrar o curso pelo id

  if (!course) {
    return <h2>Curso não encontrado</h2>;
  }

  return (
    <div className="about-courses">
      {/* Seção de Informações e Imagem */}
      <div className="info-section">
        <div className="course-img">
          <img src={course.imgUrl} alt={course.title} />
        </div>
        <div className="course-details">
          <h2 className="course-titlee">{course.title}</h2>
          <p className="course-description">{course.description}</p>
          <p className="course-description">Responsável: {course.responsible}</p>
          <p className="course-description">Dias: {course.days}</p>
        </div>
      </div>

      {/* Seção do Mapa */}
      <div className="map-section">
        <iframe
          src={course.local}
          className="course-map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default AboutCourses;
