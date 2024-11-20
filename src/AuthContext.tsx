import { createContext, ReactNode, useState, useEffect } from "react";
import { reLogin } from "./components/Navbar/api";
import { ResultUserVo } from "./types/result-user-vo";

interface AuthContextType {
    isLogin: boolean;
    setLogin: (login: boolean) => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    isLogin: false,
    setLogin: () => { },
    isLoading: true,
});

interface AuthProvideProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProvideProps> = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const response = await reLogin();
                const result: ResultUserVo = await response.json();
                setLogin(result.code === 1);
            } catch (error) {
                console.error('Login verification failed:', error);
                setLogin(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, setLogin, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};