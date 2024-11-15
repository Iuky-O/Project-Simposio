import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ArticleStyles.css";
import { db } from '../Firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Image from "../Assets/Open Peeps - Bust.png";

const Article = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: "",
        autores: [],
        resumo: "",
        arquivo: ""
    });
    const [authorInput, setAuthorInput] = useState("");
    const [errorFields, setErrorFields] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "resumo" && value.length > 500) {
            // Limite de caracteres para evitar exceder 10 linhas
            return;
        }

        setFormData({ ...formData, [name]: value });
        setErrorFields({ ...errorFields, [name]: false });
    };

    const handleAddAuthor = () => {
        if (authorInput.trim() && formData.autores.length < 10) {
            setFormData({
                ...formData,
                autores: [...formData.autores, authorInput]
            });
            setAuthorInput("");
        }
    };

    const handleAuthorInputChange = (e) => {
        setAuthorInput(e.target.value);
    };

    const handleRemoveAuthor = (index) => {
        const updatedAuthors = formData.autores.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            autores: updatedAuthors
        });
    };

    async function addArticle(e) {
        e.preventDefault();
        const userData = {
            titulo: formData.titulo,
            autores: formData.autores,
            resumo: formData.resumo,
            arquivo: formData.arquivo
        };

        try {
            await addDoc(collection(db, "articles"), userData);
            setFormData({
                titulo: "",
                autores: [],
                resumo: "",
                arquivo: ""
            });
            alert('Artigo submetido com sucesso!');
        } catch (error) {
            alert('Erro ao submeter artigo');
            console.error(error);
        }
    }

    return (
        <div className="article">
            <div className="background-overlay"></div>
            <div className="container-article">
                <div className="sections-wrapper">
                    <div className="section-details">
                        <div className="details-image">
                            <img src={Image} alt="" />
                        </div>
                    </div>
                    <div className="section-content">
                        <form className="form-article" onSubmit={addArticle}>
                            <h1>Cadastro de Artigo</h1>

                            <div>
                                <label htmlFor="titulo">Título:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        required
                                        className={errorFields.titulo ? "error" : ""}
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        placeholder="Adicione o Título do artigo"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="autores">Autores:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="authorInput"
                                        value={authorInput}
                                        onChange={handleAuthorInputChange}
                                        placeholder="Digite o nome dos autores. Limite de 10 autores."
                                    />
                                    <button type="button" onClick={handleAddAuthor}>
                                        Adicionar Autor
                                    </button>
                                </div>
                                {formData.autores.length === 10 && (
                                    <p style={{ color: 'red' }}>Limite de 10 autores atingido.</p>
                                )}
                                <ul>
                                    {formData.autores.map((author, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                            {author}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveAuthor(index)}
                                                style={{
                                                    marginLeft: '10px',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'red',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ✖
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <label htmlFor="resumo">Resumo:</label>
                                <div className="input-group">
                                    <textarea
                                        id="resumo"
                                        name="resumo"
                                        required
                                        className={errorFields.resumo ? "error" : ""}
                                        value={formData.resumo}
                                        onChange={handleChange}
                                        placeholder="Adicione o Resumo de no máximo 10 linhas"
                                        rows="10"
                                        style={{ resize: 'none' }}
                                    />
                                    <small>{formData.resumo.length}/500 caracteres</small>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="arquivo">Upload:</label>
                                <div className="input-group-pdf">
                                    <input
                                        type="file"
                                        accept="artigo/*"
                                        id="arquivo"
                                        name="arquivo"
                                        required
                                        className={errorFields.arquivo ? "error" : ""}
                                        onChange={(e) => setFormData({ ...formData, arquivo: e.target.files[0] })}
                                    />
                                </div>
                            </div>
                            
                            <button type="submit">
                                Submeter
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
