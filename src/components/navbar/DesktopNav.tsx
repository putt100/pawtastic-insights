
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import NavItems from './NavItems';
import { useAuth } from '@/App';

interface DesktopNavProps {
  handleSignOut: () => void;
  openAuthDialog: (mode: 'signin' | 'signup') => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ 
  handleSignOut,
  openAuthDialog
}) => {
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <nav className="hidden md:flex items-center gap-6">
        <NavItems />
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <Button 
            onClick={handleSignOut}
            variant="outline" 
            className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all"
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button 
              variant="outline" 
              className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all"
              onClick={() => openAuthDialog('signin')}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button 
              className="rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
              onClick={() => openAuthDialog('signup')}
            >
              Try PawLingo Free
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
