export const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://us-central1-simposio-df298.cloudfunctions.net/api'); //link da api
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro no service ao buscar os dados do perfil:', error);
      throw error;
    }
};
  export const saveUserProfile = async (userData) => {
    try {
      const response = await fetch('https://us-central1-simposio-df298.cloudfunctions.net/api/add-users', {
        method: 'POST',
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
      const response = await fetch('https://sua-api.com/uploadImage', {
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
      const response = await fetch(`https://sua-api.com/deleteProfile/${userId}`, {
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