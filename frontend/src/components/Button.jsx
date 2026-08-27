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
    primary: 'bg-primary text-white hover:opacity-95 shadow-sm',
    secondary: 'bg-white text-primary border border-border-subtle hover:bg-[#ECECFE]/40 shadow-sm',
    ghost: 'bg-transparent text-primary hover:bg-[#ECECFE]/40',
    accent: 'bg-violet text-white hover:opacity-90 shadow-sm',
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
