import React from "react";
import AboutStyle from "../Styles/AboutStyles.css";

const About = () => {
    return (
        <div className="about">
            <div className="about-container">
                <h1 className="heading-about">
                    I Simpósio Regional de <span>Engenharia de Software</span>
                </h1>

                <div className="carts-container">
                    {/* Tópico e descrição do evento */}
                    <div className="about-section">
                        <h2>O Evento</h2>
                        <p>
                            O I Simpósio Regional de Engenharia de Software é um evento inovador voltado para a troca de conhecimentos 
                            e experiências entre profissionais da área acadêmica, estudantes, pesquisadores, e pessoas do mercado tecnológico. 
                            Com o objetivo de promover discussões sobre as tendências atuais, desafios e inovações na Engenharia de Software, 
                            o simpósio reúne professores, alunos e entusiastas para uma imersão em palestras e cursos.
                        </p>
                    </div>

                    {/* Tópico e descrição dos objetivos */}
                    <div className="about-section">
                        <h2>Objetivos</h2>
                        <ul>
                            <li>Promover o intercâmbio de conhecimento entre acadêmicos, profissionais e entusiastas da área de Engenharia de Software.</li>
                            <li>Debater as principais tendências e desafios tecnológicos, focando em inovações e boas práticas no desenvolvimento de software.</li>
                            <li>Estimular a colaboração entre o setor acadêmico e o mercado, criando oportunidades para networking e parcerias.</li>
                            <li>Aprimorar as habilidades técnicas dos participantes por meio de palestras e workshops práticos conduzidos por especialistas da área.</li>
                        </ul>
                    </div>

                    {/* Tópico e descrição do público-alvo */}
                    <div className="about-section">
                        <h2>Público-Alvo</h2>
                        <p>
                            Área acadêmica com professores e alunos, pessoas do mercado e entusiastas de Engenharia de Software.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
