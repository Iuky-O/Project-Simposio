import React, { useState, useEffect } from 'react';
import '../Styles/TimelineArea.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { db } from '../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const TimelineArea = () => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const [programa, setPrograma] = useState([]);
  const [activeDay, setActiveDay] = useState(0);

  const fetchCronograma = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cronograma'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordenar os documentos pelo ID (se necessário)
      data.sort((a, b) => a.id.localeCompare(b.id));
      setPrograma(data);
    } catch (error) {
      console.error('Erro ao buscar cronograma:', error);
    }
  };

  useEffect(() => {
    fetchCronograma();
  }, []);

  const handleDayClick = (index) => {
    setActiveDay(index);
  };

  const handleNextDay = () => {
    setActiveDay((prev) => (prev + 1) % programa.length);
  };

  const handlePrevDay = () => {
    setActiveDay((prev) => (prev - 1 + programa.length) % programa.length);
  };

  if (programa.length === 0) {
    return <div className="timeline-area">Carregando...</div>;
  }

  return (
    <div className="timeline-area">
      <div className="title">
        <h1>Programação</h1>
      </div>
      <div className="timeline">
        <button className="arrow" onClick={handlePrevDay}>
          <FaArrowLeft />
        </button>
        {programa.map((item, index) => (
          <div
            key={index}
            className={`day ${activeDay === index ? "active" : ""}`}
            onClick={() => handleDayClick(index)}
          >
            {`Dia ${item.id}`}
          </div>
        ))}
        <button className="arrow" onClick={handleNextDay}>
          <FaArrowRight />
        </button>
      </div>
      <div className="details">
        <div className="container-dia">
          <h2>DIA {programa[activeDay].id}</h2>
          <h2>{programa[activeDay].dia_desc || "Descrição do Dia"}</h2>
          <h2>({formatDate(programa[activeDay].data)})</h2>
        </div>
  
        {programa[activeDay].atividades.map((atividade, index) => (
          <div key={index} className="container_info_pc">
            <p className={`text-${atividade.tipo}`}>{atividade.tipo}</p>
            <p className="text-infoo">{atividade.horario}</p>
            <p className="text-principal">{atividade.titulo}</p>
            <p className="text-infoo">({atividade.local})</p>
          </div>
        ))}
      </div>
    </div>
  );  
};  

export default TimelineArea;
