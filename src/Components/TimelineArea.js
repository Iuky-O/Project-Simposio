import React from 'react';
import Carousel from '../Utils/Carrousel';
import '../Styles/TimelineArea.css';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const slides = [
  <div>
    <p className='text-date'>21/10/2024</p>
    <h2> DIA 1</h2>
    <p className='text-palestra'>Palestra 1</p>
    <p className='text-info'> Inteligência Artificial e Machine Learning no Desenvolvimento de Software 17:00 PM</p>
    <p className='text-curso'>Curso 1 </p>
    <p className='text-info'>DevOps: Cultura e Ferramentas:  18:00 PM</p>
    </div>,
  <div>
    <p className='text-date'>21/10/2024</p>
    <h2> DIA 2</h2>
    <p className='text-palestra'>Palestra 1</p>
    <p className='text-info'>Microservices e Arquitetura Orientada a Serviços 17:00 PM</p>
    <p className='text-curso'>Curso 1 </p>
    <p className='text-info'>Tendências em Desenvolvimento Mobile 18:00 PM</p>
    </div>,
  <div>
    <p className='text-date'>21/10/2024</p>
    <h2> DIA 3</h2>
    <p className='text-palestra'>Palestra 1</p>
    <p className='text-info'>Automação de Testes de Software 17:00 PM</p>
    <p className='text-curso'>Curso 1 </p>
    <p className='text-info'> nao sei nao sei 18:00 PM</p>
    </div>,
  <div>
    <p className='text-date'>21/10/2024</p>
    <h2> DIA 4</h2>
    <p className='text-palestra'>Palestra 1</p>
    <p className='text-info'>Programação Funcional vs. Programação Orientada a Objetos 17:00 PM</p>
    <p className='text-curso'>Curso 1 </p>
    <p className='text-info'>nao sei nao sei 18:00 PM</p>
    </div>,
  <div>
    <p className='text-date'>21/10/2024</p>
    <h2> DIA 5</h2>
    <p className='text-palestra'>Palestra 1</p>
    <p className='text-info'> Caminhos de Carreira na Engenharia de Software 17:00 PM</p>
    <p className='text-curso'>Curso 1 </p>
    <p className='text-info'> nao sei nao sei 18:00 PM</p>
    </div>,
];
const TimelineArea = () => {
  return (
    <div className="timeline-area">
      <h2>Programação</h2>
      <Carousel slidesToScroll={2} slidesVisible={3}>
        {slides}
      </Carousel>
    </div>
    
  );
};

export default TimelineArea;
