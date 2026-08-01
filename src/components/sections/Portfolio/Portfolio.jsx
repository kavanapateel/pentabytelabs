import { motion } from 'framer-motion';
import { Container, Section, SectionHeader, Button } from '../../ui';
import { portfolioData } from '../../../data';

export const Portfolio = () => {
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
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const packageDeliverables = [
    { text: '7-Day Guaranteed Turnaround', icon: '⚡' },
    { text: 'Custom UI/UX & Brand System', icon: '🎨' },
    { text: 'Mobile & Tablet Responsive', icon: '📱' },
    { text: 'SEO & Speed Optimization', icon: '🚀' },
    { text: 'Domain & SSL Setup', icon: '🔒' },
    { text: '30-Day Free Post-Launch Support', icon: '🛠️' }
  ];

  return (
    <Section id="portfolio" background="default" className="pt-4 pb-12 md:pt-8 md:pb-16">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            badge={portfolioData.header.badge}
            title={portfolioData.header.title}
            description={portfolioData.header.description}
            align="center"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-8 lg:gap-10 mt-8"
        >
          {/* Featured Flagship Package Card */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Left Side: Package Deliverables Feature Box (Replaces empty image placeholder) */}
            <div className="p-8 lg:p-10 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--border)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  Flagship Offering
                </span>
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-6">
                Package Included Deliverables:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
                {packageDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--background)]/80 border border-[var(--border)] shadow-xs">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs md:text-sm font-semibold text-[var(--foreground)]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Package Details & CTA */}
            <div className="p-8 lg:p-10 xl:p-12 flex flex-col justify-between bg-[var(--card)]">
              <div>
                <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  {portfolioData.featuredProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mb-4 tracking-tight">
                  {portfolioData.featuredProject.title}
                </h3>
                <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-6">
                  {portfolioData.featuredProject.description}
                </p>
                
                {/* Technology Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {portfolioData.featuredProject.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a href="#contact" className="focus:outline-none w-fit mt-2">
                <Button variant="primary" size="large">
                  Inquire About Package
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Secondary Packages Grid (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioData.projects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                className="group flex flex-col bg-[var(--card)] rounded-2xl border border-[var(--border)] p-7 lg:p-8 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-semibold text-[var(--muted-foreground)]">Pre-Packaged</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                {/* Technology Chips */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)]">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors w-fit focus:outline-none"
                >
                  Inquire Package
                  <svg
                    className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
