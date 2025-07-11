'use client';

import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// Define the shape of the AuthContext's data and methods
interface AuthContextType {
  userName: string | null;
  jobTitle: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (userName: string, jobTitle: string) => void;
  logout: () => void;
  updateUserData: (userName: string, jobTitle: string) => void;
}

// Create React Context with AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap the app and provide auth state and methods
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //hydrate state from local storage and check token
  useEffect(() => {
    const hydrateFromStorageTokenCheck = async () => {
      const cached = localStorage.getItem('userData');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setUserName(parsed.userName);
          setJobTitle(parsed.jobTitle);
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Invalid localStorage JSON:', err);
          localStorage.removeItem('userData');
        }
      }
      try {
        const res = await fetch('/api/check-token', { cache: 'no-store' });
        const data = await res.json();

        if (data.isValid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserName(null);
          setJobTitle(null);
        }
      } catch {
        setIsLoggedIn(false);
        setUserName(null);
        setJobTitle(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateFromStorageTokenCheck();
  }, []);

  // Login method: Sends POST request to backend API to get JWT cookie, then updates context state with user info and sets isLoggedIn = true
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
      setIsLoggedIn(true);
      setUserName(userName);
      setJobTitle(jobTitle);
      localStorage.setItem('userData', JSON.stringify({ userName, jobTitle }));
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Logout method: Sends POST request to backend to clear JWT cookie, resets auth state, and redirects to login page
  const logout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        setUserName(null);
        setJobTitle(null);
        setIsLoggedIn(false);
        localStorage.removeItem('userData');
        router.push('/');
      } else {
        console.error('Logout API failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserData = (userName: string, jobTitle: string) => {
    setUserName(userName);
    setJobTitle(jobTitle);
    localStorage.setItem('userData', JSON.stringify({ userName, jobTitle }));
  };

  // Provide auth state and methods to all child components via context
  return (
    <AuthContext.Provider
      value={{
        userName,
        jobTitle,
        loading,
        isLoggedIn,
        login,
        logout,
        updateUserData,
      }}
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
