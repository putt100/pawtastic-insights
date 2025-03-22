
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
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
  );
};

export default Logo;
