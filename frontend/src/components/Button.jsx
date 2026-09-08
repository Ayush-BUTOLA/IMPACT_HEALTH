export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold text-sm transition-all duration-200 rounded-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet select-none whitespace-nowrap active:scale-[0.98]';

  const hasBg = /\bbg-/.test(className);
  const hasText = /\btext-/.test(className);

  const defaultBg = {
    primary: 'bg-primary',
    secondary: 'bg-white',
    ghost: 'bg-transparent',
    accent: 'bg-violet',
  }[variant] || 'bg-primary';

  const defaultText = {
    primary: 'text-white',
    secondary: 'text-primary',
    ghost: 'text-primary',
    accent: 'text-white',
  }[variant] || 'text-white';

  const otherStyles = {
    primary: 'hover:opacity-95 shadow-sm',
    secondary: 'border border-border-subtle hover:bg-[#ECECFE]/40 shadow-sm',
    ghost: 'hover:bg-[#ECECFE]/40',
    accent: 'hover:opacity-90 shadow-sm',
  }[variant] || 'hover:opacity-95 shadow-sm';

  const combinedClass = [
    baseStyles,
    hasBg ? '' : defaultBg,
    hasText ? '' : defaultText,
    otherStyles,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
