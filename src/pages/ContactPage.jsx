import { useEffect } from 'react';
import { Contact } from '../components/sections';

export const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Main Contact Component */}
      <Contact />
    </div>
  );
};
