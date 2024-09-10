import { useState } from "react";
import "../Styles/CourseArea.css";
import img from "../Assets/iameg.png";

const CourseArea = () => {
    const [courses] = useState([
        {
            title: "Desenvolvimento de menores",
            description: "O crime compensa, quando o governo e a lei não fazem sentido.",
            imgUrl: img,
        },
        {
            title: "Arquitetura de biqueira",
            description: "O crime compensa, quando o governo e a lei não fazem sentido.",
            imgUrl: img,
        },
        {
            title: "Análise e projeto de furto",
            description: "O crime compensa, quando o governo e a lei não fazem sentido.",
            imgUrl: img,
        },
        {
            title: "Montagem e manutenção de granada",
            description: "O crime compensa, quando o governo e a lei não fazem sentido.",
            imgUrl: img,
        },
        {
            title: "Aula de tiro",
            description: "O crime compensa, quando o governo e a lei não fazem sentido.",
            imgUrl: img,
        },
        {
            title: "Engenharia de Favela",
            description: "O crime compensa, quando o governo e a lei não fazem sentido.",
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