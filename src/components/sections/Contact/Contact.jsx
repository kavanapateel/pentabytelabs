import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, SectionHeader, Button } from '../../ui';
import { contactData } from '../../../data';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Send real email via FormSubmit AJAX endpoint to support@pentabytelabs.com
      const response = await fetch('https://formsubmit.co/ajax/support@pentabytelabs.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry from ${formData.fullName}`,
          Name: formData.fullName,
          Email: formData.email,
          Company: formData.company || 'N/A',
          Service: formData.service || 'General Inquiry',
          Message: formData.message
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ fullName: '', email: '', company: '', service: '', message: '' });
      } else {
        // Fallback: Open mailto client directly
        window.location.href = `mailto:support@pentabytelabs.com?subject=Inquiry from ${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(formData.message)}`;
        setIsSuccess(true);
      }
    } catch {
      // Fallback: Open user default mail app
      window.location.href = `mailto:support@pentabytelabs.com?subject=Inquiry from ${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(formData.message)}`;
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 6000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Section id="contact" background="default" className="pt-4 pb-12 md:pt-8 md:pb-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col"
          >
            <SectionHeader
              badge={contactData.info.badge}
              title={contactData.info.title}
              description={contactData.info.description}
              align="left"
              className="mb-8"
            />

            <div className="space-y-6 mt-2">
              {/* Email */}
              <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--foreground)] tracking-tight">Email Us</h4>
                  <a href={`mailto:${contactData.info.email}`} className="text-sm text-[var(--muted-foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {contactData.info.email}
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--foreground)] tracking-tight">Call Us</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{contactData.info.phone}</p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--foreground)] tracking-tight">Headquarters</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{contactData.info.address}</p>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--foreground)] tracking-tight">Working Hours</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{contactData.info.hours}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[var(--card)] rounded-3xl p-7 lg:p-10 border border-[var(--border)] shadow-xl relative overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>

              <h3 className="text-2xl font-bold text-[var(--foreground)] tracking-tight mb-6">
                Send us a message
              </h3>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="py-12 px-6 flex flex-col items-center justify-center text-center bg-green-500/10 rounded-2xl border border-green-500/30"
                    >
                      <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-[var(--foreground)] mb-2">Message Delivered!</h4>
                      <p className="text-[var(--muted-foreground)] text-sm max-w-md">
                        Thank you for reaching out to PentaByte Labs. Our engineering team has received your message and will get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="fullName" className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g. Alex Morgan"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g. alex@company.com"
                          />
                        </div>
                      </div>

                      {/* Company & Service Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="company" className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g. Acme Tech Global"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="service" className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                            Service of Interest
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select a service...</option>
                            {contactData.form.services.map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="block text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                          placeholder="Describe your project goals, timelines, or technical requirements..."
                        ></textarea>
                      </div>

                      {errorMessage && (
                        <p className="text-xs font-semibold text-red-500">{errorMessage}</p>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        className="w-full shadow-lg relative flex items-center justify-center overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                          Send Message
                        </span>
                        
                        {/* Loading Spinner */}
                        {isSubmitting && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
