import React, { createContext, useState, ReactNode } from 'react';
import apiService from '../api.service';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!apiService.getAccessToken());

  const login = (accessToken: string, refreshToken: string) => {
    apiService.setTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    apiService.signOut(); 
    apiService.clearTokens();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};