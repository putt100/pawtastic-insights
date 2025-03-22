
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn, Mail, Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/App';

type AuthMode = 'signin' | 'signup';

interface AuthDialogProps {
  showAuthDialog: boolean;
  setShowAuthDialog: (show: boolean) => void;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  showAuthDialog,
  setShowAuthDialog,
  authMode,
  setAuthMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const { setIsLoggedIn } = useAuth();

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to a real auth system in production
    setIsLoggedIn(true); // Set user as logged in
    toast({
      title: authMode === 'signin' ? "Sign In Successful" : "Account Created",
      description: `Welcome to PawLingo${authMode === 'signup' ? '! Your account has been created.' : ''}`,
    });
    setShowAuthDialog(false);
  };

  const handleGoogleAuth = () => {
    // This would connect to Google Auth in production
    setIsLoggedIn(true); // Set user as logged in
    toast({
      title: "Google Sign In",
      description: "Successfully signed in with Google",
    });
    setShowAuthDialog(false);
  };

  const handleMetaMaskAuth = () => {
    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
      // This would connect to MetaMask in production
      setIsLoggedIn(true); // Set user as logged in
      toast({
        title: "MetaMask Connect",
        description: "Successfully connected to your wallet",
      });
      setShowAuthDialog(false);
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask extension to continue",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {authMode === 'signin' ? 'Sign in to your account to continue' : 'Join PawLingo and understand your pet better'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-6">
            <Button onClick={handleGoogleAuth} variant="outline" className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
            <Button onClick={handleMetaMaskAuth} variant="outline" className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2">
              <Wallet className="w-5 h-5 text-orange-500" />
              Connect MetaMask
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </div>
          <div className="text-center mt-4">
            <button 
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="text-sm text-pawlingo-primary hover:underline"
            >
              {authMode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
