import React, { useState, useEffect } from "react";
import "../Styles/AboutStyles.css";
import Image1 from "../Assets/Fundo-Açai.jpeg";
import Image2 from "../Assets/Fundo-Guaraná.jpeg";
import Image3 from "../Assets/Tucano.jpg";

const About = () => {
  const [step, setStep] = useState(0);
  const sections = [
    {
      title: "Sobre o Evento",
      text: `O I Simpósio Regional de Engenharia de Software é um evento inovador
             voltado para a troca de conhecimentos e experiências entre
             profissionais da área acadêmica, estudantes, pesquisadores e pessoas
             do mercado tecnológico. O simpósio reúne professores, alunos e entusiastas
             para uma imersão em palestras e cursos.`,
      img: Image1,
    },
    {
      title: "Objetivos",
      text: `
        <li>Promover o intercâmbio de conhecimento entre acadêmicos, profissionais e entusiastas da área de Engenharia de Software.</li>
        <li>Debater as principais tendências e desafios tecnológicos, focando em inovações e boas práticas no desenvolvimento de software.</li>
        <li>Estimular a colaboração entre o setor acadêmico e o mercado, criando oportunidades para networking e parcerias.</li>
        <li>Aprimorar as habilidades técnicas dos participantes por meio de palestras e workshops práticos conduzidos por especialistas da área.</li>`,
      img: Image2,
    },
    {
      title: "Público-Alvo",
      text: `Área acadêmica com professores e alunos, pessoas do mercado e entusiastas de Engenharia de Software.`,
      img: Image3,
    },
  ];

  // Função para avançar manualmente
  const handleNextStep = () => {
    setStep((prevStep) => (prevStep + 1) % sections.length); // Volta ao início
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep - 1 + sections.length) % sections.length); // Volta para o passo anterior
  };
  
  // Avança automaticamente a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % sections.length);
    }, 10000); // Troca a cada 10 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div className="About">
      <div className="container-about">
        <div className="sections-container">
          <div className="section-image-about"
            style={{ backgroundImage: `url(${sections[step].img})` }}
          >
            <img src={sections[step].img} alt="" className="circular-image"/>
          </div>
          <div className="section-info-about">
            <div className="info-text">
              <h1>{sections[step].title}</h1>
              <div className="texto">
                <p dangerouslySetInnerHTML={{ __html: sections[step].text }}></p>
              </div>
              
            </div>
            {/* Indicador de Progresso */}
            <div className="progress-indicator">
              {sections.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${step === index ? 'active' : ''}`}
                ></span>
              ))}
            </div>
            <div className="Buttons-next">
                <button onClick={handlePreviousStep} className="btn-prosseguir">
                Voltar
                </button>

                <button onClick={handleNextStep} className="btn-prosseguir">
                Prosseguir
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
