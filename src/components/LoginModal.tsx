
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginWithMetaMask, isLoading } = useAuth();

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    onClose();
  };

  const handleMetaMaskLogin = async () => {
    await loginWithMetaMask();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display">Welcome to PawLingo</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Connect with your pets like never before. Choose a login method to continue.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pawlingo-tertiary to-pawlingo-secondary mx-auto mb-6 flex items-center justify-center">
                <FcGoogle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display text-pawlingo-dark mb-3">Google Login</h3>
              <p className="text-pawlingo-muted mb-4">Use your Google account for quick and easy access to PawLingo.</p>
              <Button 
                className="w-full rounded-full bg-white border border-gray-300 text-pawlingo-dark hover:bg-gray-50 transition-all"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Continue with Google'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 8C8.10457 8 9 7.10457 9 6C9 4.89543 8.10457 4 7 4C5.89543 4 5 4.89543 5 6C5 7.10457 5.89543 8 7 8Z" fill="currentColor" />
                  <path d="M15 10C16.1046 10 17 9.10457 17 8C17 6.89543 16.1046 6 15 6C13.8954 6 13 6.89543 13 8C13 9.10457 13.8954 10 15 10Z" fill="currentColor" />
                  <path d="M7 16C8.10457 16 9 15.1046 9 14C9 12.8954 8.10457 12 7 12C5.89543 12 5 12.8954 5 14C5 15.1046 5.89543 16 7 16Z" fill="currentColor" />
                  <path d="M15 18C16.1046 18 17 17.1046 17 16C17 14.8954 16.1046 14 15 14C13.8954 14 13 14.8954 13 16C13 17.1046 13.8954 18 15 18Z" fill="currentColor" />
                  <path d="M19 16C19.5523 16 20 16.4477 20 17V20H22C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H20C19.4477 22 19 21.5523 19 21V17C19 16.4477 19.4477 16 19 16Z" fill="currentColor" />
                  <path d="M16 20C16 19.4477 16.4477 19 17 19H18C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21H17C16.4477 21 16 20.5523 16 20Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-pawlingo-dark mb-3">MetaMask</h3>
              <p className="text-pawlingo-muted mb-4">Connect with MetaMask to access blockchain pet profiles and exclusive web3 features.</p>
              <Button 
                className="w-full rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
                onClick={handleMetaMaskLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect with MetaMask'}
                <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm text-pawlingo-muted mt-2">
            By continuing, you agree to PawLingo's <a href="#" className="underline hover:text-pawlingo-primary">Terms of Service</a> and <a href="#" className="underline hover:text-pawlingo-primary">Privacy Policy</a>.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
