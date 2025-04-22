"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define tipe untuk context
interface AuthContextType {
    token: string | null;
    setAuthToken: (token: string | null) => void;
    getToken: () => string | null;
}

// Default nilai untuk context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider untuk menyertakan AuthContext di aplikasi
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    // Fungsi untuk mengatur token
    const setAuthToken = (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem('authToken', newToken);
        } else {
            localStorage.removeItem('authToken');
        }
    };

    // Mengambil token dari localStorage jika ada
    const getToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('authToken');
        }
        return token;
    };

    return (
        <AuthContext.Provider value={{ token, setAuthToken, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};