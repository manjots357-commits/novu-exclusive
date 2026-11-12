import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
}) => {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF] focus-visible:outline-offset-4';

  const variantStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] text-[#05040A] font-bold shadow-[0_0_32px_rgba(0,229,255,0.45),0_12px_28px_rgba(0,0,0,0.6)] hover:shadow-[0_0_45px_rgba(0,229,255,0.75),0_0_60px_rgba(255,42,133,0.45)]'
      : 'glass-pod-cyan text-white hover:border-[#00E5FF] hover:bg-white/10 shadow-[0_0_24px_rgba(0,229,255,0.2)] hover:shadow-[0_0_36px_rgba(0,229,255,0.45)]';

  const style: React.CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};
