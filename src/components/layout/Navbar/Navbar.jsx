import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Container, ThemeToggle } from '../../ui';
import { navigationData, companyInfo } from '../../../data';
import logoImg from '../../../assets/pentabyte-logo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);

      if (window.location.hash === '#careers' || window.location.hash === '#/careers') {
        setActiveSection('careers');
        return;
      }

      const sections = ['services', 'team', 'contact'];
      const scrollPos = window.scrollY + 220;

      let current = 'home';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    const handleHash = () => {
      setCurrentHash(window.location.hash);
      if (window.location.hash === '#careers' || window.location.hash === '#/careers') {
        setActiveSection('careers');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHash);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
    };
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

      if (href === '#careers') {
        window.location.hash = 'careers';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (window.location.hash === '#careers') {
          window.location.hash = href === '#' ? '' : href;
          setTimeout(() => {
            if (!targetId || targetId === '') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const element = document.getElementById(targetId);
              if (element) {
                const navHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }
          }, 50);
        } else {
          if (!targetId || targetId === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(targetId);
            if (element) {
              const navHeight = 80;
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - navHeight;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }
        }
      }

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const isCareersPage = currentHash === '#careers' || currentHash === '#/careers';
  const showHeaderContactBtn = isCareersPage || isScrolled;

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-[1100] transition-all duration-300',
        isMobileMenuOpen || isScrolled
          ? 'py-3 md:py-4 bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm dark:shadow-xl dark:shadow-blue-500/10'
          : 'py-4 md:py-5 bg-[var(--background)]/80 backdrop-blur-md border-b border-transparent shadow-none'
      )}
    >
      <Container className="relative flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#', false)}
          className="flex-shrink-0 flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] py-1"
        >
          <img 
            src={logoImg} 
            alt="PentaByte Labs Logo" 
            className="h-10 md:h-11 w-auto object-contain invert dark:invert-0 transition-transform duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navigationData.map((item) => {
            const isActive = 
              item.id === 'careers'
                ? (currentHash === '#careers' || currentHash === '#/careers')
                : item.id === activeSection;

            return item.external ? (
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
                className={clsx(
                  "relative px-4 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none cursor-pointer",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400"
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span 
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact', false)} 
            className={clsx(
              "relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full border border-[var(--border)] text-[var(--foreground)] bg-[var(--background)]/80 hover:bg-[var(--muted)] hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              showHeaderContactBtn
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            )}
          >
            <span>Contact Us</span>
            <svg 
              className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
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
            className="absolute top-full left-0 w-full bg-[var(--background)] border-b border-[var(--border)] shadow-2xl md:hidden overflow-hidden z-[1200]"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigationData.map((item) => {
                const isActive = 
                  item.id === 'careers' 
                    ? (currentHash === '#careers' || currentHash === '#/careers')
                    : item.id === activeSection;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={clsx(
                      "block px-4 py-3 text-base rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] cursor-pointer",
                      item.external 
                        ? "text-blue-600 dark:text-blue-400 font-semibold flex items-center justify-between" 
                        : isActive
                          ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 dark:bg-blue-500/15"
                          : "text-[var(--foreground)] font-medium hover:bg-[var(--muted)]"
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
                );
              })}
              <div className="pt-4 mt-4 border-t border-[var(--border)]">
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, '#contact', false)} 
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-base font-semibold rounded-xl border border-[var(--border)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--muted)] transition-all shadow-sm"
                >
                  <span>Contact Us</span>
                  <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
