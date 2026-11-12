import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Star,
  MapPin,
  Phone,
  ArrowDownRight,
  Pause,
  Play,
  Orbit,
  Compass,
  ShieldCheck,
} from 'lucide-react';
import { AntiGravityScene, GravityMode } from './components/AntiGravityScene';
import { MagneticButton } from './components/MagneticButton';
import { ServicePodCard } from './components/ServicePodCard';
import { FloatingGallery } from './components/FloatingGallery';
import { FloatingReviews } from './components/FloatingReviews';
import { BookingPortal } from './components/BookingPortal';
import { SERVICES_DATA, STUDIO_INFO } from './data/studioData';

export function App() {
  const [gravityMode, setGravityMode] = useState<GravityMode>('zero-g');
  const [isMotionPaused, setIsMotionPaused] = useState(false);
  const [isBlackHoleActive, setIsBlackHoleActive] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(
    `${SERVICES_DATA[0].title} (${SERVICES_DATA[0].priceDuration})`
  );
  const [selectedLookNote, setSelectedLookNote] = useState<string>('');
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const cycleGravityMode = () => {
    setGravityMode((prev) =>
      prev === 'zero-g' ? 'repel' : prev === 'repel' ? 'orbit' : 'zero-g'
    );
  };

  const handleSelectServiceAndScroll = (serviceLabel: string) => {
    setSelectedService(serviceLabel);
    const el = document.getElementById('booking');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectLookAndScroll = (lookTitle: string) => {
    setSelectedLookNote(lookTitle);
    const el = document.getElementById('booking');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMotionPaused) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * -10;
    setHeroTilt({ x, y });
  };

  return (
    <div
      className={`min-h-screen relative text-white selection:bg-[#00E5FF]/30 selection:text-[#00E5FF] ${
        isMotionPaused ? 'motion-paused' : ''
      }`}
    >
      {/* 1. Anti-Gravity 3D WebGL Physics Scene */}
      <AntiGravityScene
        gravityMode={gravityMode}
        isMotionPaused={isMotionPaused}
        onBlackHoleStateChange={setIsBlackHoleActive}
      />

      {/* Sticky Futuristic Glass Header & Top-Corner Gravity Mode Pill */}
      <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 pointer-events-auto glass-pod-cyan rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3">
          {/* Brand Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF] rounded-full"
          >
            <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] p-[1.5px] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.5)]">
              <span className="w-full h-full rounded-full bg-[#05040A] flex items-center justify-center font-display font-extrabold text-sm text-[#F5D08A]">
                N
              </span>
            </span>
            <div>
              <span className="font-display font-extrabold tracking-wider text-sm sm:text-base text-white block leading-none">
                NÒVU EXCLUSIVE
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#00E5FF] block mt-0.5">
                GLASGOW • SUITE 115
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-7 text-xs font-mono uppercase tracking-widest text-slate-300"
          >
            <a href="#services" className="hover:text-[#00E5FF] transition-colors py-1">
              Services
            </a>
            <a href="#gallery" className="hover:text-[#00E5FF] transition-colors py-1">
              Floating Gallery
            </a>
            <a href="#reviews" className="hover:text-[#F5D08A] transition-colors py-1">
              5.0★ Reviews
            </a>
            <a href="#booking" className="hover:text-[#FF9EC7] transition-colors py-1">
              VIP Booking
            </a>
          </nav>

          {/* Top-Corner Interactive Gravity Mode Toggle Pill + Motion Pause Control */}
          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            <div
              role="group"
              aria-label="Gravity Physics Controller"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/70 border border-[#00E5FF]/50 shadow-[0_0_24px_rgba(0,229,255,0.28)]"
            >
              <button
                type="button"
                onClick={cycleGravityMode}
                title="Click to cycle Gravity Mode: Zero-G, Repel, or Orbit"
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-white hover:text-[#00E5FF] transition-colors pr-1"
              >
                <Zap className="w-3.5 h-3.5 text-[#F5D08A] fill-[#F5D08A]" />
                <span className="hidden md:inline text-slate-300">⚡ Gravity Mode:</span>
                <span className="md:hidden text-slate-300">⚡</span>
              </button>

              <div className="inline-flex items-center rounded-full bg-white/5 p-0.5 border border-white/10">
                {(['zero-g', 'repel', 'orbit'] as GravityMode[]).map((mode) => {
                  const active = gravityMode === mode;
                  const label =
                    mode === 'zero-g' ? 'Zero-G' : mode === 'repel' ? 'Repel' : 'Orbit';
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setGravityMode(mode)}
                      className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                        active
                          ? 'bg-gradient-to-r from-[#00E5FF] to-[#F5D08A] text-[#05040A] font-bold shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* WCAG 2.2.2 Pause/Resume Persistent Motion Button */}
            <button
              type="button"
              onClick={() => setIsMotionPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-slate-200 transition-colors"
              title={isMotionPaused ? 'Resume Zero-G Physics' : 'Pause Zero-G Physics'}
            >
              {isMotionPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="hidden sm:inline">Resume Motion</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F5D08A]" />
                  <span className="hidden sm:inline">Pause Motion</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="relative z-10">
        {/* 1. HERO SECTION (Weightless Entrance) */}
        <section
          onMouseMove={handleHeroMouseMove}
          aria-labelledby="hero-headline"
          className="relative min-h-screen flex flex-col justify-center items-center pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
        >
          {/* Levitating Trust Badge */}
          <div className="levitate-fast pause-float-on-hover mb-7 sm:mb-9">
            <a
              href="#reviews"
              className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full glass-pod-gold border border-[#F5D08A]/60 shadow-[0_0_35px_rgba(245,208,138,0.3)] hover:scale-105 transition-transform"
            >
              <span className="flex items-center gap-0.5 text-[#F5D08A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F5D08A] text-[#F5D08A]" />
                ))}
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wide text-white">
                {STUDIO_INFO.trustBadge}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              <span className="hidden sm:inline text-xs font-mono text-[#00E5FF]">
                11 Bothwell St, Glasgow
              </span>
            </a>
          </div>

          {/* Floating 3D Typography & Headline */}
          <div
            style={{
              perspective: '1200px',
            }}
            className="max-w-5xl mx-auto mb-6 sm:mb-8 levitate-slow"
          >
            <h1
              id="hero-headline"
              style={{
                transform: `rotateX(${heroTilt.y}deg) rotateY(${heroTilt.x}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.1rem] font-extrabold tracking-tight leading-[1.06] uppercase"
            >
              <span className="block text-white drop-shadow-[0_10px_30px_rgba(0,229,255,0.35)]">
                NÒVU EXCLUSIVE —
              </span>
              <span className="block mt-2 bg-gradient-to-r from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] bg-clip-text text-transparent drop-shadow-[0_14px_40px_rgba(255,42,133,0.4)]">
                DEFY ORDINARY BEAUTY
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-slate-200/95 font-light leading-relaxed mb-10 sm:mb-12 levitate-medium">
            {STUDIO_INFO.subheadline}{' '}
            <span className="text-[#F5D08A] font-normal">
              Weightless architectural extensions, molten 3D chrome, and structural BIAB artistry
              in Suite 115.
            </span>
          </p>

          {/* Magnetic Zero-G CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto mb-14 levitate-fast">
            <MagneticButton href="#booking" variant="primary" className="w-full sm:w-auto">
              <Sparkles className="w-4 h-4" />
              <span>Book VIP Session</span>
              <ArrowDownRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton href="#gallery" variant="secondary" className="w-full sm:w-auto">
              <Orbit className="w-4 h-4 text-[#00E5FF]" />
              <span>Explore Floating Gallery</span>
            </MagneticButton>
          </div>

          {/* Interactive Cursor Forcefield Telemetry Pill */}
          <div className="max-w-3xl mx-auto w-full glass-pod-tri rounded-2xl sm:rounded-full px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isBlackHoleActive
                    ? 'bg-[#FF2A85] shadow-[0_0_12px_#FF2A85] animate-ping'
                    : 'bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]'
                }`}
              />
              <span className="text-white font-semibold">
                {isBlackHoleActive
                  ? 'MAGNETIC BLACK-HOLE PULL ACTIVE (Release for 360° Burst!)'
                  : `FORCEFIELD: ${gravityMode.toUpperCase()} ACTIVE`}
              </span>
            </div>

            <div className="text-slate-300/90 hidden md:block">
              Move cursor to repel 3D crystals •{' '}
              <strong className="text-[#F5D08A]">Hold Click</strong> for Magnetic Black-Hole Pull
            </div>

            <a
              href={`tel:${STUDIO_INFO.phoneDisplay.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-[#00E5FF] hover:text-[#F5D08A] transition-colors ml-auto md:ml-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STUDIO_INFO.phoneDisplay}</span>
            </a>
          </div>
        </section>

        {/* 2. LEVITATING SERVICES POD GRID */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pod-cyan text-xs font-mono uppercase tracking-[0.22em] text-[#00E5FF] mb-5">
              <Compass className="w-3.5 h-3.5 text-[#F5D08A]" />
              <span>4 Weightless Treatment Pods • 3D Spatial Tilt</span>
            </div>
            <h2
              id="services-heading"
              className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5"
            >
              LEVITATING{' '}
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] bg-clip-text text-transparent">
                SERVICES PODS
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Engineered for weightless wear and high-precision hygiene inside our private Glasgow
              sanctuary. Hover any pod to tilt in 3D space or select a treatment to pre-load your
              VIP booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {SERVICES_DATA.map((pod, idx) => (
              <ServicePodCard
                key={pod.id}
                pod={pod}
                index={idx}
                onSelectService={handleSelectServiceAndScroll}
              />
            ))}
          </div>
        </section>

        {/* 3. ANTI-GRAVITY INTERACTIVE GALLERY (8 FLOATING FRAMES) */}
        <FloatingGallery onSelectLook={handleSelectLookAndScroll} />

        {/* 4. FLOATING CLIENT REVIEWS (ORBITING SOCIAL PROOF) */}
        <FloatingReviews />

        {/* 5. CONTACT & INSTANT WHATSAPP BOOKING PORTAL */}
        <BookingPortal
          selectedService={selectedService}
          selectedLookNote={selectedLookNote}
        />
      </main>

      {/* Luxury Anti-Gravity Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#040308]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-display text-lg font-extrabold tracking-wider text-white">
              {STUDIO_INFO.name} — GLASGOW
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{STUDIO_INFO.address}</span>
              <span>•</span>
              <span className="text-[#F5D08A]">{STUDIO_INFO.phoneDisplay}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5D08A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
              {STUDIO_INFO.trustBadge}
            </span>
            <span>© {new Date().getFullYear()} NÒVU EXCLUSIVE. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
