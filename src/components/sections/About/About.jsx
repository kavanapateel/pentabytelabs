import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container, Section, SectionHeader, Button } from '../../ui';
import { aboutData } from '../../../data';

const AnimatedCounter = ({ text }) => {
  const [displayValue, setDisplayValue] = useState('1');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    if (text === '24/7') {
      let count = 1;
      const duration = 1400;
      const steps = 24;
      const intervalTime = duration / steps;
      const timer = setInterval(() => {
        count += 1;
        if (count >= 24) {
          setDisplayValue('24/7');
          clearInterval(timer);
        } else {
          setDisplayValue(`${count}/7`);
        }
      }, intervalTime);
      return () => clearInterval(timer);
    }

    const match = text.match(/([0-9.]+)(.*)/);
    if (!match) {
      setDisplayValue(text);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || '';
    const hasDecimals = match[1].includes('.');

    let start = 1;
    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = start + (targetNum - start) * easeOutProgress;

      if (hasDecimals) {
        setDisplayValue(`${currentNum.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${Math.floor(currentNum)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(text);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, text]);

  return <span ref={ref}>{displayValue}</span>;
};

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const pillars = [
    {
      id: 'engineering',
      title: 'On-Demand Tech Squads',
      description: 'Deploy senior full-stack, mobile & AI engineers on demand with zero onboarding delay.',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      description: 'Production-grade AI models, predictive analytics, and automated workflow pipelines.',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      )
    },
    {
      id: 'cloud',
      title: 'Cloud & Quality DevOps',
      description: 'Scalable AWS/GCP cloud architectures with 99.9% uptime and zero-trust security.',
      icon: (
        <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    },
    {
      id: 'delivery',
      title: 'Accelerated Delivery',
      description: 'Rapid MVP prototyping, weekly sprint cycles, and production-ready deployments.',
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    }
  ];

  return (
    <Section id="about" background="default" className="py-12 md:py-16">
      <Container>
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            badge={aboutData.header.badge}
            title={aboutData.header.title}
            description={aboutData.header.description}
            align="center"
          />
        </motion.div>

        {/* Company Overview Story Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-base md:text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {aboutData.content.story}
        </motion.p>

        {/* 4 Value Pillars Grid (Symmetrical 4-Column Layout on Desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.25 } }}
              className="group p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-blue-500 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision Dual Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10"
        >
          <div className="bg-[var(--card)] p-6 lg:p-7 rounded-2xl border border-[var(--border)] shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
              {aboutData.content.mission.title}
            </h3>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
              {aboutData.content.mission.description}
            </p>
          </div>

          <div className="bg-[var(--card)] p-6 lg:p-7 rounded-2xl border border-[var(--border)] shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm" />
              {aboutData.content.vision.title}
            </h3>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
              {aboutData.content.vision.description}
            </p>
          </div>
        </motion.div>

        {/* Stats Strip & Action CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-8 pt-6 border-t border-[var(--border)]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16 text-center">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mb-1">
                  <AnimatedCounter text={stat.value} />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[var(--muted-foreground)] tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href={aboutData.cta.href} className="focus:outline-none mt-2">
            <Button variant="primary" size="large">
              {aboutData.cta.label}
            </Button>
          </a>
        </motion.div>
      </Container>
    </Section>
  );
};
