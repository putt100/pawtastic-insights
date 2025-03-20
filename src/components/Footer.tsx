
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-pawlingo-light">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary rounded-full opacity-70"></div>
                <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐾</span>
                </div>
              </div>
              <a href="#" className="font-display text-2xl text-pawlingo-dark">
                PawLingo
              </a>
            </div>
            
            <p className="text-pawlingo-muted mb-6 max-w-md">
              Connecting pet owners with their furry companions through advanced AI technology. Understand your pet's emotions, behaviors, and needs like never before.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Github className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-pawlingo-light flex items-center justify-center text-pawlingo-primary hover:bg-pawlingo-primary hover:text-white transition-colors"
                  aria-label={`Social media link ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg mb-4 text-pawlingo-dark">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#" },
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-pawlingo-muted hover:text-pawlingo-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-display text-lg mb-4 text-pawlingo-dark">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Cookie Policy", href: "#" },
                { label: "GDPR Compliance", href: "#" },
                { label: "Pet Data Protection", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-pawlingo-muted hover:text-pawlingo-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4 text-pawlingo-dark">Contact Us</h3>
            <ul className="space-y-4">
              {[
                { icon: <MapPin className="w-5 h-5" />, text: "123 Pet Street, Tech Valley, CA 94103" },
                { icon: <Phone className="w-5 h-5" />, text: "+1 (555) 123-4567" },
                { icon: <Mail className="w-5 h-5" />, text: "support@pawlingo.ai" }
              ].map((contact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pawlingo-light flex items-center justify-center text-pawlingo-primary">
                    {contact.icon}
                  </div>
                  <span className="text-pawlingo-muted">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <hr className="border-pawlingo-light my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-pawlingo-muted text-sm mb-4 md:mb-0">
            &copy; {currentYear} PawLingo AI. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-pawlingo-muted hover:text-pawlingo-primary text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-pawlingo-muted hover:text-pawlingo-primary text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-pawlingo-muted hover:text-pawlingo-primary text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
