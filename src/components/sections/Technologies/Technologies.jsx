import { motion } from 'framer-motion';
import { Container, Section, SectionHeader } from '../../ui';
import { technologiesData } from '../../../data';

export const Technologies = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Custom logo avatar component for technologies
  const TechLogo = ({ name }) => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-cyan-500 to-blue-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-violet-500 to-purple-600'
    ];
    const index = name.length % gradients.length;
    const bgGradient = gradients[index];

    return (
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bgGradient} text-white font-bold text-base flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
        {name.charAt(0)}
      </div>
    );
  };

  return (
    <Section id="technologies" background="default" className="pt-4 pb-12 md:pt-8 md:pb-16">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            badge={technologiesData.header.badge}
            title={technologiesData.header.title}
            description={technologiesData.header.description}
            align="center"
          />
        </motion.div>

        {/* Categories Grid (3 Columns on Desktop: 3 Symmetrical Stack Cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8"
        >
          {technologiesData.categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              className="group bg-[var(--card)] rounded-2xl p-7 lg:p-8 border border-[var(--border)] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-[var(--foreground)] tracking-tight group-hover:text-blue-500 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Technologies List */}
              <ul className="space-y-4 relative z-10">
                {category.items.map((tech) => (
                  <li 
                    key={tech.id} 
                    className="group/item flex items-start gap-3.5 p-3 -mx-3 rounded-xl hover:bg-[var(--muted)] transition-colors duration-200 cursor-default"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <TechLogo name={tech.name} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[var(--foreground)] group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-xs md:text-sm text-[var(--muted-foreground)] mt-0.5">
                        {tech.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};
