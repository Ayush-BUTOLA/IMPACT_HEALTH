export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold text-sm transition-all duration-150 rounded-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary select-none';

  const variants = {
    primary: 'bg-primary text-on-primary hover:opacity-90 active:opacity-95',
    secondary: 'bg-white text-primary border border-border-subtle hover:bg-[#ECECFE]/30 active:bg-[#ECECFE]/50',
    ghost: 'bg-transparent text-primary hover:bg-[#ECECFE]/30',
    accent: 'bg-surface-tint text-white hover:opacity-90',
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
