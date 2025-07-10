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

  //rehydrate state from cookie on first load
  useEffect(() => {
    const fetchTokenAndSetState = async () => {
      try {
        const res = await fetch('/api/check-token', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setUserName(data.userName);
          setJobTitle(data.jobTitle);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndSetState();
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
        router.push('/');
      } else {
        console.error('Logout API failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Provide auth state and methods to all child components via context
  return (
    <AuthContext.Provider
      value={{ userName, jobTitle, loading, isLoggedIn, login, logout }}
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
