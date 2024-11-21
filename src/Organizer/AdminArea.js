import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';
import "./AdminArea.module.css";

function AdminArea() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articleData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articleData);
    } catch (error) {
      console.error("Erro ao buscar artigos: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
  }, []);
  
  const handleAddSchedule = () => {
    // Função que será chamada ao clicar no botão de cadastrar cronograma
    alert("Cadastrar cronograma");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Página do Organizador</h1>

      <section>
        <h2>Usuários Cadastrados</h2>
        <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Artigos Submetidos</h2>
        <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <button onClick={handleAddSchedule} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Cadastrar Cronograma
        </button>
      </section>
    </div>
  );
}

export default AdminArea;

