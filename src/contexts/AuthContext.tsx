
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  walletAddress?: string;
  authProvider: 'google' | 'metamask' | 'email';
  bio?: string;
  petName?: string;
  petType?: string;
  petBreed?: string;
};

type ProfileUpdateData = {
  name?: string;
  bio?: string;
  petName?: string;
  petType?: string;
  petBreed?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithMetaMask: () => Promise<void>;
  updateUserProfile: (data: ProfileUpdateData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const checkExistingSession = () => {
      const savedUser = localStorage.getItem('pawlingo_user');
      
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse saved user:', error);
          localStorage.removeItem('pawlingo_user');
        }
      }
      
      setIsLoading(false);
    };
    
    checkExistingSession();
  }, []);

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate Google login - in a real app, replace with actual Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'google_' + Math.random().toString(36).substring(2, 11),
        name: 'Pet Lover',
        email: 'pet.lover@example.com',
        avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
        authProvider: 'google',
        bio: '',
        petName: '',
        petType: '',
        petBreed: ''
      };
      
      setUser(mockUser);
      localStorage.setItem('pawlingo_user', JSON.stringify(mockUser));
      toast.success('Successfully logged in with Google!');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithMetaMask = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask to continue.');
        setIsLoading(false);
        return;
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      
      // Create a mock user with wallet address
      const mockUser: User = {
        id: 'metamask_' + Math.random().toString(36).substring(2, 11),
        name: 'Crypto Pet Lover',
        walletAddress: walletAddress,
        authProvider: 'metamask',
        bio: '',
        petName: '',
        petType: '',
        petBreed: ''
      };
      
      setUser(mockUser);
      localStorage.setItem('pawlingo_user', JSON.stringify(mockUser));
      toast.success('Successfully connected with MetaMask!');
    } catch (error) {
      console.error('MetaMask login error:', error);
      toast.error('Failed to connect with MetaMask. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: ProfileUpdateData): Promise<void> => {
    if (!user) {
      toast.error('You must be logged in to update your profile.');
      return;
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...data
      };
      
      setUser(updatedUser);
      localStorage.setItem('pawlingo_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('pawlingo_user');
    toast.info('You have been logged out.');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user, 
        loginWithGoogle, 
        loginWithMetaMask,
        updateUserProfile,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
