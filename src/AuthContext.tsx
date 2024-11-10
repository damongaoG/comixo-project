import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
    isLogin: boolean;
    setLogin: (login: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLogin: false,
    setLogin: () => { },
})

interface AuthProvideProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProvideProps> = ({ children }) => {
    const [isLogin, setLogin] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogin, setLogin }}>
            {children}
        </AuthContext.Provider>
    )
}