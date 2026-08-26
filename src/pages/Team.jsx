import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '../components/ui';
import { Team as TeamSection, FinalCta } from '../components/sections';
import { teamData } from '../data';
import hrithvikImg from '../assets/Hrithvik.jpg';
import roshanImg from '../assets/Roshan K.jpg';
import prajwalImg from '../assets/Prajwal.jpg';

const memberPhotos = {
  hrithvik: hrithvikImg,
  roshan: roshanImg,
  prajwal: prajwalImg
};

export const Team = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Team Hero Section (Matching Careers.jsx Hero Styling & Padding) */}
      <Section id="team-hero" background="default" className="pt-4 pb-10 md:pt-6 md:pb-14 text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
              PentaByte Leadership
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Meet Our Visionaries & Engineering Leaders
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto font-normal">
              We are a dedicated team of passionate software architects, data engineers, and strategic visionaries committed to delivering enterprise-scale technology solutions.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Team Grid Section */}
      <Section id="team-grid" background="muted" className="py-12 md:py-16">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {teamData.members.map((member) => {
              const photo = memberPhotos[member.id];

              return (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  className="group flex flex-col bg-[var(--background)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-[var(--border)]"
                >
                  {/* Headshot image container */}
                  <div className="relative h-72 md:h-80 w-full bg-[var(--muted)] overflow-hidden">
                    {photo ? (
                      <img 
                        src={photo} 
                        alt={`Headshot of ${member.name}`} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--muted-foreground)]">
                        <span className="text-xs font-semibold uppercase opacity-50">Headshot</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {member.linkedin && (
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-1 tracking-tight">
                      {member.name}
                    </h3>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                      {member.role}
                    </span>
                    <p className="text-[var(--muted-foreground)] leading-relaxed flex-grow text-sm md:text-base">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Final Call to Action Banner */}
      <FinalCta />
    </div>
  );
};
