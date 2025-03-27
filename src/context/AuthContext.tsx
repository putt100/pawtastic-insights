
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  walletAddress?: string;
  provider: 'google' | 'email' | 'metamask';
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (provider: 'google' | 'email' | 'metamask', credentials?: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('pawlingo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('pawlingo_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (provider: 'google' | 'email' | 'metamask', credentials?: any) => {
    setIsLoading(true);
    
    try {
      let userData: User;
      
      // Mock authentication - in a real app, these would be API calls
      if (provider === 'google') {
        // Simulate Google OAuth login
        userData = {
          id: `google-${Date.now()}`,
          name: 'Google User',
          email: credentials?.email || 'user@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Google+User&background=6366f1&color=fff',
          provider: 'google'
        };
      } else if (provider === 'metamask') {
        // Simulate MetaMask login
        if (!window.ethereum) {
          throw new Error('MetaMask is not installed');
        }
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        
        userData = {
          id: `metamask-${Date.now()}`,
          name: `${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
          walletAddress: address,
          avatar: 'https://ui-avatars.com/api/?name=Crypto+User&background=f59e0b&color=fff',
          provider: 'metamask'
        };
      } else {
        // Simulate email login
        userData = {
          id: `email-${Date.now()}`,
          name: credentials?.name || 'PawLingo User',
          email: credentials?.email,
          avatar: 'https://ui-avatars.com/api/?name=Email+User&background=22c55e&color=fff',
          provider: 'email'
        };
      }
      
      // Save to local storage
      localStorage.setItem('pawlingo_user', JSON.stringify(userData));
      setUser(userData);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('pawlingo_user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
