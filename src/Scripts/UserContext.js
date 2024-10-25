import React, { createContext, useState, useMemo } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (email) => {
    try {
      const usersCollection = collection(db, "usuarios");
      const q = query(usersCollection, where("Email", "==", email));
      const querySnapshot = await getDocs(q);
      const userDataArray = querySnapshot.docs.map((doc) => doc.data());
      setUserData(userDataArray[0]);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const value = useMemo(() => ({ userData, fetchUserData }), [userData]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
