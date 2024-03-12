import { createContext, useContext, useState } from 'react';

interface User {
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
}

const AuthContext = createContext<{
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const userDataString = localStorage.getItem('userLogin');

    const [user, setUser] = useState(userDataString ? JSON.parse(userDataString) : null);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('userLogin', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userLogin');
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
