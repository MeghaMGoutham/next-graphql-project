'use client';

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userName: string | null;
  jobTitle: string | null;
  isLoggedIn: boolean;
  login: (userName: string, jobTitle: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const isLoggedIn = Boolean(userName && jobTitle);
  const router = useRouter();

  const login = async (userName: string, jobTitle: string) => {
    try {
      const res = await fetch('/api/user-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, jobTitle }),
      });

      if (!res.ok) {
        console.error('Failed to set token');
        return;
      }
      setUserName(userName);
      setJobTitle(jobTitle);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        setUserName(null);
        setJobTitle(null);
        router.push('/');
      } else {
        console.error('Logout API failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userName, jobTitle, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to consume auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
