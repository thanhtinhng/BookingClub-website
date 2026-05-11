import React, { createContext, useEffect } from "react";
import { getMeApi } from "../services/auth.api";

export interface User {
    _id: string;
    email: string;
    phone: string;
    name: string;
    status: string; 
    role: string;
    avatar_url: string; 
    date_of_birth: string | Date; 
    location?: string;
    sportLevel?: string;
    goal?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
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
            
            // Gọi API thật lấy dữ liệu User
            const response: any = await getMeApi();
            
            // Tùy thuộc vào axios interceptor của project mà data nằm ở response hay response.data
            setUser(response.data || response); 

        } catch (error) {
            console.error("Lỗi khi fetch thông tin user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchMe();
    }, []); 

    return (
        <AuthContext.Provider value={{ user, setUser, loading, fetchMe }}>
            {children}
        </AuthContext.Provider>
    );
}