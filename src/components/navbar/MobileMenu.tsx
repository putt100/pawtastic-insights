
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import NavItems from './NavItems';
import { useAuth } from '@/App';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  handleSignOut: () => void;
  openAuthDialog: (mode: 'signin' | 'signup') => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  handleSignOut,
  openAuthDialog
}) => {
  const { isLoggedIn } = useAuth();

  if (!isMobileMenuOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="md:hidden bg-white shadow-lg rounded-b-2xl mt-2 overflow-hidden"
    >
      <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
        <NavItems 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="py-2"
        />
        
        <div className="flex flex-col gap-3 pt-3 border-t border-pawlingo-light">
          {isLoggedIn ? (
            <Button 
              onClick={() => {
                handleSignOut();
                setIsMobileMenuOpen(false);
              }}
              variant="outline" 
              className="w-full rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all"
                onClick={() => {
                  openAuthDialog('signin');
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button 
                className="w-full rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
                onClick={() => {
                  openAuthDialog('signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                Try PawLingo Free
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
