
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginDialog } from './LoginDialog';
import { UserMenu } from './UserMenu';

export const AuthButtons: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  
  if (isLoading) {
    return (
      <Button variant="ghost" className="rounded-full" disabled>
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-pawlingo-primary border-t-transparent"></span>
      </Button>
    );
  }
  
  if (isAuthenticated) {
    return <UserMenu />;
  }
  
  return (
    <>
      <Button 
        onClick={() => setIsLoginDialogOpen(true)} 
        variant="outline" 
        className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>
      
      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onClose={() => setIsLoginDialogOpen(false)} 
      />
    </>
  );
};
