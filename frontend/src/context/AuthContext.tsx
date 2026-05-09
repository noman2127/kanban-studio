'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginRequest } from '@/lib/api';

const userStorageKey = 'kanban-user';
const tokenStorageKey = 'kanban-token';

export interface User {
  username: string;
  loginTime: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(userStorageKey);
    const storedToken = localStorage.getItem(tokenStorageKey);

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(userStorageKey);
        localStorage.removeItem(tokenStorageKey);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(userStorageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(userStorageKey);
    }
  }, [user]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const token = await loginRequest(username, password);
      const newUser: User = {
        username,
        loginTime: Date.now(),
      };
      setUser(newUser);
      localStorage.setItem(tokenStorageKey, token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(tokenStorageKey);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
