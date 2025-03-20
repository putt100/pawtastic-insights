import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginModal from './LoginModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  // No props needed for now
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <header className="py-3 md:py-5 bg-transparent fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="PawLingo Logo" className="h-8" />
            <span className="font-bold text-xl text-pawlingo-dark font-display">PawLingo</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <a href="#features" className="px-3 py-2 text-pawlingo-muted hover:text-pawlingo-primary transition-colors">Features</a>
            <a href="#how-it-works" className="px-3 py-2 text-pawlingo-muted hover:text-pawlingo-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="px-3 py-2 text-pawlingo-muted hover:text-pawlingo-primary transition-colors">Testimonials</a>
            <Link to="/ai-assistant" className="px-3 py-2 text-pawlingo-muted hover:text-pawlingo-primary transition-colors">AI Assistant</Link>
          </nav>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleLoginClick}>
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-pawlingo-dark"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl overflow-hidden"
            >
              <div className="p-4 flex flex-col space-y-3">
                <a
                  href="#features"
                  className="px-3 py-2 hover:bg-pawlingo-light rounded-lg transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="px-3 py-2 hover:bg-pawlingo-light rounded-lg transition-colors"
                  onClick={toggleMobileMenu}
                >
                  How it Works
                </a>
                <a
                  href="#testimonials"
                  className="px-3 py-2 hover:bg-pawlingo-light rounded-lg transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Testimonials
                </a>
                <Link
                  to="/ai-assistant"
                  className="px-3 py-2 hover:bg-pawlingo-light rounded-lg transition-colors"
                  onClick={toggleMobileMenu}
                >
                  AI Assistant
                </Link>
                
                <Button variant="outline" size="sm" onClick={() => { toggleMobileMenu(); handleLoginClick(); }}>
                  Log In
                </Button>
                <Button size="sm">Sign Up</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;
