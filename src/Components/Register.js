import React, { useState, useRef } from "react";
import "../Styles/RegisterStyles.css";
import Image from "../Assets/Open Peeps - Bust.png";
import api from '../../src/service/api';

const Register = () => {

    const inputNome = useRef(null);
    const inputSobrenome = useRef(null);
    const inputEmail = useRef(null);
    const inputNumero = useRef(null);
    const inputPais = useRef(null);
    const inputEstado = useRef(null);
    const inputCidade = useRef(null);
    const inputTipoUsuario = useRef(null);
    const inputVinculo = useRef(null);
    const inputEscolaridade = useRef(null);
    const inputSexo = useRef(null);
    const inputNomeSocial = useRef(null); // Esse campo é opcional
    const inputPassword = useRef(null);

    // Função de validação
    const validateFields = () => {
        if (
            !inputNome.current?.value || 
            !inputSobrenome.current?.value || 
            !inputEmail.current?.value || 
            !inputNumero.current?.value || 
            !inputPais.current?.value || 
            !inputEstado.current?.value || 
            !inputCidade.current?.value || 
            !inputTipoUsuario.current?.value || 
            !inputVinculo.current?.value || 
            !inputEscolaridade.current?.value || 
            !inputSexo.current?.value || 
            !inputPassword.current?.value
        ) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return false;
        }
        return true;
    };

    async function createUsers() {
        // Validação de campos antes de enviar para a API
        if (!validateFields()) {
            return;
        }

        // Dados estão validados, podemos enviar para a API
        try {
            await api.post('/add-users', {
                nome: inputNome.current?.value,
                Sobrenome: inputSobrenome.current?.value,
                email: inputEmail.current?.value,
                numero: inputNumero.current?.value,
                pais: inputPais.current?.value,
                cidade: inputCidade.current?.value,
                estado: inputEstado.current?.value,
                tipoUsuario: inputTipoUsuario.current?.value,
                vinculo: inputVinculo.current?.value,
                escolaridade: inputEscolaridade.current?.value,
                sexo: inputSexo.current?.value,
                nomeSocial: inputNomeSocial.current?.value || '', // Nome social pode ser vazio
                password: inputPassword.current?.value,
            });
            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            alert('Erro ao realizar o cadastro.');
            console.error(error);
        }
    }

    const [step, setStep] = useState(1); // Estado para controlar o passo atual

    const handleNextStep = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 4)); // Limita o passo máximo em 4
    };

    const handlePrevStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1)); // Limita o passo mínimo em 1
    };

    return (
        <div className="register">
            <div className="background-rotated">
            </div>
            <div className="container-register">
                <div className="sections-container">
                    <div className="section-info">
                        <div className="info-parts-res">
                            <img src={Image} alt="" />
                            <p>descrição</p>
                        </div>
                    </div>
                    <div className="section-form">
                        <form className="form-cadastro" >
                            <h1>Cadastro</h1>
                            <p>Faça seu cadastro para participar do evento!</p>

                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="nome">Nome:</label>
                                        <div className="input-group">
                                            <input type="text" id="nome" name="nome" required ref={inputNome} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="sobrenome">Sobrenome:</label>
                                        <div className="input-group">
                                            <input type="text" id="sobrenome" name="sobrenome" required ref={inputSobrenome} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <div className="input-group">
                                            <input type="text" id="email" name="email" required ref={inputEmail} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="numero">Número:</label>
                                        <div className="input-group">
                                            <input type="text" id="numero" name="numero" required ref={inputNumero} />
                                        </div>
                                    </div>

                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div>
                                        <label htmlFor="pais">País:</label>
                                        <div className="input-group">
                                            <input type="text" id="pais" name="pais" required ref={inputPais} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="estado">Estado:</label>
                                        <div className="input-group">
                                            <input type="text" id="estado" name="estado" required ref={inputEstado} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cidade">Cidade:</label>
                                        <div className="input-group">
                                            <input type="text" id="cidade" name="cidade" required ref={inputCidade} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div>
                                        <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
                                        <div className="input-group">
                                            <select id="tipoUsuario" name="tipoUsuario" required ref={inputTipoUsuario}>
                                                <option value="">Selecione</option>
                                                <option value="aluno">Aluno</option>
                                                <option value="professor">Professor</option>
                                                <option value="profissional">Profissional</option>
                                                <option value="empresa">Empresa</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="vinculo">Vínculo (Instituição ou Empresa):</label>
                                        <div className="input-group">
                                            <input type="text" id="vinculo" name="vinculo" required ref={inputVinculo} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="escolaridade">Nível de Escolaridade:</label>
                                        <div className="input-group">
                                            <input type="text" id="escolaridade" name="escolaridade" required ref={inputEscolaridade} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <>
                                    <div>
                                        <label htmlFor="sexo">Sexo:</label>
                                        <div className="input-group">
                                            <select id="sexo" name="sexo" required ref={inputSexo}>
                                                <option value="">Selecione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="feminino">Feminino</option>
                                                <option value="outro">Outro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="nomeSocial">Nome Social (Opcional):</label>
                                        <div className="input-group">
                                            <input type="text" id="nomeSocial" name="nomeSocial" ref={inputNomeSocial} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="senha">Senha:</label>
                                        <div className="input-group">
                                            <input type="password" id="senha" name="senha" required ref={inputPassword} />
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
                                    <button type="button" className="btn-cadastro" onClick={createUsers}>
                                        Cadastrar-se
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Indicador de Progresso */}
                        <div className="progress-indicator">
                            {[1, 2, 3, 4].map((num) => (
                                <span
                                    key={num}
                                    className={`dot ${step === num ? 'active' : ''}`}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
