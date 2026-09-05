import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  withArrow = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}, ref) {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-sans font-bold tracking-[0.01em] transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#003087] select-none whitespace-nowrap active:scale-[0.98] active:translate-y-px disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed rounded-[6px]';

  const sizes = {
    sm:  'text-xs px-4 py-2 gap-1.5',
    md:  'text-sm px-6 py-2.5 gap-2',
    lg:  'text-base px-8 py-3.5 gap-2.5',
  };

  const variants = {
    primary:
      'bg-[#003087] text-white hover:bg-[#0A4299] shadow-[0_2px_12px_rgba(0,48,135,0.25)] hover:shadow-[0_6px_20px_rgba(0,48,135,0.35)]',
    royal:
      'bg-[#0066FF] text-white hover:bg-[#0052CC] shadow-[0_2px_12px_rgba(0,102,255,0.25)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.35)]',
    accent:
      'bg-[#0066FF] text-white hover:bg-[#0052CC] shadow-[0_2px_12px_rgba(0,102,255,0.25)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.35)]',
    danger:
      'bg-[#CC2229] text-white hover:bg-[#A81920] shadow-[0_2px_12px_rgba(204,34,41,0.25)] hover:shadow-[0_6px_20px_rgba(204,34,41,0.35)]',
    emerald:
      'bg-[#059669] text-white hover:bg-[#047857] shadow-[0_2px_10px_rgba(5,150,105,0.2)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.3)]',
    teal:
      'bg-[#008C7A] text-white hover:bg-[#006B5C] shadow-[0_2px_10px_rgba(0,140,122,0.2)] hover:shadow-[0_6px_20px_rgba(0,140,122,0.3)]',
    secondary:
      'bg-white text-[#003087] border-2 border-[#003087] hover:bg-[#EBF2FF] shadow-[0_1px_4px_rgba(0,48,135,0.08)]',
    ghost:
      'bg-transparent text-[#003087] hover:bg-[#EBF2FF] border border-transparent hover:border-[#003087]/20',
    white:
      'bg-white text-[#003087] hover:bg-slate-50 shadow-[0_2px_12px_rgba(0,0,0,0.1)]',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {withArrow && (
        <span className="w-5 h-5 -mr-0.5 rounded-sm bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
});

export default Button;

