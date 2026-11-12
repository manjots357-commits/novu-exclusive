import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { SERVICES_DATA, STUDIO_INFO } from '../data/studioData';

interface BookingPortalProps {
  selectedService: string;
  selectedLookNote: string;
}

export const BookingPortal: React.FC<BookingPortalProps> = ({
  selectedService,
  selectedLookNote,
}) => {
  const [clientName, setClientName] = useState('');
  const [serviceChoice, setServiceChoice] = useState(
    `${SERVICES_DATA[0].title} (${SERVICES_DATA[0].priceDuration})`
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00 (Afternoon VIP Sanctuary)');
  const [bespokeNotes, setBespokeNotes] = useState('');

  // Validation states (validate on blur, clear on input, focus first invalid on submit)
  const [touched, setTouched] = useState<{ name?: boolean; date?: boolean }>({});
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedService) {
      setServiceChoice(selectedService);
    }
  }, [selectedService]);

  useEffect(() => {
    if (selectedLookNote) {
      setBespokeNotes((prev) =>
        prev.includes(selectedLookNote)
          ? prev
          : `Inspired by Gallery Frame: "${selectedLookNote}". ${prev}`.trim()
      );
    }
  }, [selectedLookNote]);

  const formatBookingMessage = () => {
    const cleanName = clientName.trim() || 'VIP Guest';
    const cleanDate = preferredDate || 'Flexible / Next Available Slot';
    const notesLine = bespokeNotes.trim()
      ? `\n• *Design / Notes:* ${bespokeNotes.trim()}`
      : '';

    return `✨ *NÒVU EXCLUSIVE — VIP BOOKING REQUEST* ✨\n\nHello NÒVU EXCLUSIVE Sanctuary,\nI would love to request a private appointment:\n\n• *Client Name:* ${cleanName}\n• *Selected Service:* ${serviceChoice}\n• *Preferred Date:* ${cleanDate}\n• *Preferred Time:* ${preferredTime}${notesLine}\n\n📍 *Location:* 1st Floor, Suite 115, 11 Bothwell St, Glasgow G2 6LY`;
  };

  const validateField = (field: 'name' | 'date', value: string) => {
    if (field === 'name') {
      if (!value.trim() || value.trim().length < 2) {
        return 'Please enter your full name (at least 2 characters).';
      }
    }
    if (field === 'date') {
      if (!value) {
        return 'Please choose your preferred appointment date.';
      }
    }
    return undefined;
  };

  const handleBlur = (field: 'name' | 'date', value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleNameInput = (val: string) => {
    setClientName(val);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleDateInput = (val: string) => {
    setPreferredDate(val);
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  const handleSubmitWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameErr = validateField('name', clientName);
    const dateErr = validateField('date', preferredDate);

    if (nameErr || dateErr) {
      setTouched({ name: true, date: true });
      setErrors({ name: nameErr, date: dateErr });
      if (nameErr && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (dateErr && dateInputRef.current) {
        dateInputRef.current.focus();
      }
      return;
    }

    const message = formatBookingMessage();
    const whatsappUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    setStatusAnnouncement('Opening WhatsApp chat with your formatted VIP booking request.');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    const message = formatBookingMessage();
    try {
      await navigator.clipboard.writeText(message);
      setCopiedStatus(true);
      setStatusAnnouncement('Booking message copied to clipboard.');
      setTimeout(() => setCopiedStatus(false), 3200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedStatus(true);
      setStatusAnnouncement('Booking message copied to clipboard.');
      setTimeout(() => setCopiedStatus(false), 3200);
    }
  };

  return (
    <section
      id="booking"
      aria-labelledby="booking-section-title"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pod-cyan text-xs font-mono uppercase tracking-[0.22em] text-[#00E5FF] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D08A]" />
          <span>Direct Concierge • Suite 115, 11 Bothwell St</span>
        </div>
        <h2
          id="booking-section-title"
          className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5"
        >
          VIP SANCTUARY{' '}
          <span className="bg-gradient-to-r from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] bg-clip-text text-transparent">
            BOOKING PORTAL
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Reserve your private zero-gravity session in the heart of Glasgow city centre. Configure
          your bespoke treatment below to launch an instant WhatsApp concierge request or copy your
          formatted itinerary in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Levitating Studio Coordinates & Direct Sanctuary Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="glass-pod-gold rounded-3xl p-6 sm:p-9 levitate-slow pause-float-on-hover">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5D08A]/15 border border-[#F5D08A]/40 text-xs font-mono text-[#F5D08A] mb-6">
              <span>★ 5.0 GOOGLE RATED SANCTUARY</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {STUDIO_INFO.name}
            </h3>
            <p className="text-sm text-[#00E5FF] font-mono uppercase tracking-widest mb-7">
              Private Nail & Beauty Architecture • Glasgow
            </p>

            <div className="space-y-6 border-t border-white/10 pt-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#00E5FF]/15 border border-[#00E5FF]/40 flex items-center justify-center shrink-0 text-[#00E5FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Sanctuary Address
                  </p>
                  <p className="text-base font-semibold text-white leading-snug">
                    1st Floor, Suite 115, 11 Bothwell St
                  </p>
                  <p className="text-sm text-slate-300">Glasgow G2 6LY, United Kingdom</p>
                  <a
                    href={STUDIO_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5FF] hover:text-[#F5D08A] mt-2 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct Mobile / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FF2A85]/15 border border-[#FF2A85]/40 flex items-center justify-center shrink-0 text-[#FF9EC7]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Direct Mobile & WhatsApp Concierge
                  </p>
                  <a
                    href={`tel:${STUDIO_INFO.phoneDisplay.replace(/\s+/g, '')}`}
                    className="text-lg font-bold text-white hover:text-[#00E5FF] transition-colors block"
                  >
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${STUDIO_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F5D08A] hover:text-[#00E5FF] mt-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Direct WhatsApp Line (+44 7591 626976)</span>
                  </a>
                </div>
              </div>

              {/* Sanctuary Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F5D08A]/15 border border-[#F5D08A]/40 flex items-center justify-center shrink-0 text-[#F5D08A]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Private Session Hours
                  </p>
                  <p className="text-sm font-medium text-white">{STUDIO_INFO.hours}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    2 mins walk from Glasgow Central Station
                  </p>
                </div>
              </div>
            </div>

            {/* Live Formatted Message Preview Box */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00E5FF]">
                  Live Dispatch Preview
                </span>
                <span className="text-[11px] font-mono text-slate-400">wa.me/447591626976</span>
              </div>
              <pre className="p-4 rounded-2xl bg-black/55 border border-white/10 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {formatBookingMessage()}
              </pre>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-3.5 w-4/5 rounded-full blur-xl pointer-events-none levitate-shadow"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(245, 208, 138, 0.28) 0%, transparent 75%)',
            }}
          />
        </div>

        {/* Right Column: Interactive WhatsApp Booking Form */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-pod-tri rounded-3xl p-6 sm:p-10 levitate-medium pause-float-on-hover">
            <h3
              id="booking-form-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-white mb-2"
            >
              Configure Your VIP Session
            </h3>
            <p className="text-sm text-slate-300 mb-8">
              Fields marked with <span className="text-[#00E5FF] font-bold">*</span> are required.
              Instant dispatch via WhatsApp or one-click message copy.
            </p>

            <form
              aria-labelledby="booking-form-heading"
              action={`https://wa.me/${STUDIO_INFO.whatsappNumber}`}
              method="GET"
              noValidate
              onSubmit={handleSubmitWhatsApp}
              className="space-y-6"
            >
              {/* 1. Client Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="client-name"
                  className="text-sm font-semibold text-white flex items-center gap-1"
                >
                  <span>Your Full Name</span>
                  <span aria-hidden="true" className="text-[#00E5FF]">
                    *
                  </span>
                </label>
                <input
                  ref={nameInputRef}
                  id="client-name"
                  name="client_name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  enterKeyHint="next"
                  value={clientName}
                  onChange={(e) => handleNameInput(e.target.value)}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={errors.name ? 'client-name-error' : 'client-name-hint'}
                  placeholder="e.g., Islay MacLeod"
                  className="luxury-input w-full rounded-2xl bg-black/50 border border-white/20 px-4 py-3.5 text-white placeholder:text-slate-500 focus:border-[#00E5FF] transition-colors"
                />
                <span id="client-name-hint" className="text-xs text-slate-400">
                  Used to personalize your private suite reservation at Suite 115.
                </span>
                {touched.name && errors.name && (
                  <p
                    id="client-name-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#FF9EC7] mt-1"
                  >
                    <AlertCircle className="w-4 h-4 text-[#FF2A85] shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* 2. Service Selection */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="service-selection"
                  className="text-sm font-semibold text-white flex items-center gap-1"
                >
                  <span>Select Signature Treatment Pod</span>
                  <span aria-hidden="true" className="text-[#00E5FF]">
                    *
                  </span>
                </label>
                <select
                  id="service-selection"
                  name="service"
                  required
                  value={serviceChoice}
                  onChange={(e) => setServiceChoice(e.target.value)}
                  className="luxury-input w-full rounded-2xl bg-[#0B0716] border border-white/20 px-4 py-3.5 text-white focus:border-[#00E5FF] transition-colors"
                >
                  {SERVICES_DATA.map((s) => {
                    const label = `${s.title} (${s.priceDuration})`;
                    return (
                      <option key={s.id} value={label} className="bg-[#0B0716] text-white">
                        {label}
                      </option>
                    );
                  })}
                  <option
                    value="Bespoke Combo: Zero-G Extensions + 3D Chrome / Encapsulated Art (From £65 • 105 mins)"
                    className="bg-[#0B0716] text-white"
                  >
                    Bespoke Combo: Zero-G Extensions + 3D Chrome / Encapsulated Art (From £65 • 105
                    mins)
                  </option>
                  <option
                    value="BIAB Builder Gel + Luxury Weightless Spa Pedicure Duo (From £85 • 120 mins)"
                    className="bg-[#0B0716] text-white"
                  >
                    BIAB Builder Gel + Luxury Weightless Spa Pedicure Duo (From £85 • 120 mins)
                  </option>
                </select>
              </div>

              {/* 3. Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="preferred-date"
                    className="text-sm font-semibold text-white flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 text-[#00E5FF]" />
                    <span>Preferred Date</span>
                    <span aria-hidden="true" className="text-[#00E5FF]">
                      *
                    </span>
                  </label>
                  <input
                    ref={dateInputRef}
                    id="preferred-date"
                    name="preferred_date"
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => handleDateInput(e.target.value)}
                    onBlur={(e) => handleBlur('date', e.target.value)}
                    aria-invalid={Boolean(touched.date && errors.date)}
                    aria-describedby={errors.date ? 'preferred-date-error' : undefined}
                    className="luxury-input w-full rounded-2xl bg-black/50 border border-white/20 px-4 py-3.5 text-white focus:border-[#00E5FF] transition-colors"
                  />
                  {touched.date && errors.date && (
                    <p
                      id="preferred-date-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#FF9EC7] mt-1"
                    >
                      <AlertCircle className="w-4 h-4 text-[#FF2A85] shrink-0" />
                      <span>{errors.date}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="preferred-time"
                    className="text-sm font-semibold text-white flex items-center gap-1.5"
                  >
                    <Clock className="w-4 h-4 text-[#F5D08A]" />
                    <span>Preferred Time Window</span>
                  </label>
                  <select
                    id="preferred-time"
                    name="preferred_time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="luxury-input w-full rounded-2xl bg-[#0B0716] border border-white/20 px-4 py-3.5 text-white focus:border-[#00E5FF] transition-colors"
                  >
                    <option value="09:30 – 11:30 (Morning Sanctuary)">
                      09:30 – 11:30 (Morning Sanctuary)
                    </option>
                    <option value="12:00 – 14:00 (Midday Zero-G Slot)">
                      12:00 – 14:00 (Midday Zero-G Slot)
                    </option>
                    <option value="14:00 (Afternoon VIP Sanctuary)">
                      14:00 (Afternoon VIP Sanctuary)
                    </option>
                    <option value="16:30 – 18:30 (Twilight Luxe Slot)">
                      16:30 – 18:30 (Twilight Luxe Slot)
                    </option>
                    <option value="18:30 – 20:00 (After-Hours Private VIP)">
                      18:30 – 20:00 (After-Hours Private VIP)
                    </option>
                  </select>
                </div>
              </div>

              {/* 4. Optional Nail Art / Bespoke Requests */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="bespoke-notes"
                  className="text-sm font-semibold text-white flex items-center justify-between"
                >
                  <span>Bespoke Nail Art / Shape Notes (Optional)</span>
                  <span className="text-xs font-mono text-slate-400">Almond, Chrome, Soak-off</span>
                </label>
                <textarea
                  id="bespoke-notes"
                  name="notes"
                  rows={3}
                  value={bespokeNotes}
                  onChange={(e) => setBespokeNotes(e.target.value)}
                  placeholder="Share your desired nail shape, gallery inspiration, or if you require a soak-off..."
                  className="luxury-input w-full rounded-2xl bg-black/50 border border-white/20 p-4 text-white placeholder:text-slate-500 focus:border-[#00E5FF] transition-colors resize-y"
                />
              </div>

              {/* Action Buttons: Direct WhatsApp Submit + One-Click Copy */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[54px] rounded-full bg-gradient-to-r from-[#00E5FF] via-[#F5D08A] to-[#FF2A85] text-[#05040A] font-bold text-sm sm:text-base tracking-wide shadow-[0_0_32px_rgba(0,229,255,0.45)] hover:shadow-[0_0_48px_rgba(0,229,255,0.8)] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book Instantly via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 min-h-[54px] rounded-full glass-pod-cyan text-white hover:border-[#00E5FF] hover:bg-white/10 font-semibold text-sm transition-all"
                >
                  {copiedStatus ? (
                    <>
                      <Check className="w-4 h-4 text-[#00E5FF]" />
                      <span className="text-[#00E5FF]">Copied Booking Text!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#F5D08A]" />
                      <span>Copy Booking Message</span>
                    </>
                  )}
                </button>
              </div>

              {/* Accessible Live Status Region */}
              <div role="status" aria-live="polite" className="sr-only">
                {statusAnnouncement}
              </div>
            </form>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-3.5 w-4/5 rounded-full blur-xl pointer-events-none levitate-shadow"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.28) 0%, transparent 75%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};
