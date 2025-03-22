
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAuth } from '@/App';

interface NavItemsProps {
  onClick?: () => void;
  className?: string;
}

const NavItems: React.FC<NavItemsProps> = ({ onClick, className = "" }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <a 
        href="#features" 
        className={`text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors ${className}`}
        onClick={onClick}
      >
        Features
      </a>
      <a 
        href="#how-it-works" 
        className={`text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors ${className}`}
        onClick={onClick}
      >
        How It Works
      </a>
      <a 
        href="#testimonials" 
        className={`text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors ${className}`}
        onClick={onClick}
      >
        Testimonials
      </a>
      <a 
        href="#faq" 
        className={`text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors ${className}`}
        onClick={onClick}
      >
        FAQ
      </a>
      {isLoggedIn && (
        <Link 
          to="/ai-assistant" 
          className={`text-pawlingo-primary hover:text-pawlingo-primary/80 transition-colors flex items-center gap-1 ${className}`}
          onClick={onClick}
        >
          <Bot className="w-4 h-4" />
          AI Assistant
        </Link>
      )}
    </>
  );
};

export default NavItems;
