
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, AlignJustify, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import useMobile from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface NavItem {
  title: string;
  href: string;
}

const Navbar = () => {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems: NavItem[] = [
    { title: "Home", href: "/" },
    { title: "Features", href: "#features" },
    { title: "How it Works", href: "#how-it-works" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "FAQ", href: "#faq" },
    { title: "AI Assistant", href: "/ai-assistant" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full py-4 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-gradient">PawLingo AI</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignJustify className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-foreground hover:text-primary px-4 py-2 rounded-md transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button className="w-full">Sign Up</Button>
                  <Button variant="outline" className="w-full">Log In</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
