export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold text-sm transition-all duration-200 rounded-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet select-none whitespace-nowrap active:scale-[0.98]';

  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-deep shadow-sm',
    secondary: 'bg-white text-navy border border-[#e6e7f2] hover:bg-slate-50 shadow-sm',
    ghost: 'bg-transparent text-navy hover:bg-violet-soft/50',
    accent: 'bg-violet text-white hover:bg-violet/90 shadow-sm',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
