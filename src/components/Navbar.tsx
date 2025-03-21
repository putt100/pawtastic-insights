
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary rounded-full opacity-70 animate-pulse-soft"></div>
              <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
            </div>
            <a href="#" className="font-display text-2xl text-pawlingo-dark">
              PawLingo
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button className="rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all">
              Try PawLingo Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-pawlingo-dark p-2 hover:bg-pawlingo-light rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-white shadow-lg rounded-b-2xl mt-2 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
            <a 
              href="#features" 
              className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col gap-3 pt-3 border-t border-pawlingo-light">
              <Button variant="outline" className="w-full rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button className="w-full rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all">
                Try PawLingo Free
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
