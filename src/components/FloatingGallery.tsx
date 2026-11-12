import React, { useState } from 'react';
import { Sparkles, Eye, Wand2 } from 'lucide-react';
import { GALLERY_FRAMES, GalleryFrame } from '../data/studioData';

interface FloatingGalleryProps {
  onSelectLook: (lookTitle: string) => void;
}

export const FloatingGallery: React.FC<FloatingGalleryProps> = ({ onSelectLook }) => {
  const [activeFrame, setActiveFrame] = useState<GalleryFrame | null>(null);

  const getFrameAccentClasses = (accent: GalleryFrame['accent']) => {
    if (accent === 'cyan') {
      return {
        pod: 'glass-pod-cyan',
        hoverGlow:
          'hover:border-[#00E5FF] hover:shadow-[0_0_42px_rgba(0,229,255,0.65),0_25px_55px_rgba(0,0,0,0.95)]',
        badge: 'text-[#00E5FF] bg-[#00E5FF]/15 border-[#00E5FF]/40',
        neonCorner: 'border-[#00E5FF]',
        floorShadow: 'rgba(0, 229, 255, 0.32)',
      };
    }
    if (accent === 'magenta') {
      return {
        pod: 'glass-pod-magenta',
        hoverGlow:
          'hover:border-[#FF2A85] hover:shadow-[0_0_42px_rgba(255,42,133,0.65),0_25px_55px_rgba(0,0,0,0.95)]',
        badge: 'text-[#FF9EC7] bg-[#FF2A85]/15 border-[#FF2A85]/40',
        neonCorner: 'border-[#FF2A85]',
        floorShadow: 'rgba(255, 42, 133, 0.32)',
      };
    }
    return {
      pod: 'glass-pod-gold',
      hoverGlow:
        'hover:border-[#F5D08A] hover:shadow-[0_0_42px_rgba(245,208,138,0.65),0_25px_55px_rgba(0,0,0,0.95)]',
      badge: 'text-[#F5D08A] bg-[#F5D08A]/15 border-[#F5D08A]/40',
      neonCorner: 'border-[#F5D08A]',
      floorShadow: 'rgba(245, 208, 138, 0.32)',
    };
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pod-magenta text-xs font-mono uppercase tracking-[0.22em] text-[#FF9EC7] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>8 Weightless Couture Frames • Hover to Elevate in Z-Space</span>
        </div>
        <h2
          id="gallery-heading"
          className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5"
        >
          ANTI-GRAVITY{' '}
          <span className="bg-gradient-to-r from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] bg-clip-text text-transparent">
            FLOATING GALLERY
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Each set at NÒVU EXCLUSIVE is sculpted like weightless wearable jewelry. Hover or tap any
          levitating frame to pause its orbit, bring it forward in 3D space, and illuminate its neon
          chassis.
        </p>
      </div>

      {/* 8 Staggered Floating Frames Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start"
        style={{ perspective: '1600px' }}
      >
        {GALLERY_FRAMES.map((frame, index) => {
          const styles = getFrameAccentClasses(frame.accent);
          return (
            <div
              key={frame.id}
              className={`${frame.staggerClass} flex flex-col`}
            >
              <article
                tabIndex={0}
                style={{ animationDelay: `${index * 0.35}s` }}
                className={`group relative rounded-3xl overflow-hidden ${styles.pod} ${styles.hoverGlow} ${frame.levitateClass} pause-float-on-hover gallery-frame-3d focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF]`}
              >
                {/* Illuminated Neon Corner Brackets on Hover */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-lg ${styles.neonCorner} opacity-40 group-hover:opacity-100 transition-opacity z-20`}
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr-lg ${styles.neonCorner} opacity-40 group-hover:opacity-100 transition-opacity z-20`}
                />

                {/* Visual Artwork Showcase Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#090514]">
                  {/* Procedural Iridescent Luxury Nail Capsule Backdrop (always visible behind/under photo) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, ${frame.palette[0]}44 0%, transparent 55%), radial-gradient(circle at 75% 75%, ${frame.palette[2]}33 0%, ${frame.palette[1]} 85%)`,
                    }}
                  />

                  <img
                    src={frame.imageUrl}
                    alt={`${frame.title} — ${frame.subtitle} by NÒVU EXCLUSIVE Glasgow`}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />

                  {/* Cosmic Glass Gradient Overlay */}
                  <div
                    aria-hidden="true"
                    className="z-10 absolute inset-0 bg-gradient-to-t from-[#06040D] via-[#06040D]/35 to-transparent"
                  />

                  {/* Frame Number & Technique Tag */}
                  <div className="z-20 absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 font-mono text-[11px] text-white/90">
                      0{index + 1} // ZERO-G
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full backdrop-blur-md border font-mono text-[11px] ${styles.badge}`}
                    >
                      {frame.duration}
                    </span>
                  </div>

                  {/* Quick Inspect Overlay Button */}
                  <button
                    type="button"
                    onClick={() => setActiveFrame(frame)}
                    aria-label={`Inspect ${frame.title}`}
                    className="z-20 absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-[#00E5FF] text-white hover:text-[#05040A] text-xs font-medium border border-white/20 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect 3D</span>
                  </button>
                </div>

                {/* Card Copy & Request Look Button */}
                <div className="p-5 sm:p-6 relative z-20">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#00E5FF] mb-1">
                    {frame.technique}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white mb-1.5 group-hover:text-[#F5D08A] transition-colors">
                    {frame.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-4">
                    {frame.subtitle}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectLook(frame.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 min-h-[42px] rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#00E5FF]/60 text-xs font-semibold tracking-wide text-white transition-all"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-[#F5D08A]" />
                    <span>Request This Look</span>
                  </button>
                </div>
              </article>

              {/* Soft Levitation Floor Shadow under each Frame */}
              <div
                aria-hidden="true"
                className="mx-auto mt-3 h-3 w-3/4 rounded-full blur-lg pointer-events-none levitate-shadow"
                style={{
                  background: `radial-gradient(ellipse at center, ${styles.floorShadow} 0%, transparent 75%)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal when user clicks "Inspect 3D" on a gallery frame */}
      {activeFrame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-frame-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          onClick={() => setActiveFrame(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl overflow-hidden glass-pod-tri p-6 sm:p-8 border border-[#00E5FF]/60 shadow-[0_0_60px_rgba(0,229,255,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden mb-6 border border-white/15">
              <img
                src={activeFrame.imageUrl}
                alt={activeFrame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 border border-white/20 text-xs font-mono text-[#00E5FF]">
                {activeFrame.technique}
              </div>
            </div>
            <h3
              id="modal-frame-title"
              className="font-display text-2xl font-bold text-white mb-2"
            >
              {activeFrame.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              {activeFrame.subtitle} — Custom sculpted at NÒVU EXCLUSIVE, Suite 115, 11 Bothwell St,
              Glasgow. Estimated studio time: {activeFrame.duration}.
            </p>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveFrame(null)}
                className="px-5 py-2.5 min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = activeFrame.title;
                  setActiveFrame(null);
                  onSelectLook(title);
                }}
                className="px-6 py-2.5 min-h-[44px] rounded-full bg-gradient-to-r from-[#00E5FF] to-[#F5D08A] text-[#05040A] font-bold text-sm"
              >
                Book This Exact Design
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
