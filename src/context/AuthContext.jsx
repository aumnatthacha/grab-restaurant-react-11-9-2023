//10
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, createContext, useState, useEffect } from "react";
import AuthService from "../services/auth.services";
// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    // 16
    const [user, setUser] = useState(getUser);
    const login = (user) => setUser(user);
    const logout = () => {
        AuthService.logout();
        setUser(null);
    };
    //16
    function getUser() {
        const temp = localStorage.getItem("user");
        const savedUser = JSON.parse(temp);
        return savedUser || null;
    }
    //16
    useEffect(() => {
        const temp = JSON.stringify(user);
        localStorage.setItem("user", temp);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);