
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Google, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/hooks/use-toast";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login('email', { email, name: email.split('@')[0] });
      onClose();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await login('google');
      onClose();
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };
  
  const handleMetaMaskLogin = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask extension to continue",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login('metamask');
      onClose();
    } catch (err: any) {
      setError(err.message || 'MetaMask login failed. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">Welcome to PawLingo</DialogTitle>
          <DialogDescription className="text-center text-pawlingo-muted pt-2">
            Connect with your pet in a whole new way
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex flex-col gap-4 py-2">
          <Button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full"
          >
            <Google className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          
          <Button 
            onClick={handleMetaMaskLogin}
            disabled={isLoading}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800"
          >
            <svg className="h-5 w-5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.9583 1L19.8242 10.7183L22.2666 4.99099L32.9583 1Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.66699 1L15.6826 10.809L13.3586 4.99098L2.66699 1Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28.2291 23.5334L24.7346 28.872L32.2731 30.9323L34.446 23.6518L28.2291 23.5334Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.18237 23.6518L3.3422 30.9323L10.8807 28.872L7.39917 23.5334L1.18237 23.6518Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Connect with MetaMask</span>
          </Button>
        </div>
        
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">or continue with email</span>
          </div>
        </div>
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-pawlingo-primary hover:underline">Forgot password?</a>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-full"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full rounded-full h-12 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>
        </form>
        
        <div className="text-center text-sm text-pawlingo-muted">
          Don't have an account?{" "}
          <a href="#" className="text-pawlingo-primary font-medium hover:underline">
            Sign up for free
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
