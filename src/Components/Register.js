import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles/RegisterStyles.css";
import { db, auth } from '../Firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Image from "../Assets/Open Peeps - Bust.png";

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        numero: "",
        pais: "",
        estado: "",
        cidade: "",
        tipoUsuario: "",
        vinculo: "",
        escolaridade: "",
        sexo: "",
        nomeSocial: "",
        password: "",
    });
    
    const [errorFields, setErrorFields] = useState({
        nome: false,
        sobrenome: false,
        email: false,
        numero: false,
        pais: false,
        estado: false,
        cidade: false,
        tipoUsuario: false,
        vinculo: false,
        escolaridade: false,
        sexo: false,
        password: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorFields({ ...errorFields, [name]: false }); // Reset error when user types
    };

    const validateFields = () => {
        const requiredFields = {
            1: ["nome", "sobrenome", "email", "numero"],
            2: ["pais", "estado", "cidade"],
            3: ["tipoUsuario", "vinculo", "escolaridade"],
            4: ["sexo", "password"]
        };

        let isValid = true;
        const newErrorFields = { ...errorFields };

        for (let field of requiredFields[step]) {
            if (!formData[field]) {
                newErrorFields[field] = true; // Mark field as having an error
                isValid = false;
            }
        }

        setErrorFields(newErrorFields);
        return isValid;
    };

    function addLoginUser() {
        if (formData.email === '' || formData.password === '') {
            alert('Todos os campos devem ser preenchidos!');
        } else {
            addUserData();
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    }

    async function addUserData() {
        if (!validateFields()) {
            return;
        }

        const userData = {
            name: formData.nome,
            lastName: formData.sobrenome,
            email: formData.email,
            phoneNumber: formData.numero,
            address: {
                country: formData.pais,
                city: formData.cidade,
                state: formData.estado,
            },
            role: formData.tipoUsuario,
            institution: formData.vinculo,
            educationLevel: formData.escolaridade,
            gender: formData.sexo,
            socialName: formData.nomeSocial,
            password: formData.password,
        };

        try {
            await addDoc(collection(db, "users"), userData);
            setFormData({
                nome: "",
                sobrenome: "",
                email: "",
                numero: "",
                pais: "",
                estado: "",
                cidade: "",
                tipoUsuario: "",
                vinculo: "",
                escolaridade: "",
                sexo: "",
                nomeSocial: "",
                password: "",
            });

            alert('Cadastro realizado com sucesso!');
            navigate('/login'); 
        } catch (error) {
            alert('Erro ao realizar o cadastro. Verifique o console para mais detalhes.');
            console.error(error);
        }
    }

    const handleNextStep = () => {
        if (validateFields()) {
            // Resetar as bordas de erro ao passar para a próxima etapa
            const resetErrorFields = Object.keys(errorFields).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
    
            setErrorFields(resetErrorFields);
            setStep((prevStep) => Math.min(prevStep + 1, 4)); // Limita o passo máximo em 4
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    };
    
    const handlePrevStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1)); // Limita o passo mínimo em 1
    };

    return (
        <div className="register">
            <div className="background-rotated"></div>
            <div className="container-register">
                <div className="sections-container">
                    <div className="section-info">
                        <div className="info-parts-res">
                            <img src={Image} alt="" />
                        </div>
                    </div>
                    <div className="section-form">
                        <form className="form-cadastro">
                            <h1>Cadastro</h1>
                            <p>Faça seu cadastro para participar do evento!</p>

                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="nome">Nome:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="nome"
                                                name="nome"
                                                required
                                                className={errorFields.nome ? "error" : ""}
                                                value={formData.nome}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="sobrenome">Sobrenome:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="sobrenome"
                                                name="sobrenome"
                                                required
                                                className={errorFields.sobrenome ? "error" : ""}
                                                value={formData.sobrenome}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                required
                                                className={errorFields.email ? "error" : ""}
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="numero">Número:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="numero"
                                                name="numero"
                                                required
                                                className={errorFields.numero ? "error" : ""}
                                                value={formData.numero}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div>
                                        <label htmlFor="pais">País:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="pais"
                                                name="pais"
                                                required
                                                className={errorFields.pais ? "error" : ""}
                                                value={formData.pais}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="estado">Estado:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="estado"
                                                name="estado"
                                                required
                                                className={errorFields.estado ? "error" : ""}
                                                value={formData.estado}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cidade">Cidade:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="cidade"
                                                name="cidade"
                                                required
                                                className={errorFields.cidade ? "error" : ""}
                                                value={formData.cidade}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div>
                                        <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
                                        <div className="input-group">
                                            <select
                                                id="tipoUsuario"
                                                name="tipoUsuario"
                                                required
                                                className={errorFields.tipoUsuario ? "error" : ""}
                                                value={formData.tipoUsuario}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione</option>
                                                <option value="aluno">Aluno</option>
                                                <option value="professor">Professor</option>
                                                <option value="profissional">Profissional</option>
                                                <option value="empresa">Empresa</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="vinculo">Vínculo:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="vinculo"
                                                name="vinculo"
                                                required
                                                className={errorFields.vinculo ? "error" : ""}
                                                value={formData.vinculo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="escolaridade">Escolaridade:</label>
                                        <div className="input-group">
                                            <select
                                                id="escolaridade"
                                                name="escolaridade"
                                                required
                                                className={errorFields.escolaridade ? "error" : ""}
                                                value={formData.escolaridade}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione</option>
                                                <option value="fundamental">Fundamental</option>
                                                <option value="medio">Médio</option>
                                                <option value="superior">Superior</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <>
                                    <div>
                                        <label htmlFor="sexo">Sexo:</label>
                                        <div className="input-group">
                                            <select
                                                id="sexo"
                                                name="sexo"
                                                required
                                                className={errorFields.sexo ? "error" : ""} // Aqui você está verificando o erro
                                                value={formData.sexo}
                                                onChange={handleChange}
                                            >
                                                <option value="">Selecione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="feminino">Feminino</option>
                                                <option value="outro">Outro</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="nomeSocial">Nome Social:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="nomeSocial"
                                                name="nomeSocial"
                                                value={formData.nomeSocial}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password">Senha:</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                                className={errorFields.password ? "error" : ""} // Aqui você está verificando o erro
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}


                            <div className="navigation-buttons">
                                {step > 1 && (
                                    <button type="button" onClick={handlePrevStep}>
                                        Voltar
                                    </button>
                                )}
                                {step < 4 ? (
                                    <button type="button" onClick={handleNextStep}>
                                        Próximo
                                    </button>
                                ) : (
                                    <button type="submit" onClick={addLoginUser}>
                                        Cadastrar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;



    /*
    const validateFields = () => {
        const requiredFields = [
            "nome", "sobrenome", "email", "numero",
            "pais", "estado", "cidade", "tipoUsuario",
            "vinculo", "escolaridade", "sexo", "password"
        ];
        for (let field of requiredFields) {
            if (!formData[field]) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return false;
            }
        }
        return true;
    };

    async function createUsers() {
        if (!validateFields()) {
            return;
        }

        const apiData = {
            name: formData.nome,
            lastName: formData.sobrenome,
            email: formData.email,
            phoneNumber: formData.numero,
            address: {
                country: formData.pais,
                city: formData.cidade,
                state: formData.estado,
            },
            role: formData.tipoUsuario,
            institution: formData.vinculo,
            educationLevel: formData.escolaridade,
            gender: formData.sexo,
            socialName: formData.nomeSocial,
            password: formData.password,
        };

        try {
            const response = await fetch('http://127.0.0.1:5001/simposio/us-central1/api/add-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erro na resposta:", errorText);
                throw new Error(`Erro: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            setFormData({
                nome: "",
                sobrenome: "",
                email: "",
                numero: "",
                pais: "",
                estado: "",
                cidade: "",
                tipoUsuario: "",
                vinculo: "",
                escolaridade: "",
                sexo: "",
                nomeSocial: "",
                password: "",
            });

            alert('Cadastro realizado com sucesso!');
            navigate('/login'); // Redireciona para a tela de login
        } catch (error) {
            alert('Erro ao realizar o cadastro. Verifique o console para mais detalhes.');
            console.error(error);
        }
    }

    */
