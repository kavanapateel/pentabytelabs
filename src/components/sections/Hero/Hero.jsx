import { motion } from 'framer-motion';
import { Container, Button, Section } from '../../ui';
import { heroData } from '../../../data';
import heroImg from '../../../assets/hero.png';

export const Hero = () => {
  // Staggered animation variants
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

  const headingWords = heroData.heading.split(' ');
  const hasMultipleWords = headingWords.length > 2;
  const firstPart = hasMultipleWords ? headingWords.slice(0, -3).join(' ') : heroData.heading;
  const lastPart = hasMultipleWords ? headingWords.slice(-3).join(' ') : '';

  return (
    <Section id="hero" className="relative pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[var(--background)]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20 dark:opacity-10 blur-3xl z-0">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" />
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-zinc-100 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 ring-1 ring-inset ring-zinc-500/20 shadow-sm backdrop-blur-md transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
                <span className="flex w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
                {heroData.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mb-6 leading-[1.15]"
            >
              {firstPart}{' '}
              {lastPart && (
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pb-2 mt-1">
                  {lastPart}
                </span>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--muted-foreground)] mb-10 max-w-2xl leading-relaxed font-light"
            >
              {heroData.description}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
            >
              <a href={heroData.primaryCta.href} className="focus:outline-none w-full sm:w-auto">
                <Button size="large" variant="primary" className="shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 px-8 cursor-pointer w-full font-semibold">
                  {heroData.primaryCta.label}
                </Button>
              </a>
              <a href={heroData.secondaryCta.href} className="focus:outline-none w-full sm:w-auto">
                <Button size="large" variant="ghost" className="shadow-sm hover:-translate-y-0.5 border border-[var(--border)] bg-[var(--background)] px-8 cursor-pointer w-full font-semibold">
                  {heroData.secondaryCta.label}
                </Button>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-[var(--muted-foreground)] font-medium tracking-wide"
            >
              {heroData.trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {indicator}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Graphic Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-auto max-h-[550px] rounded-3xl overflow-hidden relative group flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/50 bg-[var(--background)] shadow-xl p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-50 to-white dark:from-zinc-900/80 dark:to-zinc-800/80 opacity-90 transition-opacity group-hover:opacity-100 backdrop-blur-xl"></div>
            
            <img 
              src={heroImg} 
              alt="PentaByte Labs Technology Architecture" 
              className="relative z-10 w-full h-full object-contain max-h-[480px] drop-shadow-md group-hover:scale-102 transition-transform duration-700" 
            />

            {/* Decorative grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
};
