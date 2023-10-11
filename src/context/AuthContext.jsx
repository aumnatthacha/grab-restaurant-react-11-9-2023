//10
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, createContext, useState } from "react";
import AuthService from "../services/auth.services";
// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (user) => setUser(user);
    const logout = () => {
        AuthService.logout();
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);