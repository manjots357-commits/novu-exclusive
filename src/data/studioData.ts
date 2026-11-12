export interface ServicePod {
  id: string;
  title: string;
  priceDuration: string;
  priceFrom: string;
  duration: string;
  badge: string;
  description: string;
  highlights: string[];
  accent: 'cyan' | 'magenta' | 'gold' | 'tri';
  levitateClass: 'levitate-slow' | 'levitate-medium' | 'levitate-fast';
}

export interface GalleryFrame {
  id: string;
  title: string;
  subtitle: string;
  technique: string;
  duration: string;
  accent: 'cyan' | 'magenta' | 'gold';
  levitateClass: 'levitate-slow' | 'levitate-medium' | 'levitate-fast';
  staggerClass: string;
  imageUrl: string;
  palette: [string, string, string];
}

export interface ClientReview {
  id: string;
  clientName: string;
  serviceTag: string;
  dateLabel: string;
  quote: string;
  accent: 'cyan' | 'magenta' | 'gold';
  levitateClass: 'levitate-slow' | 'levitate-medium' | 'levitate-fast';
}

export const STUDIO_INFO = {
  name: 'NÒVU EXCLUSIVE',
  tagline: 'DEFY ORDINARY BEAUTY',
  subheadline: "Experience Glasgow's Premier 5.0-Star Private Nail & Beauty Sanctuary.",
  trustBadge: '★ 5.0 Google Rating (51+ Verified Reviews)',
  address: '1st Floor, Suite 115, 11 Bothwell St, Glasgow G2 6LY, UK',
  phoneDisplay: '+44 7591 626976',
  whatsappNumber: '447591626976',
  hours: 'Mon – Sat: 09:30 – 20:00 • Sun: By VIP Appointment',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=1st+Floor,+Suite+115,+11+Bothwell+St,+Glasgow+G2+6LY,+UK',
};

