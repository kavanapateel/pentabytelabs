import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, SectionHeader, Button } from '../components/ui';
import { careersData } from '../data';

export const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({
    fullName: '',
    email: '',
    portfolio: '',
    experience: '',
    message: ''
  });

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsSubmitted(false);
    setApplicant({ fullName: '', email: '', portfolio: '', experience: '', message: '' });
  };

  const handleApplicantSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Real form submission via FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/careers@pentabytelabs.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Job Application: ${selectedJob.title} - ${applicant.fullName}`,
          Position: selectedJob.title,
          Name: applicant.fullName,
          Email: applicant.email,
          Portfolio: applicant.portfolio || 'N/A',
          Experience: applicant.experience || 'N/A',
          Message: applicant.message
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        window.location.href = `mailto:careers@pentabytelabs.com?subject=Application for ${encodeURIComponent(selectedJob.title)}&body=${encodeURIComponent(applicant.message)}`;
        setIsSubmitted(true);
      }
    } catch {
      window.location.href = `mailto:careers@pentabytelabs.com?subject=Application for ${encodeURIComponent(selectedJob.title)}&body=${encodeURIComponent(applicant.message)}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 md:pt-20 pb-12 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Careers Hero Section */}
      <Section id="careers-hero" background="default" className="pt-4 pb-10 md:pt-6 md:pb-14 text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
              {careersData.hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              {careersData.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto font-normal">
              {careersData.hero.description}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Current Openings Section */}
      <Section id="openings" background="muted" className="pt-4 pb-12 md:pt-8 md:pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Current Openings
            </h2>
            <p className="text-[var(--muted-foreground)] text-base md:text-lg">
              Explore open roles across engineering, AI automation, and business growth.
            </p>
          </motion.div>

          <div className="space-y-6">
            {careersData.openings.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="group bg-[var(--card)] rounded-2xl p-7 lg:p-8 border border-[var(--border)] shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
                      {job.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 group-hover:text-blue-500 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed mb-5 max-w-3xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 md:self-center">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blogs & Engineering Articles Section */}
      <Section id="blogs" background="default" className="pt-4 pb-12 md:pt-8 md:pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-left"
          >
            <SectionHeader
              badge="ENGINEERING BLOGS"
              title="Latest Articles & Insights"
              description="Read how we design, build, and deploy production software for modern businesses."
              align="left"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {careersData.blogs.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="group bg-[var(--card)] rounded-2xl p-7 border border-[var(--border)] shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted-foreground)] mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 leading-snug group-hover:text-blue-500 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs text-[var(--muted-foreground)]">{article.date}</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 transition-colors"
                  >
                    Read Insight
                    <svg className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 lg:p-9 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus:outline-none"
              >
                ✕
              </button>

              {isSubmitted ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Application Received!</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
                    Thank you for applying for the <strong>{selectedJob.title}</strong> role at PentaByte Labs. Our team will review your application and respond shortly.
                  </p>
                  <Button variant="primary" size="medium" onClick={handleCloseModal}>
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApplicantSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                      Applying For Position
                    </span>
                    <h3 className="text-xl font-extrabold text-[var(--foreground)] tracking-tight">
                      {selectedJob.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicant.fullName}
                      onChange={(e) => setApplicant(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicant.email}
                      onChange={(e) => setApplicant(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. alex@company.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                      LinkedIn or Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={applicant.portfolio}
                      onChange={(e) => setApplicant(prev => ({ ...prev, portfolio: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                      Cover Note / Relevant Background *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={applicant.message}
                      onChange={(e) => setApplicant(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      placeholder="Briefly describe your experience and why you'd be a great fit..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
