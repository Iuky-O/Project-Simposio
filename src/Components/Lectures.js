import React, {useState} from "react";
import "../Styles/LecturesStyles.css";

const Lectures = () => {
  const [palestras] = useState([
    {
      id: 1,
      dia: "1º DIA",
      title: "Inteligência Artificial e Machine Learning no Desenvolvimento de Software",
      horario: "17:00 PM",
      data: "21/10/2024",
    },
    {
      id: 2,
      dia: "1º DIA",
      title: "DevOps: Cultura e Ferramentas",
      horario: "18:00 PM",
      data: "21/10/2024",
    },
    {
      id: 3,
      dia: "2º DIA",
      title: "Microservices e Arquitetura Orientada a Serviços",
      horario: "17:00 PM",
      data: "22/10/2024",
    },
    {
      id: 4,
      dia: "2º DIA",
      title: "Tendências em Desenvolvimento Mobile",
      horario: "18:00 PM",
      data: "22/10/2024",
    },
    {
      id: 5,
      dia: "3º DIA",
      title: "Automação de Testes de Software",
      horario: "17:00 PM",
      data: "23/10/2024",
    },
    {
      id: 6,
      dia: "3º DIA",
      title: "Cloud Computing: A Jornada para a Escalabilidade e Redução de Custos",
      horario: "18:00 PM",
      data: "23/10/2024",
    },
    {
      id: 7,
      dia: "4º DIA",
      title: "Programação Funcional vs. Programação Orientada a Objetos",
      horario: "17:00 PM",
      data: "24/10/2024",
    },
    {
      id: 8,
      dia: "4º DIA",
      title: "Segurança em Aplicações Web: Protegendo seus Sistemas Contra Ameaças Atuais",
      horario: "18:00 PM",
      data: "24/10/2024",
    },
    {
      id: 9,
      dia: "5º DIA",
      title: "Caminhos de Carreira na Engenharia de Software",
      horario: "17:00 PM",
      data: "25/10/2024",
    },
  ]);

  // Separar palestras por dia
  const palestrasPorDia = palestras.reduce((acc, palestra) => {
    acc[palestra.dia] = acc[palestra.dia] || [];
    acc[palestra.dia].push(palestra);
    return acc;
  }, {});

  return (
    <div className="lecture-container">
      {Object.keys(palestrasPorDia).map((dia) => (
        <div key={dia} className="dia-section">
          <h2 className="dia-title">{dia}</h2>
          {palestrasPorDia[dia].map((palestra) => (
            <div key={palestra.id} className="lecture-card">
              <div className="lecture-content">
                <h3 className="lecture-title">{palestra.title}</h3>
                <p className="lecture-description">
                  Horário: {palestra.horario} - Data: {palestra.data}
                </p>
                <button className="lecture-button">Saiba Mais</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Lectures;
