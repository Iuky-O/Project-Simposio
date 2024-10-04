import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import Image from "../../Assets/Alexa.png";
import "../../Styles/UserPage.css";
import { db } from '../../Firebase/firebaseConfig'; 
import { doc, getDoc, updateDoc } from "firebase/firestore";  

function Profile() {
  const [socialName, setSocialName] = useState('');
  const [gender, setGenero] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setTipo] = useState('');
  const [institution, setInstitution] = useState('');
  const [educationLevel, setLevel] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const userId = 'gZXQi4oM3nGa8D0xdp54';// Defina manualmente o ID do usuário que você deseja carregar
  useEffect(() => {
     

    // Função para buscar o perfil do Firestore
    const getUserProfile = async () => {
      try {
        const userDoc = doc(db, 'users', userId); // Definir o documento com base no userId
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setFirstName(userData.name);
          setGenero(userData.gender);
          setSocialName(userData.socialName);
          setLastName(userData.lastName);
          setCountry(userData.address.country);
          setState(userData.address.state);
          setCity(userData.address.city);
          setEmail(userData.email);
          setTipo(userData.role);
          setInstitution(userData.institution);
          setLevel(userData.educationLevel);
          setPhone(userData.phoneNumber);
          setPassword(userData.password);
        } else {
          setMessage('Usuário não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    getUserProfile();
  }, []);

  const handleSaveChanges = async () => {
 
    if (!userId) {
      setMessage('ID do usuário não encontrado.');
      return;
    }
    const userDocRef = doc(db, "users", userId);
  
    const userData = {
      socialName,
      name: firstName,
      lastName,
      address: {
        country,
        city,
        state,
      },
      email,
      role,
      gender,
      institution,
      educationLevel,
      phoneNumber: phone,
      password,
    };
  
    try {
      // Atualiza o documento no Firestore
      await updateDoc(userDocRef, userData);
      setMessage('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar o perfil: ", error);
      setMessage('Erro ao atualizar perfil.');
    }
  };

  const handleImageUpload = async (file) => {
    // Lógica de upload de imagem
  };

  return (
    <div className="container">
      <hr className="mt-0 mb-4" />
      <Row>
        <Col xl={4}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header>Foto de perfil</Card.Header>
            <Card.Body className="text-center">
              <img className="img-account-profile rounded-circle mb-2" src={Image} alt="profile" />
              <div className="small font-italic text-muted mb-4">JPG ou PNG máximo 5 MB</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4">
            <Card.Header>Detalhes do perfil</Card.Header>
            <Card.Body>
              <Form>
                <Row className="gx-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sobrenome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="gx-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="gx-3 mb-3">
                <Col md={6}>
                    <Form.Group>
                      <Form.Label>País</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                <Col md={6}>
                    <Form.Group>
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  </Row>

                  <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Row className="gx-3 mb-3">
                <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Intituição</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your vinculo"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Escolaridade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your escolaridade"
                    value={educationLevel}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </Form.Group>
                </Col>
                </Row>
                <Row className="gx-3 mb-3">
                <Col md={6}>
                    <Form.Group>
                      <Form.Label>Profissão</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your tipo"
                        value={role}
                        onChange={(e) => setTipo(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Genêro</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your genero"
                        value={gender}
                        onChange={(e) => setGenero(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="gx-3 mb-3">
                <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nome social</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your nome social"
                        value={socialName}
                        onChange={(e) => setSocialName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                <Col md={6}>
                    <Form.Group>
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>                  
                </Row>
                <Button className="Btn" variant="primary" onClick={handleSaveChanges}>Salvar mudanças</Button>
                {message && <div className="alert alert-info">{message}</div>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
