import { Container } from '../../ui';
import { footerData } from '../../../data';

export const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-[var(--border)] pt-6 pb-3 md:pt-8 md:pb-4">
      <Container>
        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mb-5">
          
          {/* Column 1: Company Info (4 cols) */}
          <div className="md:col-span-4 flex flex-col pr-0 lg:pr-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block text-2xl font-extrabold text-[var(--foreground)] tracking-tighter mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit"
            >
              {footerData.company.logo}
            </a>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-sm">
              {footerData.company.description}
            </p>
          </div>

          {/* Column 2: Company Links (2 cols) */}
          <div className="md:col-span-2 flex flex-col">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-3">
              {footerData.linkGroups[0].title}
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.linkGroups[0].items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.href}
                    className="text-[var(--muted-foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-3">
              {footerData.linkGroups[1].title}
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.linkGroups[1].items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.href}
                    className="text-[var(--muted-foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-3">
              {footerData.linkGroups[2].title}
            </h3>
            <ul className="flex flex-col gap-2">
              {footerData.linkGroups[2].items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.href}
                    className="text-[var(--muted-foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom / Copyright & Right-Corner Contact Bar */}
        <div className="pt-3 md:pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-[var(--muted-foreground)]">
          <p className="text-center sm:text-left">
            {footerData.copyright}
          </p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 font-normal text-[var(--muted-foreground)]">
            <a 
              href={`mailto:${footerData.company.email}`} 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
              {footerData.company.email}
            </a>
            <span className="hidden sm:inline text-[var(--border)]">•</span>
            <a 
              href={`tel:${footerData.company.phone.replace(/[^0-9+]/g, '')}`} 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
              {footerData.company.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
