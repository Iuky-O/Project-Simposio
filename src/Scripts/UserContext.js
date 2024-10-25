import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig'; 
import { auth } from '../Firebase/firebaseConfig';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  
  const fetchUserData = async (email) => {
    try {
      const usersCollection = collection(db, "usuarios");
      const q = query(usersCollection, where("Email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.email);
      } else {
        setUserData(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <UserContext.Provider value={{ userData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};