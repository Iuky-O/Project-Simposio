import React, { useState } from "react";
import "../Styles/RegisterStyles.css";
import Image from "../Assets/Open Peeps - Bust.png";
import api from '../../src/service/api';

const Register = () => {
    // Estados para armazenar os valores dos campos
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [pais, setPais] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [vinculo, setVinculo] = useState("");
    const [escolaridade, setEscolaridade] = useState("");
    const [sexo, setSexo] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [password, setPassword] = useState("");

    const [step, setStep] = useState(1); // Estado para controlar o passo atual

    // Função para exibir dados preenchidos no console
    const logFieldValues = () => {
        console.log(`Passo ${step} atual:`);
        console.log(`Nome: ${nome}`);
        console.log(`Sobrenome: ${sobrenome}`);
        console.log(`Email: ${email}`);
        console.log(`Número: ${numero}`);
        console.log(`País: ${pais}`);
        console.log(`Estado: ${estado}`);
        console.log(`Cidade: ${cidade}`);
        console.log(`Tipo de Usuário: ${tipoUsuario}`);
        console.log(`Vínculo: ${vinculo}`);
        console.log(`Escolaridade: ${escolaridade}`);
        console.log(`Sexo: ${sexo}`);
        console.log(`Nome Social: ${nomeSocial || 'N/A'}`);
        console.log(`Senha: ${password}`);
        console.log("-----------------------");
    };

     // Função de validação
     const validateFields = () => {
        if (!nome || 
            !sobrenome || 
            !email || 
            !numero || 
            !pais || 
            !estado || 
            !cidade || 
            !tipoUsuario || 
            !vinculo || 
            !escolaridade || 
            !sexo || 
            !password) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return false;
        }
        return true;
    };

    // Função para criar usuário
    async function createUsers() {

        if (!validateFields()) {
            return;
        }

        logFieldValues();

        try {
        
            await api.post('/add-users', {
                Nome: nome,
                Sobrenome: sobrenome,
                Email: email,
                Numero: numero,
                Pais: pais,
                Cidade: cidade,
                Estado: estado,
                TipoUsuario: tipoUsuario,
                Vinculo: vinculo,
                Escolaridade: escolaridade,
                Sexo: sexo,
                NomeSocial: nomeSocial || '', // Nome social pode ser vazio
                Password: password,
            });
            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            alert('Erro ao realizar o cadastro.');
            console.error(error);
        }
    }

    // Função para passar para o próximo passo
    const handleNextStep = () => {
        logFieldValues(); // Log dos valores antes de mudar de passo
        setStep((prevStep) => Math.min(prevStep + 1, 4)); // Limita o passo máximo em 4
    };

    // Função para voltar ao passo anterior
    const handlePrevStep = () => {
        logFieldValues(); // Log dos valores antes de voltar de passo
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

                            {/* Formulário dividido em etapas */}
                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="nome">Nome:</label>
                                        <div className="input-group">
                                            <input type="text" id="nome" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="sobrenome">Sobrenome:</label>
                                        <div className="input-group">
                                            <input type="text" id="sobrenome" name="sobrenome" required value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <div className="input-group">
                                            <input type="text" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="numero">Número:</label>
                                        <div className="input-group">
                                            <input type="text" id="numero" name="numero" required value={numero} onChange={(e) => setNumero(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div>
                                        <label htmlFor="pais">País:</label>
                                        <div className="input-group">
                                            <input type="text" id="pais" name="pais" required value={pais} onChange={(e) => setPais(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="estado">Estado:</label>
                                        <div className="input-group">
                                            <input type="text" id="estado" name="estado" required value={estado} onChange={(e) => setEstado(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cidade">Cidade:</label>
                                        <div className="input-group">
                                            <input type="text" id="cidade" name="cidade" required value={cidade} onChange={(e) => setCidade(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div>
                                        <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
                                        <div className="input-group">
                                            <select id="tipoUsuario" name="tipoUsuario" required value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
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
                                            <input type="text" id="vinculo" name="vinculo" required value={vinculo} onChange={(e) => setVinculo(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="escolaridade">Nível de Escolaridade:</label>
                                        <div className="input-group">
                                            <input type="text" id="escolaridade" name="escolaridade" required value={escolaridade} onChange={(e) => setEscolaridade(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <>
                                    <div>
                                        <label htmlFor="sexo">Sexo:</label>
                                        <div className="input-group">
                                            <select id="sexo" name="sexo" required value={sexo} onChange={(e) => setSexo(e.target.value)}>
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
                                            <input type="text" id="nomeSocial" name="nomeSocial" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="senha">Senha:</label>
                                        <div className="input-group">
                                            <input type="password" id="senha" name="senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Botões de navegação */}
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
                                    <button type="button" onClick={createUsers}>
                                        Finalizar Cadastro
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
