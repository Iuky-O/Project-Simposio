import React from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/AboutCoursesStyles.css';
import { Options_Courses } from '../Data/CoursesData';
import { FcNext } from "react-icons/fc";

function AboutCourses() {

  const { id } = useParams(); // Pegar o id da URL
  const course =  Options_Courses[id]; // Encontrar o palestrante pelo id

  if (!course) {
    return <h2>Curso não encontrado</h2>;
  }

  return (
    <div class="about-speaker" id="about">
            <div class="about-img">
            <img src={course.imgUrl} alt={course.title} />
            </div>

            <div class="about-content">
                <h2 class="heading">{course.title}</h2>
                
                <p>{course.description}</p>

                <div className='participations'>
                  <h3 className='topic-part'>Dias no Evento:</h3>

                  <div className='card-info'>
                    <p>{course.days}</p> 
                    <iframe src={course.local} style={{width:"600", height:"450", border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                  </div> 
                </div>
     
            </div>
        </div>
  );
}

export default AboutCourses;
