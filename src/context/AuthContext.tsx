
import React, { createContext, useContext, useState, ReactNode } from "react";
import AuthModal from "@/components/auth/AuthModal";

export type UserRole = "user" | "admin" | "service_provider";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  joinedDate?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  updateUser: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Mock login function - would connect to backend in real app
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    if (email.includes("admin")) {
      setUser({
        id: "1",
        name: "Admin User",
        email,
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&auto=format&fit=crop&crop=face",
        phone: "+1 (555) 123-4567",
        joinedDate: "2023-01-15",
      });
    } else if (email.includes("service")) {
      setUser({
        id: "2",
        name: "Service Provider",
        email,
        role: "service_provider",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&auto=format&fit=crop&crop=face",
        phone: "+1 (555) 987-6543",
        joinedDate: "2023-03-22",
      });
    } else {
      setUser({
        id: "3",
        name: "Regular User",
        email,
        role: "user",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&auto=format&fit=crop&crop=face",
        phone: "+1 (555) 456-7890",
        joinedDate: "2023-05-10",
      });
    }
  };

  // Mock registration function
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Create a new user
    setUser({
      id: "3",
      name,
      email,
      role: "user",
      joinedDate: new Date().toISOString().split('T')[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({...user, ...userData});
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
        updateUser,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
