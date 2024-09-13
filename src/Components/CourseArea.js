import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/CourseArea.css";
import { Options_Courses } from '../Data/CoursesData';


const CourseArea = () => {
 
  const navigate = useNavigate(); 

  const handleSpeakerClick = (index) => {
    navigate(`/aboutscourses/${index}`); 
  };

  return (
    <div className="courses-container">
      {Options_Courses.map((course, index) => (
        <div key={course.id} className="course-card">          
          <img src={course.imgUrl} alt={course.title} className="course-image" />
          <div className="course-content">
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
            <button className="course-button" onClick={() => handleSpeakerClick(index)}>Saiba Mais</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseArea;
