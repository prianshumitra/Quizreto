import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserResponse } from '../types/api';
import { getMyProfile } from '../api/auth';

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('quizreto_token'));
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const profile = await getMyProfile();
      setUser(profile);
    } catch {
      localStorage.removeItem('quizreto_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem('quizreto_token', newToken);
    setToken(newToken);
    setIsLoading(true);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('quizreto_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (token) {
      await fetchUser();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
