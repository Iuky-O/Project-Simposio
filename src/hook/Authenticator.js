import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { useAuth, AuthContext} from "../Scripts/AuthContext"; 
import { UserContext } from "../Scripts/UserContext";

const Authenticator = ({ children }) => {
    const { setUser } = useAuth(); 
    const { fetchUserData } = useContext(UserContext); 

    const authInstance = getAuth(); 

    // Escuta o estado de autenticação do usuário
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

    // Função de login
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

    // Função para limpar todos os cookies
    const clearCookies = () => {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        }

        console.log("Todos os cookies foram limpos.");
    };

    // Função de logout
    const logout = async () => {
        console.log("Desconectando usuário...");
        try {
            await signOut(authInstance);
            clearCookies();
            setUser(null); 
            console.log("Usuário desconectado com sucesso.");
        } catch (error) {
            console.error("Erro ao deslogar:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, user: authInstance.currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authenticator;