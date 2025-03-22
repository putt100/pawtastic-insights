
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SignUpCTA from '../components/SignUpCTA';
import Footer from '../components/Footer';

// Add framer-motion to the project
// Note: We're using direct CDN imports for dependencies we need just for this page,
// to avoid having to add them as full dependencies
const loadFramerMotion = () => {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/framer-motion@10.12.16/dist/framer-motion.js';
  script.async = true;
  document.body.appendChild(script);
  
  return () => {
    document.body.removeChild(script);
  };
};

const Index = () => {
  useEffect(() => {
    const cleanup = loadFramerMotion();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
        <SignUpCTA />
      </main>
      
      <Footer />
      
      {/* Back to Top Button */}
      <motion.a
        href="#"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-pawlingo-primary text-white flex items-center justify-center shadow-lg hover:bg-pawlingo-primary/90 transition-colors z-50"
        aria-label="Back to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L5 12H9V19H15V12H19L12 5Z" fill="currentColor" />
        </svg>
      </motion.a>
    </div>
  );
};

export default Index;
