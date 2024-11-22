import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../Firebase/firebaseConfig';
import { collection, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

import "../Styles/SubmiteTimelineStyle.css";

const SubmitTimeline = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dia: "",
        dia_desc: "",
        data: "",
        atividades: []
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "dia" || name === "dia_desc" || name === "data") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            const newAtividades = [...formData.atividades];
            newAtividades[index][name] = value;
            setFormData((prevData) => ({
                ...prevData,
                atividades: newAtividades,
            }));
        }
    };

    const handleAddActivity = () => {
        setFormData((prevData) => ({
            ...prevData,
            atividades: [
                ...prevData.atividades,
                { tipo: "", local: "", horario: "", titulo: "" }
            ],
        }));
    };

    const handleRemoveActivity = (index) => {
        const atividade = formData.atividades[index];
        if (!atividade.tipo && !atividade.local && !atividade.horario && !atividade.titulo) {
            const newAtividades = formData.atividades.filter((_, i) => i !== index);
            setFormData((prevData) => ({
                ...prevData,
                atividades: newAtividades,
            }));
        } else {
            alert("Não é possível remover a atividade com campos preenchidos.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "cronograma", formData.dia);
            await setDoc(docRef, {
                dia_desc: formData.dia_desc,
                data: formData.data,
                atividades: arrayUnion(...formData.atividades)
            }, { merge: true });
            alert('Cronograma atualizado com sucesso!');
            
            setFormData({
                dia: "",
                dia_desc: "",
                data: "",
                atividades: []
            });

            navigate('/timeline');
        } catch (error) {
            alert('Erro ao atualizar o cronograma.');
            //console.error(error);
        }
    };

    return (
        <div className="container-form">
            <form className="form-timeline" onSubmit={handleSubmit}>
                <h1>Editar Cronograma</h1>

                <div>
                    <label htmlFor="dia" className="required">Dia:</label>
                    <div className="input">
                        <input
                            type="text"
                            id="dia"
                            name="dia"
                            required=""
                            value={formData.dia}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="dia_desc" className="required">Dia da semana:</label>
                    <div className="input">
                        <input
                            type="text"
                            id="dia_desc"
                            name="dia_desc"
                            required=""
                            value={formData.dia_desc}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="data" className="required">Data:</label>
                    <div className="input">
                        <input
                            type="date"
                            id="data"
                            name="data"
                            required=""
                            value={formData.data}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <h2>Programação do dia</h2>
                {formData.atividades.map((atividade, index) => (
                    <div key={index} className="activity-section">
                        <div>
                            <label htmlFor={`tipo-${index}`} className="required">Tipo: </label>
                            <div className="input">
                                <select
                                    id={`tipo-${index}`}
                                    name="tipo"
                                    required=""
                                    value={atividade.tipo}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    <option value="" className="required">Selecione</option>
                                    <option value="palestra">Palestra</option>
                                    <option value="curso">Curso</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor={`local-${index}`} className="required">Local:</label>
                            <div className="input">
                                <select
                                    id={`local-${index}`}
                                    name="local"
                                    required=""
                                    value={atividade.local}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    <option value="">Selecione</option>
                                    <option value="uepa">UEPA</option>
                                    <option value="ufpa">UFPA</option>
                                    <option value="estacio">Estacio</option>
                                    <option value="online">Online via Meet</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor={`titulo-${index}`} className="required">Título:</label>
                            <div className="input">
                                <input
                                    type="text"
                                    id={`titulo-${index}`}
                                    name="titulo"
                                    required=""
                                    value={atividade.titulo}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor={`horario-${index}`} className="required">Horário:</label>
                            <div className="input">
                                <input
                                    type="time"
                                    id={`horario-${index}`}
                                    name="horario"
                                    required=""
                                    value={atividade.horario}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveActivity(index)}
                            className="btn-remove-activity"
                        >
                            Remover Atividade
                        </button>
                        
                        <hr />
                    </div>
                ))}

                <button type="button" onClick={handleAddActivity} className="btn-add-activity">
                    Adicionar Atividade
                </button>
                <button type="submit" className="btn-submit">Salvar Cronograma</button>

            </form>
        </div>
    );
};

export default SubmitTimeline;
