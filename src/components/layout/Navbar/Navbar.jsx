import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Container, Button, ThemeToggle } from '../../ui';
import { navigationData, companyInfo } from '../../../data';
import logoImg from '../../../assets/pentabyte-logo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler with offset for fixed header
  const handleNavClick = (e, href, external) => {
    if (external) return;

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');

      if (!targetId || targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-[1100] transition-all duration-300',
        isScrolled
          ? 'py-3 md:py-4 glass border-b border-[var(--border)] shadow-sm'
          : 'py-4 md:py-5 bg-transparent border-transparent'
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#', false)}
          className="flex-shrink-0 flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg"
        >
          <img 
            src={logoImg} 
            alt="PentaByte Labs Logo" 
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="font-bold text-xl tracking-tight text-[var(--foreground)] hidden sm:inline-block">
            {companyInfo.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {navigationData.map((item) => (
            item.external ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 text-sm font-semibold rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] flex items-center gap-1.5"
              >
                <span>{item.label}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ) : (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, false)}
                className="relative px-4 py-2 text-sm font-medium rounded-md text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact', false)} className="focus:outline-none">
            <Button variant="primary" size="small" className="shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer font-semibold px-5">
              Contact Us
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 -mr-2 text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full glass bg-[var(--background)]/95 border-b border-[var(--border)] shadow-xl md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigationData.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={clsx(
                    "block px-4 py-3 text-base font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer",
                    item.external 
                      ? "text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-between" 
                      : "text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--primary)]"
                  )}
                  onClick={(e) => handleNavClick(e, item.href, item.external)}
                >
                  <span>{item.label}</span>
                  {item.external && (
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  )}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-[var(--border)]">
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, '#contact', false)} 
                  className="block w-full focus:outline-none"
                >
                  <Button variant="primary" size="medium" className="w-full shadow-md cursor-pointer">
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
