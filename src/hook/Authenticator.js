import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { useAuth, AuthContext} from "../Scripts/AuthContext"; 
import { UserContext } from "../Scripts/UserContext";

const Authenticator = ({ children }) => {
    const { setUser } = useAuth(); 
    const { fetchUserData } = useContext(UserContext); 

    const [cancelled, setCancelled] = useState(false);
    const authInstance = getAuth(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            console.log("Estado de autenticação alterado:", user);
            if (user) {
                console.log("Usuário autenticado:", user.email);
                setUser(user); 
                fetchUserData(user.email); 
            } else {
                console.log("Usuário desconectado");
                setUser(null); 
            }
        });
        
        return () => unsubscribe(); 
    }, [setUser, fetchUserData]);

    const login = async (email, password) => {
        console.log(`Tentando fazer login com o email: ${email}`);
        try {
            const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
            const user = userCredential.user;
            console.log("Login bem-sucedido:", user.email);
            setUser(user); 
            fetchUserData(user.email);
            return { success: true };
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        if (!cancelled) { 
            console.log("Desconectando usuário...");
            await signOut(authInstance);
            setUser(null); 
            console.log("Usuário desconectado com sucesso.");
        }
    };

    useEffect(() => {
        return () => {
            console.log("Limpando Authenticator...");
            setCancelled(true);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, user: authInstance.currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authenticator;
