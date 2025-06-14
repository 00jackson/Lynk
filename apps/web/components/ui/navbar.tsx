'use client';

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FiGithub, FiSun, FiMenu } from "react-icons/fi";
import { IoMoon } from "react-icons/io5"; 
import { FaDiscord } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Set up intersection observer to track active section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    // Set up scroll progress tracker
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const progress = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      sectionObserver.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-10">
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-md"
            >
              <span className="text-xl font-bold text-white">L</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-500">
              Lynk
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              isActive={activeSection === 'Features'}
              onClick={() => scrollToSection('Features')}
            >
              Features
            </NavLink>
            <NavLink 
              isActive={activeSection === 'Pricing'}
              onClick={() => scrollToSection('Pricing')}
            >
              Pricing
            </NavLink>
            <NavLink 
              isActive={activeSection === 'Community'}
              onClick={() => scrollToSection('Community')}
            >
              Community
            </NavLink>
            <NavLink 
              isActive={activeSection === 'faq'}
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a 
              href="https://discord.gg/your-invite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              aria-label="Discord"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-300" />
              ) : (
                <IoMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          )}

          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-600 rounded-lg hover:from-blue-600 hover:to-violet-700 shadow-md transition-all"
              >
                Sign In
              </motion.button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <motion.div whileHover={{ scale: 1.05 }}>
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                  userButtonPopoverCard: "shadow-lg rounded-xl border border-gray-100 dark:border-gray-700 dark:bg-gray-800",
                }
              }} />
            </motion.div>
          </SignedIn>

          <button 
            className="md:hidden p-2 text-gray-500 dark:text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              <MobileNavLink onClick={() => scrollToSection('features')}>Features</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('pricing')}>Pricing</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('community')}>Community</MobileNavLink>
              <MobileNavLink onClick={() => scrollToSection('docs')}>Docs</MobileNavLink>
              <div className="flex items-center gap-4 pt-4">
                <a 
                  href="https://github.com/your-repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a 
                  href="https://discord.gg/your-invite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  aria-label="Discord"
                >
                  <FaDiscord className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-gray-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-violet-600"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavLink = ({ children, isActive, onClick }: NavLinkProps) => (
  <button 
    onClick={onClick}
    className="relative group"
  >
    <span className={`text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium ${
      isActive ? 'text-violet-600 dark:text-violet-400' : ''
    }`}>
      {children}
    </span>
    <span className={`absolute -bottom-1 left-0 h-0.5 bg-violet-600 dark:bg-violet-400 transition-all ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`} />
  </button>
);

interface MobileNavLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink = ({ children, onClick }: MobileNavLinkProps) => (
  <button 
    onClick={onClick}
    className="py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-left"
  >
    {children}
  </button>
);