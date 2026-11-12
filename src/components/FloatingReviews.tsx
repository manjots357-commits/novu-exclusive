import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { CLIENT_REVIEWS, STUDIO_INFO } from '../data/studioData';

export const FloatingReviews: React.FC = () => {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pod-gold text-xs font-mono uppercase tracking-[0.2em] text-[#F5D08A] mb-5">
          <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
          <span>{STUDIO_INFO.trustBadge}</span>
        </div>
        <h2
          id="reviews-heading"
          className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5"
        >
          ORBITING{' '}
          <span className="bg-gradient-to-r from-[#F5D08A] via-[#00E5FF] to-[#FF2A85] bg-clip-text text-transparent">
            CLIENT PRAISE
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Rated a flawless <strong className="text-[#F5D08A]">5.0 Stars across 51+ verified Google reviews</strong> in
          Glasgow. Every card below is tagged as{' '}
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-[#00E5FF] border border-[#00E5FF]/30">
            Sample Review Copy
          </span>{' '}
          for effortless custom curation.
        </p>
      </div>

      {/* 6 Floating Glass Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
        {CLIENT_REVIEWS.map((review, idx) => {
          const cardClass =
            review.accent === 'cyan'
              ? 'glass-pod-cyan'
              : review.accent === 'magenta'
              ? 'glass-pod-magenta'
              : 'glass-pod-gold';

          const shadowHue =
            review.accent === 'cyan'
              ? 'rgba(0, 229, 255, 0.25)'
              : review.accent === 'magenta'
              ? 'rgba(255, 42, 133, 0.25)'
              : 'rgba(245, 208, 138, 0.25)';

          return (
            <div
              key={review.id}
              style={{ animationDelay: `${idx * 0.4}s` }}
              className={`flex flex-col justify-between ${review.levitateClass} pause-float-on-hover`}
            >
              <article
                className={`relative h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 ${cardClass}`}
              >
                <div>
                  {/* Top Bar: 5.0 Stars + Explicit Sample Review Copy Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <div
                      className="flex items-center gap-1 text-[#F5D08A]"
                      aria-label="5.0 out of 5 stars"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#F5D08A] text-[#F5D08A] drop-shadow-[0_0_6px_rgba(245,208,138,0.6)]"
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-bold text-white">5.0</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/25 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF]">
                      Sample Review Copy
                    </span>
                  </div>

                  {/* Quote Icon & Text */}
                  <div className="relative mb-6">
                    <Quote
                      aria-hidden="true"
                      className="w-7 h-7 text-white/15 mb-2"
                    />
                    <p className="text-sm sm:text-base text-slate-200/95 leading-relaxed italic">
                      “{review.quote}”
                    </p>
                  </div>
                </div>

                {/* Client Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">{review.clientName}</p>
                    <p className="text-xs font-mono text-[#F5D08A]/90 mt-0.5">
                      {review.serviceTag}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {review.dateLabel}
                  </span>
                </div>
              </article>

              {/* Soft Levitation Floor Shadow */}
              <div
                aria-hidden="true"
                className="mx-auto mt-3 h-3 w-3/4 rounded-full blur-lg pointer-events-none levitate-shadow"
                style={{
                  background: `radial-gradient(ellipse at center, ${shadowHue} 0%, transparent 75%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
