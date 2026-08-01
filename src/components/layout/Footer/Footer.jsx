import { Container } from '../../ui';
import { footerData } from '../../../data';

export const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-[var(--border)] pt-8 pb-4 md:pt-10 md:pb-5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-8">
          
          {/* Column 1: Company Info */}
          <div className="flex flex-col pr-0 lg:pr-8">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-block text-2xl font-extrabold text-[var(--foreground)] tracking-tighter mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit"
            >
              {footerData.company.logo}
            </a>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">
              {footerData.company.description}
            </p>
            
            <div className="flex flex-col gap-1.5 text-sm">
              <a 
                href={`mailto:${footerData.company.email}`} 
                className="text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit"
              >
                {footerData.company.email}
              </a>
              <a 
                href={`tel:${footerData.company.phone.replace(/[^0-9+]/g, '')}`} 
                className="text-[var(--foreground)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm w-fit"
              >
                {footerData.company.phone}
              </a>
            </div>
          </div>

          {/* Columns 2-4: Links */}
          {footerData.linkGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col">
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item, itemIndex) => (
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
          ))}
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[var(--muted-foreground)] text-xs md:text-sm text-center md:text-left">
            {footerData.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
};
