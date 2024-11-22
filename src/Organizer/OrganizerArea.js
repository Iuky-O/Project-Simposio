import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';
import "./OrganizerArea.module.css";
import { baixarArquivoDoArtigo } from '../functions/firebaseFileHandler';

function OrganizerArea() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Função para converter base64 em Blob
  function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
  }

  const handleDownload = async (articleId) => {
    await baixarArquivoDoArtigo(articleId);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };
  
  useEffect(() => {
    if (selectedArticle) {
      handleDownload(selectedArticle.id);
    }
  }, [selectedArticle]);

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
      const querySnapshot = await getDocs(collection(db, "artigos"));
      const articleData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() // Obtém os dados do documento
      }));
      setArticles(articleData); // Define os dados no estado
    } catch (error) {
      console.error("Erro ao buscar artigos: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
  }, []);
  
  const handleAddSchedule = () => {
    alert("Cadastrar cronograma");
  };

  return (
    <div style={{ padding: '20px', marginTop: '20px' }}>
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
              <th>Resumo</th>
              <th>Autores</th>
              <th>Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.titulo}</td>
                <td>{article.resumo}</td>
                <td>{article.autores.join(", ")}</td> {/* Junta os nomes dos autores em uma string */}
                <td>
                  <button onClick={() => handleDownload(article.id)}>
                    Baixar
                  </button>
                </td>
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

export default OrganizerArea;
