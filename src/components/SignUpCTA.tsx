
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';

const SignUpCTA = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, loginWithMetaMask } = useAuth();

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleConnectMetaMask = async () => {
    await loginWithMetaMask();
  };

  return (
    <>
      <section className="py-20 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-pawlingo-light/50 to-transparent"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pawlingo-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pawlingo-tertiary/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-16 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pawlingo-primary/30 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pawlingo-secondary/30 to-transparent rounded-tl-full"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pawlingo-tertiary/10 text-pawlingo-tertiary text-sm font-medium">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Special Launch Offer
                  </span>
                  <h2 className="mt-6 text-4xl md:text-5xl font-display text-pawlingo-dark leading-tight">
                    Ready to <span className="text-gradient">Connect</span> With Your Pet Like Never Before?
                  </h2>
                  <p className="mt-6 text-lg text-pawlingo-muted max-w-2xl mx-auto">
                    Join thousands of pet owners who have transformed their relationship with their furry companions through PawLingo's AI-powered insights.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
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
                    <h3 className="text-xl font-display text-pawlingo-dark mb-3">Web3 Integration</h3>
                    <p className="text-pawlingo-muted mb-4">Connect with MetaMask to access blockchain pet profiles and exclusive web3 features.</p>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-pawlingo-primary/30 text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all"
                      onClick={handleConnectMetaMask}
                      disabled={isAuthenticated}
                    >
                      {isAuthenticated ? 'Connected' : 'Connect MetaMask'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="glass-card p-6 text-center hover-lift">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pawlingo-tertiary to-pawlingo-secondary mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 5C10.6193 5 9.5 6.11929 9.5 7.5C9.5 8.88071 10.6193 10 12 10C13.3807 10 14.5 8.88071 14.5 7.5C14.5 6.11929 13.3807 5 12 5ZM17 15.75C17 13.6789 15.2427 12 12.9167 12H11.0833C8.75725 12 7 13.6789 7 15.75V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V15.75Z" fill="currentColor" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display text-pawlingo-dark mb-3">Standard Sign-Up</h3>
                    <p className="text-pawlingo-muted mb-4">Create an account instantly with Google or your email to start understanding your pet.</p>
                    <Button 
                      className="rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
                      onClick={handleOpenLoginModal}
                      disabled={isAuthenticated}
                    >
                      {isAuthenticated ? 'Signed In' : 'Sign Up with Google'}
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center items-center mb-8">
                    <div className="h-px bg-pawlingo-light w-full max-w-xs"></div>
                    <span className="px-4 text-pawlingo-muted text-sm">or</span>
                    <div className="h-px bg-pawlingo-light w-full max-w-xs"></div>
                  </div>
                  
                  <Button 
                    className="rounded-full py-7 px-8 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all"
                    onClick={handleOpenLoginModal}
                    disabled={isAuthenticated}
                  >
                    {isAuthenticated ? 'Welcome to PawLingo!' : 'Try PawLingo Free for 14 Days'}
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <p className="mt-4 text-sm text-pawlingo-muted">
                    {isAuthenticated ? 'Thank you for joining our community!' : 'No credit card required. Cancel anytime.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
};

export default SignUpCTA;
