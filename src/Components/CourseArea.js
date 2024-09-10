import { useState } from "react";
import "../Styles/CourseArea.css";
import img from "../Assets/iameg.png";

const CourseArea = () => {
    const [courses] = useState([
        {
            title: "Desenvolvimento Web",
            description: "Descrição",
            imgUrl: img,
        },
        {
            title: "Arquitetura de Rede",
            description: "Descrição",
            imgUrl: img,
        },
        {
            title: "Análise e Projeto de Software",
            description: "Descrição",
            imgUrl: img,
        },
        {
            title: "Montagem e Manutenção de Computadores",
            description: "Descrição",
            imgUrl: img,
        },
        {
            title: "Engenharia de Computação",
            description: "Descrição",
            imgUrl: img,
        },
        {
            title: "Engenharia de Software",
            description: "Descrição",
            imgUrl: img,
        },
    ]);

    return (
    <div className="courses-container">
        {courses.map((course) => (
        <div key={course.id} className="course-card">
            <img src={img} alt={""} className="course-image" />
            <div className="course-content">
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
            <button className="course-button">Saiba Mais</button>
            </div>
        </div>
        ))}
    </div>
    );
};   

export default CourseArea;