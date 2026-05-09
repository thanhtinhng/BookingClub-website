import React, { createContext, useEffect } from "react";
// import { getMeApi } from "../services/auth.api";

export interface User {
    _id: string;
    email: string;
    phone: string;
    name: string;
    status: string; 
    role: string;
    avatar_url: string; // Đổi từ avatar
    date_of_birth: string | Date; // Đổi từ dob
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
            
            // ❌ 1. COMMENT LẠI DÒNG GỌI API 
            // const data = await getMeApi();
            
            // ✅ 2. TẠO DATA GIẢ (MOCK DATA) ĐÚNG CHUẨN MỚI CỦA BACKEND
            const mockData: User = {
                _id: "fake-123",
                email: "Nguyen@gmail.com",
                phone: "0123456789",
                name: "Nguyen (Test Bypass)",
                status: "active", // Data giả cho status
                role: "user",
                location: "Quận 1, TP.HCM",
                sportLevel: "Cầu lông - Trung bình",
                goal: "Giảm cân",
                avatar_url: "", // Đã cập nhật key
                date_of_birth: "2000-01-01" // Đã cập nhật key
            };

            // ✅ 3. NHÉT DATA GIẢ VÀO CONTEXT
            setUser(mockData);

        } catch (error) {
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