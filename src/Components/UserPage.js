import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import Image from "../Assets/Alexa.png";
import "../Styles/UserPage.css";
import { db } from '../Firebase/firebaseConfig'; 
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";  
import { AuthContext } from '../Scripts/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext); 
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

  useEffect(() => {
    const getUserProfile = async () => {
      if (!user?.email) {  
        setMessage('Usuário não autenticado.');
        return;
      }
  
      try {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();

          // Popula os campos com os dados do Firestore
          setFirstName(userData.name);
          setGenero(userData.gender);
          setSocialName(userData.socialName || '');
          setLastName(userData.lastName);
          setCountry(userData.address.country);
          setState(userData.address.state);
          setCity(userData.address.city);
          setEmail(userData.email);
          setTipo(userData.role);
          setInstitution(userData.institution);
          setLevel(userData.educationLevel);
          setPhone(userData.phoneNumber);
        } else {
          setMessage('Usuário não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        setMessage('Erro ao buscar perfil.');
      }
    };
  
    if (user?.email) {
      getUserProfile();
    }
  }, [user]);


  const handleSaveChanges = async () => {
    if (!email) {
      setMessage('Email do usuário não encontrado.');
      return;
    }

    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; 
        const userDocRef = userDoc.ref;

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

        await updateDoc(userDocRef, userData);
        setMessage('Perfil atualizado com sucesso!');
      } else {
        setMessage('Usuário não encontrado para atualizar.');
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil: ", error);
      setMessage('Erro ao atualizar perfil.');
    }
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
                onChange={(e) => console.log('Handle image upload', e.target.files[0])}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Row className="gx-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Instituição</Form.Label>
                      <Form.Control
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Escolaridade</Form.Label>
                      <Form.Control
                        type="text"
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
                        value={role}
                        onChange={(e) => setTipo(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Gênero</Form.Label>
                      <Form.Control
                        type="text"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" onClick={handleSaveChanges}>
                  Salvar mudanças
                </Button>
                {message && <p>{message}</p>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