export const SERVICES_DATA: ServicePod[] = [
  {
    id: 'zero-g-extensions',
    title: 'Zero-G Sculpted Acrylic & Gel Extensions',
    priceDuration: 'From £45 • 75 mins',
    priceFrom: 'From £45',
    duration: '75 mins',
    badge: 'SIGNATURE ARCHITECTURE',
    description:
      'Featherlight, custom-tailored nail extensions engineered for weightless comfort, glass-like apex balance, and 4+ weeks of flawless retention.',
    highlights: [
      'Bespoke Stiletto, Russian Almond, Coffin & Micro-Square forms',
      'Diamond-grade cuticle refinement & zero-lift prep',
      'Ultra-thin, high-strength structural apex sculpting',
    ],
    accent: 'cyan',
    levitateClass: 'levitate-slow',
  },
  {
    id: 'biab-builder-gel',
    title: 'BIAB & Structural Builder Gel',
    priceDuration: 'From £38 • 60 mins',
    priceFrom: 'From £38',
    duration: '60 mins',
    badge: 'NATURAL STRENGTH',
    description:
      'Luminous Builder in a Bottle overlays that fortify and elongate your natural nails with a self-levelling cushion of champagne, rose, or milky quartz.',
    highlights: [
      'Preserves natural nail integrity with flexible keratin-safe bond',
      'Mirror-glossy finish with subtle light-diffusing pigments',
      'Ideal for natural nail growth journeys & infill cycles',
    ],
    accent: 'gold',
    levitateClass: 'levitate-medium',
  },
  {
    id: '3d-chrome-nail-art',
    title: '3D Chrome, Aura & Floating Encapsulated Nail Art',
    priceDuration: 'From £20 • 30 mins',
    priceFrom: 'From £20',
    duration: '30 mins',
    badge: 'AVANT-GARDE EDITORIAL',
    description:
      'Futuristic multidimensional artistry combining molten liquid-metal chrome, airbrushed aura halos, magnetic velvet cat-eye, and suspended 3D crystals.',
    highlights: [
      'Molten gold, silver & iridescent cyber-cyan chrome finishes',
      '3D sculpted Korean gel droplets & crystal encapsulation',
      'Airbrushed cosmic aura gradients & magnetic velvet beams',
    ],
    accent: 'magenta',
    levitateClass: 'levitate-fast',
  },
  {
    id: 'luxury-weightless-spa',
    title: 'Luxury Weightless Spa Manicure & Pedicure',
    priceDuration: 'From £50 • 75 mins',
    priceFrom: 'From £50',
    duration: '75 mins',
    badge: 'SENSORY SANCTUARY',
    description:
      'An indulgent zero-gravity botanical ritual featuring volcanic mineral exfoliation, warm champagne-gold oil massage, and high-shine couture gel polish.',
    highlights: [
      'Heated botanical wrap & silk-peptide hydration mask',
      'Precision Russian e-file cuticle artistry & callus smoothing',
      'Tension-melting hand, lower-leg & reflexology massage',
    ],
    accent: 'tri',
    levitateClass: 'levitate-slow',
  },
];

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: 'frame-01',
    title: 'Cyber-Cyan Molten Chrome',
    subtitle: '3D Liquid Metal over Obsidian Glass',
    technique: 'Sculpted Almond • Mirror Chrome',
    duration: '90 mins',
    accent: 'cyan',
    levitateClass: 'levitate-slow',
    staggerClass: 'lg:mt-0',
    imageUrl:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85',
    palette: ['#00E5FF', '#0D0818', '#E0FBFF'],
  },
  {
    id: 'frame-02',
    title: 'Champagne Supernova BIAB',
    subtitle: '24K Gold Leaf & Milky Quartz Overlay',
    technique: 'Structural BIAB • Encapsulated Gold',
    duration: '70 mins',
    accent: 'gold',
    levitateClass: 'levitate-medium',
    staggerClass: 'lg:mt-10',
    imageUrl:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85',
    palette: ['#F5D08A', '#261C14', '#FFF3D1'],
  },
  {
    id: 'frame-03',
    title: 'Nebula Aura & Crystal Drops',
    subtitle: 'Airbrushed Magenta-Violet Halo with 3D Dewdrops',
    technique: 'Gel Extensions • Korean 3D Gel',
    duration: '85 mins',
    accent: 'magenta',
    levitateClass: 'levitate-fast',
    staggerClass: 'lg:mt-4',
    imageUrl:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
    palette: ['#FF2A85', '#1F0B2E', '#FF9EC7'],
  },
  {
    id: 'frame-04',
    title: 'Zero-G Velvet Cat-Eye',
    subtitle: 'Magnetic Photon Shimmer in Deep Violet',
    technique: 'Russian Manicure • Magnetic Gel',
    duration: '75 mins',
    accent: 'cyan',
    levitateClass: 'levitate-medium',
    staggerClass: 'lg:mt-14',
    imageUrl:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=85',
    palette: ['#00E5FF', '#3A1078', '#FF2A85'],
  },
  {
    id: 'frame-05',
    title: 'Iridescent Pearl Shell Capsule',
    subtitle: 'Glazed Mother-of-Pearl & Micro-Diamond Studs',
    technique: 'Zero-G Acrylic • Glazed Pearl',
    duration: '80 mins',
    accent: 'gold',
    levitateClass: 'levitate-fast',
    staggerClass: 'lg:mt-0',
    imageUrl:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85',
    palette: ['#F5D08A', '#00E5FF', '#FFFFFF'],
  },
  {
    id: 'frame-06',
    title: 'Hyper-Glass Encapsulated Opal',
    subtitle: 'Suspended Dichroic Flakes in Crystal Clear Gel',
    technique: 'Encapsulated Art • Hard Gel',
    duration: '95 mins',
    accent: 'cyan',
    levitateClass: 'levitate-slow',
    staggerClass: 'lg:mt-8',
    imageUrl:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85',
    palette: ['#00E5FF', '#FF2A85', '#120C24'],
  },
  {
    id: 'frame-07',
    title: 'Eclipse French & Liquid Gold',
    subtitle: 'Micro-Sculpted Obsidian Tips with Raised Gold Filigree',
    technique: 'BIAB Luxe • 3D Gold Relief',
    duration: '75 mins',
    accent: 'gold',
    levitateClass: 'levitate-medium',
    staggerClass: 'lg:mt-2',
    imageUrl:
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=85',
    palette: ['#F5D08A', '#05040A', '#D4AF37'],
  },
  {
    id: 'frame-08',
    title: 'Ultraviolet Hologram Stiletto',
    subtitle: 'Prismatic Laser Pigment & Floating Swarovski Accents',
    technique: 'Editorial Stiletto • Crystal Art',
    duration: '105 mins',
    accent: 'magenta',
    levitateClass: 'levitate-fast',
    staggerClass: 'lg:mt-12',
    imageUrl:
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85',
    palette: ['#FF2A85', '#00E5FF', '#F5D08A'],
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Islay M. — West End, Glasgow',
    serviceTag: 'Zero-G Sculpted Extensions + 3D Chrome',
    dateLabel: '5.0 ★ Rating',
    quote:
      'Suite 115 on Bothwell Street feels like stepping into a private futuristic penthouse. My sculpted extensions feel genuinely weightless and the molten chrome finish still looks untouched four weeks later.',
    accent: 'cyan',
    levitateClass: 'levitate-slow',
  },
  {
    id: 'rev-2',
    clientName: 'Sienna K. — Merchant City',
    serviceTag: 'BIAB & Structural Builder Gel',
    dateLabel: '5.0 ★ Rating',
    quote:
      'Unrivalled attention to detail. The cuticle prep is surgical in the best way, and the champagne BIAB apex is so sleek and natural. Easily the most exclusive nail sanctuary in Glasgow.',
    accent: 'gold',
    levitateClass: 'levitate-medium',
  },
  {
    id: 'rev-3',
    clientName: 'Freya D. — Finnieston',
    serviceTag: '3D Chrome, Aura & Encapsulated Art',
    dateLabel: '5.0 ★ Rating',
    quote:
      'Brought in an avant-garde editorial concept and they elevated it beyond anything I imagined. Every single finger looks like a tiny floating glass sculpture.',
    accent: 'magenta',
    levitateClass: 'levitate-fast',
  },
  {
    id: 'rev-4',
    clientName: 'Amelia R. — Bearsden',
    serviceTag: 'Luxury Weightless Spa Manicure & Pedicure',
    dateLabel: '5.0 ★ Rating',
    quote:
      'From the private suite atmosphere on Bothwell St to the warm botanical oil massage, the entire 75-minute session felt like floating on air. True 5.0-star luxury.',
    accent: 'gold',
    levitateClass: 'levitate-slow',
  },
  {
    id: 'rev-5',
    clientName: 'Zara T. — City Centre, G2',
    serviceTag: 'Zero-G Sculpted Gel Extensions',
    dateLabel: '5.0 ★ Rating',
    quote:
      'I have never had extensions this thin yet completely indestructible. Zero lifting, zero heaviness, and everyone stops me in Glasgow to ask where I get my nails done.',
    accent: 'cyan',
    levitateClass: 'levitate-medium',
  },
  {
    id: 'rev-6',
    clientName: 'Chloe V. — Park Circus',
    serviceTag: 'BIAB + Floating Crystal Art',
    dateLabel: '5.0 ★ Rating',
    quote:
      'Private, calm, immaculate hygiene, and true artists at work. NÒVU EXCLUSIVE sets a completely new benchmark for luxury nail artistry in Scotland.',
    accent: 'magenta',
    levitateClass: 'levitate-fast',
  },
];
