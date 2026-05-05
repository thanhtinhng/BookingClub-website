import React, { createContext, useEffect } from "react";
import { getMeApi } from "../services/auth.api";


interface User{
    _id: string,
    email: string,
    phone: string,
    name: string,
    role: string
}

interface AuthContextType {
    user: User | null,
    loading: boolean,
    fetchMe: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

  const fetchMe = async () => {
        try {
            setLoading(true);
            const data = await getMeApi();
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
            fetchMe();
    }, []); // Chỉ chạy 1 lần duy nhất khi Mount ứng dụng
    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchMe }}>
            {children}
        </AuthContext.Provider>
    );
}
