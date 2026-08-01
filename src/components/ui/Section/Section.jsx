import clsx from 'clsx';

export const Section = ({
  id,
  children,
  className,
  background = 'default',
  ...props
}) => {
  const backgrounds = {
    default: 'bg-[var(--background)]',
    muted: 'bg-[var(--muted)]',
    dark: 'bg-[var(--foreground)] text-[var(--background)]',
  };

  return (
    <section
      id={id}
      className={clsx('py-8 md:py-12 lg:py-14', backgrounds[background], className)}
      {...props}
    >
      {children}
    </section>
  );
};
