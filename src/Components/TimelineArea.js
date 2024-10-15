import React, { useState } from 'react';
import '../Styles/TimelineArea.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const programa = [
  {
    dia: 'DIA 1',
    dia_desc: 'Segunda-feira',
    data: '21/10/2024',
    palestra_1_horario: '17:00 PM',
    palestra_1_local: 'UEPA',
    palestra_1: 'Inteligência Artificial e Machine Learning no Desenvolvimento de Software',
    palestra_2_horario: '18:00 PM',
    palestra_2_local: 'UEPA',
    palestra_2: 'DevOps: Cultura e Ferramentas',
    curso_horario: '18:00 PM',
    curso_local: 'Online via Meet',
    curso: 'Introdução a robótica',
  },
  {
    dia: 'DIA 2',
    dia_desc: 'Terça-feira',
    data: '22/10/2024',
    palestra_1_horario: '17:00 PM',
    palestra_1_local: 'UEPA',
    palestra_1: 'Microservices e Arquitetura Orientada a Serviços',
    palestra_2_horario: '18:00 PM',
    palestra_2_local: 'UEPA',
    palestra_2: 'Tendências em Desenvolvimento Mobile',
    curso_horario: '',
    curso_local: '',
    curso: '',
  },
  {
    dia: 'DIA 3',
    dia_desc: 'Quarta-feira',
    data: '23/10/2024',
    palestra_1_horario: '17:00 PM',
    palestra_1_local: 'UEPA',
    palestra_1: 'Automação de Testes de Software',
    palestra_2_horario: '18:00 PM',
    palestra_2_local: 'UEPA',
    palestra_2: 'Cloud Computing: A Jornada para a Escalabilidade e Redução de Custos',
    curso_horario: '18:00 PM',
    curso_local: 'Online via Meet',
    curso: 'Testes Automatizados com Python',
  },
  {
    dia: 'DIA 4',
    dia_desc: 'Quinta-feira',
    data: '24/10/2024',
    palestra_1_horario: '17:00 PM',
    palestra_1_local: 'UEPA',
    palestra_1: 'Programação Funcional vs. Programação Orientada a Objetos',
    palestra_2_horario: '18:00 PM',
    palestra_2_local: 'UEPA',
    palestra_2: 'Segurança em Aplicações Web: Protegendo seus Sistemas Contra Ameaças Atuais',
    curso_horario: '18:00 PM',
    curso_local: 'Online via Meet',
    curso: 'Segurança em Aplicações Web na Prática',
  },
  {
    dia: 'DIA 5',
    dia_desc: 'Sexta-feira',
    data: '25/10/2024',
    palestra_1_horario: '17:00 PM',
    palestra_1_local: 'UEPA',
    palestra_1: 'Caminhos de Carreira na Engenharia de Software',
    palestra_2_horario: '',
    palestra_2_local: '',
    palestra_2: '',
    curso_horario: '18:00 PM',
    curso_local: 'Online via Meet',
    curso: 'Preparação para Entrevistas Técnicas',
  }
];

const TimelineArea = () => {
  const [activeDay, setActiveDay] = useState(0);

  const handleDayClick = (index) => {
    setActiveDay(index);
  };

  const handleNextDay = () => {
    setActiveDay((prev) => (prev + 1) % programa.length);
  };

  const handlePrevDay = () => {
    setActiveDay((prev) => (prev - 1 + programa.length) % programa.length);
  };

  return (
    <div className="timeline-area">
      <div className='title'>
        <h1>Programação</h1>
      </div>
      <div className="timeline">
        <button className="arrow" onClick={handlePrevDay}>
          <FaArrowLeft />
        </button>
        {programa.map((item, index) => (
          <div
            key={index}
            className={`day ${activeDay === index ? 'active' : ''}`}
            onClick={() => handleDayClick(index)}
          >
            {item.dia}
          </div>
        ))}
        <button className="arrow" onClick={handleNextDay}>
          <FaArrowRight />
        </button>
      </div>
      <div className="details">
        <div className='container-dia'>
          <h2>{programa[activeDay].dia}</h2>
          <h2>{programa[activeDay].dia_desc}</h2>
          <h2>({programa[activeDay].data})</h2>
        </div>
        
        <div className='container_info_pc'>
          <p className='text-palestra'>Palestra</p>
          <p className='text-infoo'>{programa[activeDay].palestra_1_horario}</p>
          <p className='text-principal'>{programa[activeDay].palestra_1}</p>
          <p className='text-infoo'>({programa[activeDay].palestra_1_local})</p>
        </div>
        {programa[activeDay].palestra_2 && (
          <div className='container_info_pc'>
            <p className='text-palestra'>Palestra</p>
            <p className='text-infoo'>{programa[activeDay].palestra_2_horario}</p>
            <p className='text-principal'>{programa[activeDay].palestra_2}</p>
            <p className='text-infoo'>({programa[activeDay].palestra_2_local})</p>
          </div>
        )}
        {programa[activeDay].curso && (
          <div className='container_info_pc'>
            <p className='text-curso'>Curso</p>
            <p className='text-infoo'>{programa[activeDay].curso_horario}</p>
            <p className='text-principal'>{programa[activeDay].curso}</p>
            <p className='text-infoo'>({programa[activeDay].curso_local})</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineArea;
