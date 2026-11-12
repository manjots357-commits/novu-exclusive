import React, { useRef, useState } from 'react';
import { Sparkles, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ServicePod } from '../data/studioData';

interface ServicePodCardProps {
  pod: ServicePod;
  index: number;
  onSelectService: (serviceTitle: string) => void;
}

export const ServicePodCard: React.FC<ServicePodCardProps> = ({
  pod,
  index,
  onSelectService,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, elevate: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, elevate: -14, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, elevate: 0, glowX: 50, glowY: 50 });
  };

  const podGlassClass =
    pod.accent === 'cyan'
      ? 'glass-pod-cyan hover:border-[#00E5FF]'
      : pod.accent === 'magenta'
      ? 'glass-pod-magenta hover:border-[#FF2A85]'
      : pod.accent === 'gold'
      ? 'glass-pod-gold hover:border-[#F5D08A]'
      : 'glass-pod-tri hover:border-[#00E5FF]';

  const badgeStyles =
    pod.accent === 'cyan'
      ? 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/40'
      : pod.accent === 'magenta'
      ? 'bg-[#FF2A85]/15 text-[#FF9EC7] border-[#FF2A85]/40'
      : 'bg-[#F5D08A]/15 text-[#F5D08A] border-[#F5D08A]/40';

  const shadowHue =
    pod.accent === 'cyan'
      ? 'rgba(0, 229, 255, 0.28)'
      : pod.accent === 'magenta'
      ? 'rgba(255, 42, 133, 0.28)'
      : 'rgba(245, 208, 138, 0.28)';

  return (
    <div
      className={`relative group ${pod.levitateClass} pause-float-on-hover`}
      style={{ animationDelay: `${index * 0.45}s`, perspective: '1100px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(0, ${tilt.elevate}px, 0) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition:
            tilt.elevate === 0
              ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease'
              : 'transform 0.12s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`relative h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden ${podGlassClass}`}
      >
        {/* Dynamic interactive specular spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(380px circle at ${tilt.glowX}% ${tilt.glowY}%, ${shadowHue}, transparent 65%)`,
          }}
        />

        <div>
          {/* Top Pod Bar: Badge & Price/Duration Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border ${badgeStyles}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {pod.badge}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-[#F5D08A] shadow-inner">
              <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
              {pod.priceDuration}
            </span>
          </div>

          {/* Service Pod Title */}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-[#00E5FF] transition-colors">
            {pod.title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-6">
            {pod.description}
          </p>

          {/* Architectural Highlights */}
          <ul className="space-y-2.5 mb-7 border-t border-white/10 pt-5">
            {pod.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200/90"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Action Bar */}
        <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/10">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
              VIP Sanctuary Tariff
            </span>
            <span className="text-lg font-bold text-white">{pod.priceDuration}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelectService(`${pod.title} (${pod.priceDuration})`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white/10 hover:bg-[#00E5FF] text-white hover:text-[#05040A] font-semibold text-xs sm:text-sm border border-white/20 hover:border-[#00E5FF] transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:shadow-[0_0_28px_rgba(0,229,255,0.6)]"
          >
            <span>Book Pod</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mid-Air Levitation Floor Shadow underneath the Pod */}
      <div
        aria-hidden="true"
        className="mx-auto mt-3 h-3.5 w-4/5 rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:scale-75 group-hover:opacity-60 levitate-shadow"
        style={{
          background: `radial-gradient(ellipse at center, ${shadowHue} 0%, rgba(0,0,0,0.85) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
};
