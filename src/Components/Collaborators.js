/*import React, { useState, useEffect } from "react";
import "../Styles/CollaboratorsStyles.css";
import ufpaImage from '../Assets/realização/UFPA.png';
import uepa from "../Assets/realização/uepa.png";
import estacio from "../Assets/realização/estacio.png"
import lele from "../Assets/Patrocinadores/Lele.png";
import linux from "../Assets/Patrocinadores/Linuxtips.png";
import devsNorte from "../Assets/apoio/devsNorte.webp";
import ufra from "../Assets/realização/ufra.png";
import acaiDados from "../Assets/apoio/acai-com-dados.jfif";
import { EscalatorTwoTone } from "@mui/icons-material";

const Collaborators = () =>{
    const [step, setStep] = useState(0);

    const sections = [
        {
          title: "Realização",
          img1: ufpaImage,
          img2: ufra,
          img3: uepa,
          img4: estacio,
        },
        {
          title: "Patrocinadores",
          img1: lele,
          img2: linux,
        },
        {
          title: "Apoio-Alvo",
          img1: devsNorte,
          img2: acaiDados,
        },
      ];

    // Função para avançar manualmente
  const handleNextStep = () => {
    setStep((prevStep) => (prevStep + 1) % sections.length);
  };

  // Avança automaticamente a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % sections.length);
    }, 10000); 
    return () => clearInterval(interval); 
  }, []);



    return (
        <div className="colaboradores">
            <div className="colaboradores-container">
                <h1 className="heading-colaboradores">
                    <span>Colaboradores</span>
                </h1>

                <div className="carts-container">
                    <div className="colaboradores-section">
                        <h2>Realização</h2>
                        <ul>
                                <li>
                                    <img src= {ufpaImage} alt="UFPA" className="colaborador-img" />
                                    <img src= {ufra} alt="UFRA" className="colaborador-img" />         
                                </li>
                                <li>
                                    <img src= {uepa} alt="UEPA" className="colaborador-img"/>
                                    <img src= {estacio} alt="Estácio" className="colaborador-img" />
                                </li>

                        </ul>
                    </div>

                    <div className="colaboradores-section">
                        <h2>Patrocinadores</h2>
                        <ul>
                            <li>
                                <img src= {lele} alt="Lele" id="leticia" className="colaborador-img" />
                            </li>
                            <li>
                                <img src= {linux} alt="Linuxtips" className="colaborador-img" />
                            </li>
                        </ul>
                    </div>

                    <div className="colaboradores-section">
                        <h2>Apoio</h2>
                        <ul>
                            
                                <img src={devsNorte} alt="Devs Norte" className="colaborador-img"/>
                                <img src={acaiDados} alt="Açaí com Dados" className="colaborador-img"/>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Collaborators;*/

import React, { useState, useEffect } from "react";
import "../Styles/CollaboratorsStyles.css";
import ufpaImage from "../Assets/realização/UFPA.png";
import uepa from "../Assets/realização/uepa.png";
import estacio from "../Assets/realização/estacio.png";
import lele from "../Assets/Patrocinadores/Lele.png";
import linux from "../Assets/Patrocinadores/Linuxtips.png";
import devsNorte from "../Assets/apoio/devsNorte.webp";
import ufra from "../Assets/realização/ufra.png";
import acaiDados from "../Assets/apoio/acai-com-dados.jfif";

import image from "../Assets/Fundo2-Açai.jpg";

const Collaborators = () => {
  const [step, setStep] = useState(0);

  const sections = [
    {
      title: "Realização",
      images: [uepa, estacio],
      images2: [ufpaImage, ufra]
    },
    {
      title: "Patrocinadores",
      images: [lele, linux],
    },
    {
      title: "Apoio",
      images: [devsNorte, acaiDados],
    },
  ];

  // Função para avançar manualmente
  const handleNextStep = () => {
    setStep((prevStep) => (prevStep + 1) % sections.length);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep - 1 + sections.length) % sections.length); // Volta para o passo anterior
  };

  // Avança automaticamente a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % sections.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="colaboradores">
      <div className="colaboradores-container">
        {/* Informações do lado esquerdo */}
        <div className="info-container">
          <h1 className="heading-colaboradores">
            <span>Colaboradores</span>
          </h1>
          <div className="colaboradores-section">
            <h2>{sections[step].title}</h2>
            <div className="imagens-group">
                <div className="colaboradores-images">
                {/* Primeira linha de imagens */}
                {sections[step].images.map((img, index) => (
                    <div key={`row1-${index}`} className="colaborador-img-container">
                    <img
                        src={img}
                        alt={sections[step].title}
                        className="colaborador-img"
                    />
                    </div>
                ))}

                {/* Segunda linha de imagens, se existir */}
                {sections[step].images2 && 
                    sections[step].images2.map((img, index) => (
                    <div key={`row2-${index}`} className="colaborador-img-container">
                    <img
                        src={img}
                        alt={sections[step].title}
                        className="colaborador-img"
                    />
                    </div>
                ))}
                </div>
            </div>
            

            {/* Indicador de progresso */}
            <div className="progress-indicator">
              {sections.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${step === index ? "active" : ""}`}
                ></span>
              ))}
            </div>

            <div className="Buttons-next-previous">
                <button onClick={handlePreviousStep} className="btn-next">
                Voltar
                </button>

                <button onClick={handleNextStep} className="btn-next">
                Próximo
                </button>
            </div>
          </div>
        </div>

        {/* Imagem ocupando toda a altura no lado direito */}
        <div className="image-container">
          <img src={image} alt="Background" className="background-img" />
        </div>
      </div>
    </div>
  );
};

export default Collaborators;

