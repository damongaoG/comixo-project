import React, {createContext, ReactNode, useEffect, useState} from "react";
import {reLogin} from "./components/Navbar/api";
import {ResultUserVo} from "./types/result-user-vo";
import {UserProfile} from "./types/user-profile";
import {fetchUserProfileById} from './api/userProfile';

interface AuthContextType {
  isLogin: boolean;
  setLogin: (login: boolean) => void;
  isLoading: boolean;
  userId: string | null;
  setUserId: (id: string | null) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  userNickname: string | null;
  setUserNickname: (nickname: string | null) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  setLogin: () => {
  },
  isLoading: true,
  userId: null,
  setUserId: () => {
  },
  userEmail: null,
  setUserEmail: () => {
  },
  userNickname: null,
  setUserNickname: () => {
  },
  userProfile: null,
  setUserProfile: () => {
  },
});

interface AuthProvideProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProvideProps> = ({children}) => {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchUserProfile = async (userId: string) => {
    const profile = await fetchUserProfileById(userId);
    if (profile) {
      setUserProfile(profile);
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await reLogin();
        const result: ResultUserVo = await response.json();
        setLogin(result.code === 1);
        if (result.code === 1 && result.data) {
          setUserId(result.data.id);
          setUserEmail(result.data.email);
          if (result.data.nickName) {
            setUserNickname(result.data.nickName);
          }
          await fetchUserProfile(result.data.id);
        }
      } catch (error) {
        console.error('Login verification failed:', error);
        setLogin(false);
        setUserId(null);
        setUserEmail(null);
        setUserNickname(null);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      isLogin,
      setLogin,
      isLoading,
      userId,
      setUserId,
      userEmail,
      setUserEmail,
      userNickname,
      setUserNickname,
      userProfile,
      setUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
