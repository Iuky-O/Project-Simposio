import React from "react";
import CollaboratorsStyle from "../Styles/CollaboratorsStyles.css";
import ufpaImage from '../Assets/realização/UFPA.png';
import uepa from "../Assets/realização/uepa.png";
import estacio from "../Assets/realização/estacio.png"
import lele from "../Assets/Patrocinadores/Lele.png";
import linux from "../Assets/Patrocinadores/Linuxtips.png";
import devsNorte from "../Assets/apoio/devsNorte.webp";
import ufra from "../Assets/realização/ufra.png";
import acaiDados from "../Assets/apoio/acai-com-dados.jfif";

const Collaborators = () =>{
    return (
        <div className="colaboradores">
            <div className="colaboradores-container">
                <h1 className="heading-colaboradores">
                    <span>Colaboradores</span>
                </h1>

                <div className="carts-container">
                    {/* Seção de colaboradores */}
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

                    {/* Seção de patrocinadores */}
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

                    {/* Seção de apoiadores */}
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

export default Collaborators;