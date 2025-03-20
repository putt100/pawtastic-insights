
import { useEffect, useState, useRef, RefObject } from 'react';

// Hook to determine if an element is in view
export function useInView(ref: RefObject<HTMLElement>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
  
  return isInView;
}

// Hook to trigger animations on scroll
export function useScrollAnimation(initialDelay = 0) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  return {
    ref,
    style: {
      opacity: hasAnimated ? 1 : 0,
      transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease-out ${initialDelay}s, transform 0.6s ease-out ${initialDelay}s`
    }
  };
}

// Hook for parallax scroll effect
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (ref.current) {
        ref.current.style.transform = `translateY(${scrollPosition * speed}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return ref;
}

// Hook for staggered animation of children
export function useStaggeredAnimation(totalItems: number, staggerDelay = 0.1) {
  return Array.from({ length: totalItems }).map((_, index) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      delay: index * staggerDelay,
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }));
}
