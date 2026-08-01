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
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-blue-600 text-white shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 focus:ring-blue-500',
    secondary: 'bg-purple-600 text-white shadow-md shadow-purple-500/15 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 focus:ring-purple-500',
    ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] focus:ring-zinc-500',
  };

  const sizes = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-9 py-3.5 text-base',
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
