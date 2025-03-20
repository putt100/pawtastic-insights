
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return <>
      <motion.header initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.5,
      ease: 'easeOut'
    }} className={cn('fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300', isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent')}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary rounded-full opacity-70 animate-pulse-soft"></div>
                <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐾</span>
                </div>
              </div>
              <Link to="/" className="font-display text-2xl text-pawlingo-dark">
                PawLingo
              </Link>
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
              {isAuthenticated ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full border-pawlingo-primary/30 hover:bg-pawlingo-primary/10 transition-all">
                      {user?.avatar ? <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div> : <User className="w-4 h-4 mr-2" />}
                      {user?.name || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white p-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.walletAddress && <DropdownMenuItem className="cursor-default flex-wrap break-all">
                        <span className="text-xs text-pawlingo-muted">
                          {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
                        </span>
                      </DropdownMenuItem>}
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link to="/profile">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Pet Dashboard</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> : <>
                  <Button variant="outline" className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all" onClick={handleOpenLoginModal}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  
                </>}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-pawlingo-dark p-2 hover:bg-pawlingo-light rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }} className="md:hidden bg-white shadow-lg rounded-b-2xl mt-2 overflow-hidden">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              <a href="#features" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#testimonials" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Testimonials
              </a>
              <a href="#faq" className="text-pawlingo-dark/80 hover:text-pawlingo-dark transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </a>
              <div className="flex flex-col gap-3 pt-3 border-t border-pawlingo-light">
                {isAuthenticated ? <>
                    <div className="flex items-center gap-3 py-2">
                      {user?.avatar ? <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div> : <div className="w-8 h-8 rounded-full bg-pawlingo-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-pawlingo-primary" />
                        </div>}
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        {user?.walletAddress && <div className="text-xs text-pawlingo-muted truncate max-w-[180px]">
                            {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
                          </div>}
                      </div>
                    </div>
                    <Button 
                      className="w-full rounded-full" 
                      variant="outline"
                      asChild
                      onClick={() => { setIsMobileMenuOpen(false); }}
                    >
                      <Link to="/profile">
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                    </Button>
                    <Button className="w-full rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20" variant="outline" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </> : <>
                    <Button variant="outline" className="w-full rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all" onClick={handleOpenLoginModal}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button className="w-full rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all" onClick={handleOpenLoginModal}>
                      Try PawLingo Free
                    </Button>
                  </>}
              </div>
            </div>
          </motion.div>}
      </motion.header>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>;
};
export default Navbar;
