import clsx from 'clsx';

export const Button = ({
  children,
  onClick,
  disabled = false,
  className,
  type = 'button',
  variant = 'primary',
  size = 'large',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-tight';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/20 shadow-sm shadow-blue-500/15 hover:shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 focus:ring-blue-500',
    secondary: 'bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/20 shadow-sm shadow-purple-500/15 hover:shadow-md hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 focus:ring-purple-500',
    ghost: 'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--muted)] focus:ring-zinc-500',
  };

  const sizes = {
    small: 'px-4 py-2 text-xs',
    medium: 'px-6 py-2.5 text-sm',
    large: 'px-7 py-3 text-sm md:text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
