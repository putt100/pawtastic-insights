
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ChevronRight, Upload, ArrowRight } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set up the video
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-pawlingo-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-pawlingo-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-pawlingo-primary/10 text-pawlingo-primary text-sm font-medium">
                AI-Powered Pet Communication
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-pawlingo-dark leading-tight">
                <span className="text-gradient">Understand</span> Your Pet Like Never Before
              </h1>
              
              <p className="text-lg md:text-xl text-pawlingo-muted mb-8 max-w-2xl mx-auto lg:mx-0">
                AI-powered pet behavior analysis from images and videos, helping you connect deeper with your furry friends through technology.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button className="rounded-full py-6 px-8 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white hover:shadow-lg hover:shadow-pawlingo-primary/20 transition-all w-full sm:w-auto">
                  Try PawLingo Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button variant="outline" className="rounded-full py-6 px-8 border-2 border-pawlingo-primary/30 text-pawlingo-primary hover:bg-pawlingo-primary/10 transition-all w-full sm:w-auto">
                  See How It Works
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-pawlingo-muted">
                    <span className="text-pawlingo-primary font-medium">2,500+</span> pet owners trust PawLingo
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Video */}
              <div className="glass-card relative overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto rounded-lg"
                  poster="https://images.unsplash.com/photo-1587559070350-9a5678118c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                >
                  <source src="https://media.istockphoto.com/id/1455748812/video/dog-and-cat-playing-together-at-home-slow-motion.mp4?s=mp4-640x640-is&k=20&c=j_YeWgfg0ARYRJDmXdHFSAMdvZnU_Ls-6Rh2WM4GhQ8=" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Floating Analysis UI */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-3 flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-pawlingo-primary/20 rounded-full flex items-center justify-center">
                    <div className="animate-pulse w-7 h-7 bg-pawlingo-primary rounded-full flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="h-2 bg-pawlingo-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-pawlingo-primary rounded-full"></div>
                    </div>
                    <p className="text-xs text-pawlingo-muted mt-1">Analyzing pet behavior...</p>
                  </div>
                </div>
                
                {/* Floating Emotion Tag */}
                <div className="absolute top-4 right-4 glass-card px-3 py-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium">Happy & Playful</span>
                </div>
              </div>
              
              {/* Floating Companion Elements */}
              <div className="absolute -right-6 -bottom-6 p-4 glass-card flex items-center gap-3 shadow-lg animate-floating">
                <div className="flex-shrink-0 text-2xl">🐱</div>
                <div>
                  <p className="text-sm font-medium">Luna wants attention</p>
                  <div className="flex items-center text-xs text-pawlingo-muted">
                    <span>View analysis</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-6 top-1/3 p-3 glass-card flex items-center gap-2 shadow-lg animate-floating" style={{ animationDelay: "1s" }}>
                <div className="flex-shrink-0 text-2xl">🦮</div>
                <p className="text-sm font-medium">Max is hungry</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
