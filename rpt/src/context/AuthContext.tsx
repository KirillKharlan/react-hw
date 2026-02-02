import React, { createContext, useContext, useState } from 'react';
import { IUserForm } from '../shared/types';

interface AuthContextType {
    isAuth: boolean;
    loading: boolean;
    serverError: string | null;
    login: (credentials: Pick<IUserForm, 'email' | 'password'>) => Promise<void>;
    signUp: (userData: IUserForm) => Promise<void>;
    logout: () => void;
}

const API_URL = "http://localhost:8000";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const login = async (credentials: Pick<IUserForm, 'email' | 'password'>): Promise<void> => {
        setLoading(true);
        setServerError(null);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server error: Non-JSON response received. Check your URL.");
            }

            const data = await response.json();
            console.log("Server response:", data);

            if (!response.ok) throw new Error(data.message || "Registration failed");

            if (data.token) {
                localStorage.setItem('token', data.token);
                setIsAuth(true);
            } else {
                throw new Error("No token received from server");
            }
        } catch (err) {
            setServerError(err instanceof Error ? err.message : "Network error");
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (userData: IUserForm): Promise<void> => {
        setLoading(true);
        setServerError(null);
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server error: Non-JSON response received. Check your URL.");
            }

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed");
            
            localStorage.setItem('token', data.token);
            setIsAuth(true);
        } catch (e) {
            setServerError(e instanceof Error ? e.message : "Network error");
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        setIsAuth(false);
    };

    

    return (
        <AuthContext.Provider value={{ isAuth, loading, serverError, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};