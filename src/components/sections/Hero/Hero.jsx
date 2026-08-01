import { motion } from 'framer-motion';
import { Container, Button, Section } from '../../ui';
import { heroData } from '../../../data';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Section id="hero" className="relative pt-20 pb-8 md:pt-24 lg:pt-28 md:pb-12 lg:pb-14 overflow-hidden bg-[var(--background)]">
      {/* Dynamic Ambient Glow Background */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] pointer-events-none z-0 opacity-70 dark:opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1) 45%, transparent 75%)'
        }}
      />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          {/* Centered Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mb-8 leading-[1.15]"
          >
            Building the Scalable, Intelligent Software That{' '}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 drop-shadow-sm">
              Powers Your Business
            </span>
          </motion.h1>

          {/* Centered Description Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--muted-foreground)] mb-10 max-w-3xl leading-relaxed font-normal"
          >
            {heroData.description}
          </motion.p>

          {/* Centered Primary CTA Button */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 w-full sm:w-auto"
          >
            <a href="#contact" className="focus:outline-none w-full sm:w-auto">
              <Button size="large" variant="primary">
                Schedule a Consultation
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};
