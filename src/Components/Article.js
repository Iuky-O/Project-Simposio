import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ArticleStyles.css";
import { SiCodenewbie } from "react-icons/si";
import { useAuth } from "../Scripts/AuthContext";
import { salvarArtigoNoFirestore } from "../functions/firebaseFileHandler";
import { Link } from 'react-router-dom';

const Article = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: "",
        autores: [],
        resumo: "",
        arquivo: null,
    });
    const [authorInput, setAuthorInput] = useState("");
    const [errorFields, setErrorFields] = useState({});
    const { user, loading } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "resumo" && value.length > 1000) return;
        setFormData({ ...formData, [name]: value });
        setErrorFields({ ...errorFields, [name]: false });
    };

    const handleAddAuthor = () => {
        if (authorInput.trim() && formData.autores.length < 10) {
            setFormData({
                ...formData,
                autores: [...formData.autores, authorInput],
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, arquivo: reader.result.split(",")[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const addArticle = async (e) => {
        e.preventDefault();

        if (loading) {
            alert("Carregando, aguarde...");
            return;
        }
        if (!user) {
            alert("Você precisa estar logado para submeter um artigo!");
            return;
        }

        try {
            await salvarArtigoNoFirestore({
                titulo: formData.titulo,
                autores: formData.autores,
                resumo: formData.resumo,
                arquivo: formData.arquivo,
                usuarioId: user.uid,
                usuarioEmail: user.email
            });

            alert("Artigo submetido com sucesso!");
        } catch (error) {
            alert("Erro ao submeter artigo: " + (error.message || error));
            console.error(error);
        }
    };

    return (
        <div className="article">
            <div className="container-article">
                <div className="sections-wrapper">
                    <div className="section-details">
                        <Link to="/" className="details-image">
                            <SiCodenewbie style={{ fontSize: '5rem', color: 'var(--Primary-Color)' }} />
                        </Link>
                        <h3>Regras de Submissão de Artigo</h3>
                        <div className="text-details">
                            <p>Caro autor, para garantir uma submissão válida, siga as regras abaixo:</p>
                            <ul>
                                <li>Cada artigo pode ter no máximo 10 autores.</li>
                                <li>O envio do arquivo completo do artigo em formato PDF é obrigatório.</li>
                                <li>O envio do arquivo completo do artigo não deve exceder 1MB.</li>
                                <li>Todos os campos do formulário devem ser preenchidos corretamente para que a submissão seja aceita.</li>
                            </ul>
                            <p>Certifique-se de revisar as informações antes de enviar. Obrigado por contribuir!</p>
                        </div>
                    </div>

                    <div className="section-content">
                        <form className="form-article" onSubmit={addArticle}>
                            <h1>Cadastro de Artigo</h1>

                            <div>
                                <label htmlFor="titulo">
                                    Título: <span className="required">*</span>
                                </label>
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
                                <label htmlFor="autores">
                                    Autores: <span className="required">*</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="authorInput"
                                        value={authorInput}
                                        onChange={handleAuthorInputChange}
                                        placeholder="Digite o nome dos autores e clique em adicionar."
                                    />
                                </div>
                                <button type="button" onClick={handleAddAuthor}>
                                    Adicionar Autor
                                </button>

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
                                <label htmlFor="resumo">
                                    Resumo: <span className="required">*</span>
                                </label>
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
                                        style={{height:'35vh', width: '50vw', }}
                                    />
                                    <small>{formData.resumo.length}/1000 caracteres</small>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="arquivo">
                                    Upload: <span className="required">*</span>
                                </label>
                                <div className="input-group-pdf">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        id="arquivo"
                                        name="arquivo"
                                        required
                                        className={errorFields.arquivo ? "error" : ""}
                                        onChange={handleFileUpload}
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
