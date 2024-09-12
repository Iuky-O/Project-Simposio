import { useState } from "react";
import "../Styles/CourseArea.css";
import img from "../Assets/computador1.png";
import img2 from "../Assets/computador2.png";
import img3 from "../Assets/computador3.png";
import img4 from "../Assets/computador4.png";
import img5 from "../Assets/computador5.png";
import img6 from "../Assets/computador6.png";
import img7 from "../Assets/computador7.png";
import img8 from "../Assets/computador8.png";
import img9 from "../Assets/computador9.png";
import img10 from "../Assets/computador10.png";


const CourseArea = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "Desenvolvimento Web",
      description: "Descrição",
      imgUrl: img,
    },
    {
      id: 2,
      title: "Arquitetura de Rede",
      description: "Descrição",
      imgUrl: img2,
    },
    {
      id: 3,
      title: "Análise e Projeto de Software",
      description: "Descrição",
      imgUrl: img3,
    },
    {
      id: 4,
      title: "Manutenção de Computadores",
      description: "Descrição",
      imgUrl: img4,
    },
    {
      id: 5,
      title: "Engenharia de Computação",
      description: "Descrição",
      imgUrl: img5,
    },
    {
      id: 6,
      title: "Engenharia de Software",
      description: "Descrição",
      imgUrl: img6,
    },
    {
      id: 7,
      title: "Engenharia de Requisitos",
      description: "Descrição",
      imgUrl: img7,
    },
    {
      id: 8,
      title: "Análise de Sistemas",
      description: "Descrição",
      imgUrl: img8,
    },
    {
      id: 9,
      title: "Estrutura de Dados",
      description: "Descrição",
      imgUrl: img9,
    },
    {
      id: 10,
      title: "Gestão de Projetos",
      description: "Descrição",
      imgUrl: img10,
    },
  ]);

  return (
    <div className="courses-container">
      {courses.map((course) => (
        <div key={course.id} className="course-card">          
          <img src={course.imgUrl} alt={course.title} className="course-image" />
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
