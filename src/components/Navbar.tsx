
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, LogIn, Mail, Wallet, Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/App';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { toast } = useToast();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleSignOut = () => {
    setIsLoggedIn(false);
    toast({
      title: "Signed Out",
      description: "You have been signed out of your account",
    });
    navigate('/');
  };

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
            {isLoggedIn && (
              <Link 
                to="/ai-assistant" 
                className="text-pawlingo-primary hover:text-pawlingo-primary/80 transition-colors flex items-center gap-1"
              >
                <Bot className="w-4 h-4" />
                AI Assistant
              </Link>
            )}
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
                <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </DialogTrigger>
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
                <Button 
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthDialog(true);
                  }}
                  className="rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
                >
                  Try PawLingo Free
                </Button>
              </>
            )}
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
            {isLoggedIn && (
              <Link 
                to="/ai-assistant" 
                className="text-pawlingo-primary hover:text-pawlingo-primary/80 transition-colors flex items-center gap-1 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Bot className="w-4 h-4" />
                AI Assistant
              </Link>
            )}
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
                      setAuthMode('signin');
                      setShowAuthDialog(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    className="w-full rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthDialog(true);
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
      )}

      {/* Auth Dialog for Mobile */}
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
                  <Label htmlFor="mobile-email">Email</Label>
                  <Input
                    id="mobile-email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile-password">Password</Label>
                  <Input
                    id="mobile-password"
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
    </motion.header>
  );
};

export default Navbar;
