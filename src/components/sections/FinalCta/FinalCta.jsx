import { motion } from 'framer-motion';
import { Container, Section, Button } from '../../ui';
import { finalCtaData } from '../../../data';

export const FinalCta = () => {
  return (
    <Section id="final-cta" className="relative overflow-hidden py-16 md:py-24">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-zinc-900 dark:from-blue-950 dark:via-purple-950 dark:to-zinc-950 z-0"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold tracking-wide uppercase mb-8 backdrop-blur-md">
            {finalCtaData.badge}
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            {finalCtaData.title}
          </h2>
          
          <p className="text-lg md:text-xl text-blue-100/80 mb-12 leading-relaxed max-w-2xl font-light">
            {finalCtaData.description}
          </p>
          
          <a href={finalCtaData.button.href} className="focus:outline-none">
            <Button variant="primary" size="large">
              {finalCtaData.button.label}
            </Button>
          </a>
        </motion.div>
      </Container>
    </Section>
  );
};
