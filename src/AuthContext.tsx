import { createContext, ReactNode, useState, useEffect } from "react";
import { reLogin } from "./components/Navbar/api";
import { ResultUserVo } from "./types/result-user-vo";

interface AuthContextType {
    isLogin: boolean;
    setLogin: (login: boolean) => void;
    isLoading: boolean;
    userId: string | null;
    setUserId: (id: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLogin: false,
    setLogin: () => { },
    isLoading: true,
    userId: null,
    setUserId: () => { },
});

interface AuthProvideProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProvideProps> = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const response = await reLogin();
                const result: ResultUserVo = await response.json();
                setLogin(result.code === 1);
                if (result.code === 1 && result.data) {
                    setUserId(result.data.id);
                }
            } catch (error) {
                console.error('Login verification failed:', error);
                setLogin(false);
                setUserId(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifyLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, setLogin, isLoading, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};