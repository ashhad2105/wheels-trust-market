import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string; } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();
  const { toast } = useToast()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      setToken(token);
      setIsAuthenticated(true);
      setUser({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });

      localStorage.setItem('user', JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }));

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`
      })
      navigate('/profile');
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.error || error.message);
      toast({
        title: "Login failed",
        description: error.response?.data?.error || "Invalid credentials",
        variant: "destructive",
      })
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1/auth/register`, {
        name,
        email,
        password
      });

      const { token, user } = response.data;
      setToken(token);
      setIsAuthenticated(true);
      setUser({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });

      localStorage.setItem('user', JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }));

      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name}!`,
      })
      navigate('/profile');
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data?.error || error.message);
      toast({
        title: "Registration failed",
        description: error.response?.data?.error || "Please try again.",
        variant: "destructive",
      })
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
