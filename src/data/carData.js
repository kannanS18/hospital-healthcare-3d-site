export const carData = {
  hero: {
    badge: 'EST. 2011 • MONZA & SILICON VALLEY',
    titleLine1: 'PRECISION',
    titleLine2: 'MODIFICATIONS',
    subtitle: 'Where aerospace-grade composite craftsmanship meets dyno-proven power. Transforming supercars and performance platforms into bespoke bespoke automotive art.',
    ctaPrimary: 'Commission a Build',
    ctaSecondary: 'Configure in 3D',
    metrics: [
      { label: 'Dyno Verified', value: '1,400+ HP' },
      { label: 'Bespoke Builds', value: '620+' },
      { label: 'Track Records', value: '38' },
      { label: 'Client Rating', value: '4.98 / 5' }
    ]
  },

  services: {
    heading: 'PILLARS OF CRAFTSMANSHIP',
    subheading: 'Engineered for aerodynamic downforce, acoustic aggression, and uncompromising velocity.',
    items: [
      {
        icon: 'Gauge',
        title: 'Stage 1-3 ECU & Dyno Calibration',
        desc: 'Custom fuel maps, ignition curves, and boost profiles dialed in on our 2,000 HP AWD load-bearing dyno.',
        metric: '+180 WHP avg gain',
        tag: 'PERFORMANCE'
      },
      {
        icon: 'Flame',
        title: 'Inconel & Titanium Valved Exhausts',
        desc: 'Formula 1-grade lightweight alloys with robotic TIG welding and active Bluetooth valve controllers.',
        metric: '-28 kg weight savings',
        tag: 'ACOUSTICS'
      },
      {
        icon: 'Shield',
        title: 'Aerodynamic Pre-Preg Carbon Fiber',
        desc: 'Autoclave-cured dry carbon splitters, rear diffusers, swan-neck GT wings, and custom widebody arches.',
        metric: '420 kg downforce @ 200km/h',
        tag: 'AERODYNAMICS'
      },
      {
        icon: 'Disc',
        title: 'Bespoke Monoblock Forged Wheels',
        desc: 'T6-6061 aerospace forged aluminum tailored to millimeter-exact caliper clearance and track width offsets.',
        metric: 'Starting at 8.2 kg/corner',
        tag: 'UNSPRUNG MASS'
      },
      {
        icon: 'Sparkles',
        title: 'Self-Healing TPU Film & Ceramic',
        desc: '10-mil hydrophobic paint protection film with 9H ceramic matrix armor and 10-year warranty.',
        metric: '100% rock-chip defense',
        tag: 'SURFACE ARMOR'
      },
      {
        icon: 'Layers',
        title: 'Motorsport Cockpit Re-Trimming',
        desc: 'Italian Alcantara, deviated contrast French stitching, carbon bucket seats, and integrated telemetry HUD.',
        metric: 'Handcrafted in-house',
        tag: 'INTERIOR ATELIER'
      }
    ]
  },

  gallery: {
    heading: 'THE BESPOKE ARCHIVE',
    subheading: 'Recent commissions delivered to tracks and private collections worldwide.',
    filterCategories: ['All Builds', 'Twin Turbo', 'Widebody', 'Track Spec'],
    items: [
      {
        title: 'Ferrari 458 Italia GT3-R Carbon',
        specs: 'Twin-Turbocharged • 920 WHP • Dry Carbon Widebody',
        category: 'Widebody',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
        badge: 'FEATURED'
      },
      {
        title: 'Porsche 911 GT3 Touring Spec',
        specs: 'Titanium Inconel Exhaust • Monoblock Centerlocks',
        category: 'Track Spec',
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
        badge: 'STAGE 3'
      },
      {
        title: 'Nissan GT-R R35 Billet V6',
        specs: '1,250 WHP • Methanol Injection • Drag Slicks',
        category: 'Twin Turbo',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        badge: 'RECORD BREAKER'
      },
      {
        title: 'McLaren 720S Velocity Edition',
        specs: 'Purple Tinted Exposed Carbon • 880 HP Tune',
        category: 'Widebody',
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80',
        badge: 'CUSTOM LIVERY'
      }
    ]
  },

  testimonials: {
    heading: 'DRIVER VERDICTS',
    subheading: 'What collectors and track pilots say after our technicians deliver the keys.',
    items: [
      {
        quote: "AutoForge transformed my 458 from an already incredible machine into an untamed, telemetry-tuned apex predator. The valved titanium exhaust note alone is worth every cent.",
        author: 'Marcus Vance',
        title: 'Supercar Collector & GT-Cup Competitor',
        car: 'Ferrari 458 Bi-Turbo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      {
        quote: "The attention to carbon weave alignment and dyno precision is unmatched. They trimmed 0.8 seconds off my Laguna Seca lap time in just one session.",
        author: 'Helena Bergström',
        title: 'Chassis Engineer & Time Attack Driver',
        car: 'Porsche 992 GT3 RS',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },

  contact: {
    heading: 'COMMISSION YOUR BUILD',
    subheading: 'Reserve your build slot. Our chief calibration engineer will review your chassis specifications within 24 hours.',
    fields: {
      vehiclePlaceholder: 'e.g. 2022 Porsche 911 GT3 / Ferrari 458 / BMW M4',
      budgetOptions: ['$10k - $25k', '$25k - $60k', '$60k - $120k', '$120k+ Full Restomod'],
      serviceOptions: ['Stage 2-3 Power Pack', 'Aero Widebody Kit', 'Titanium Exhaust', 'Forged Wheels & Suspension', 'Full Carbon Conversion'],
    },
    workshopInfo: {
      address: 'Paddock 07, Silverstone Innovation Park, UK',
      phone: '+44 (0) 20 8921 4400',
      hours: 'Mon - Fri: 08:00 - 19:00 GMT • Saturday by Private Track Booking',
      email: 'commissions@autoforge-atelier.com'
    }
  }
};
