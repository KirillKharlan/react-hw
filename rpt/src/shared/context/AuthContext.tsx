import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("token"));

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};