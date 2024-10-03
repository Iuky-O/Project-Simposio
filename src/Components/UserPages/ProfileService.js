  export const handleSaveChanges = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:5001/simposio/us-central1/api/user/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no service ao atualizar perfil:', error);
      throw error;
    }
};
export const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch('http://127.0.0.1:5001/simposio/us-central1/api/uploadImage', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no service ao carregar imagem:', error);
      throw error;
    }
};
export const deleteUserProfile = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/simposio/us-central1/api/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar o perfil');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no service ao deletar perfil:', error);
      throw error;
    }
  };

 /* 
 const handleDeleteProfile = async () => {
    const userId = '123'; // ID do usuário

    try {
      await deleteUserProfile(userId);
      alert('Perfil deletado com sucesso!');
      // Redirecionar o usuário, limpar estados, etc.
    } catch (error) {
      console.error('Erro no service ao deletar perfil:', error);
      alert('Erro no service ao tentar deletar o perfil.');
    }
  };
*/