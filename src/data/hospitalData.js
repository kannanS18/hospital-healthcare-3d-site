export const hospitalData = {
  hero: {
    badge: 'JCI ACCREDITED • TOP 1% WORLD MEDICAL CENTERS',
    titleLine1: 'ADVANCED HEALTHCARE.',
    titleLine2: 'COMPASSIONATE CARE.',
    subtitle: 'Integrating robotic surgical suites, genomic diagnostics, and world-class multi-disciplinary specialists to provide patient-centered healing when it matters most.',
    ctaPrimary: 'Book Consultation',
    ctaSecondary: 'Explore Medical Faculty',
    emergencyHotline: '24/7 Direct Trauma Helpline: 8072212411',
    emergencyPhone: '8072212411',
    metrics: [
      { label: 'Board-Certified Specialists', value: '450+' },
      { label: 'Patient Recovery Rate', value: '99.4%' },
      { label: 'Robotic Surgical Suites', value: '18' },
      { label: 'Joint Commission Stars', value: '5 / 5' }
    ]
  },

  services: {
    heading: 'CENTERS OF CLINICAL EXCELLENCE',
    subheading: 'Globally certified diagnostic departments delivering evidence-based clinical breakthroughs.',
    items: [
      {
        icon: 'Heart',
        title: 'Cardiovascular & Thoracic Surgery',
        desc: 'Minimally invasive valve replacements, TAVR procedures, and advanced cardiac catheterization laboratories.',
        metric: '99.8% procedure success rate',
        tag: 'INSTITUTE OF CARDIOLOGY'
      },
      {
        icon: 'Brain',
        title: 'Comprehensive Neurosciences & Spine',
        desc: 'Sub-millimeter cranial neuronavigation, stroke intervention within golden hour, and complex spinal reconstructive surgery.',
        metric: '<18 min door-to-needle time',
        tag: 'NEUROLOGY'
      },
      {
        icon: 'Dna',
        title: 'Precision Oncology & Cellular Therapy',
        desc: 'Genomic biomarker sequencing, targeted CAR-T cell immunotherapies, and stereotactic CyberKnife radiation.',
        metric: 'Individualized genetic protocols',
        tag: 'ONCOLOGY'
      },
      {
        icon: 'Activity',
        title: 'Level 1 Trauma & Emergency Medicine',
        desc: '24/7 on-site attending trauma surgeons, dedicated helipad, and immediate advanced CT/MRI diagnostics.',
        metric: 'Zero triage wait time',
        tag: 'EMERGENCY'
      },
      {
        icon: 'Cpu',
        title: 'da Vinci Robotic Assisted Surgery',
        desc: 'High-definition 3D stereoscopic optics with wristed micro-instruments for minimal scarring and faster discharge.',
        metric: 'Average 48h discharge',
        tag: 'SURGERY'
      },
      {
        icon: 'Stethoscope',
        title: 'Executive Diagnostics & Longevity',
        desc: 'Full-body 3-Tesla MRI screenings, cardiovascular calcium scoring, multi-cancer early detection panels.',
        metric: '75+ tracked biomarkers',
        tag: 'PREVENTIVE'
      }
    ]
  },

  gallery: {
    heading: 'FACULTY & MEDICAL INFRASTRUCTURE',
    subheading: 'Meet our attending department chairs and explore our hospital campus facilities.',
    filterCategories: ['All Specialists', 'Chief Physicians', 'Surgical Suites', 'Diagnostic Labs'],
    items: [
      {
        title: 'Dr. Maya Thorne, MD, FACC',
        specs: 'Chief Medical Officer & Interventional Cardiology • Harvard Medical Faculty • 18+ Years',
        category: 'Chief Physicians',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
        badge: 'CHIEF MEDICAL OFFICER'
      },
      {
        title: 'Dr. Aris Thorne, MD, PhD',
        specs: 'Director of Neuro-Oncology • Johns Hopkins Fellow • 18+ Years',
        category: 'Chief Physicians',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
        badge: 'NEUROLOGY CHAIR'
      },
      {
        title: 'Hybrid Robotic Operative Suite 4',
        specs: 'da Vinci Xi Multi-Arm Surgical Robotics • HEPA Positive Pressure',
        category: 'Surgical Suites',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        badge: 'FACILITY'
      },
      {
        title: '3-Tesla High Precision Neuro-MRI',
        specs: 'Diffusion Tensor Imaging • Silent Scan Technology • Real-time 3D',
        category: 'Diagnostic Labs',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        badge: 'DIAGNOSTICS'
      }
    ]
  },

  testimonials: {
    heading: 'PATIENT CLINICAL OUTCOMES',
    subheading: 'Verified recovery accounts documented through our post-discharge clinical registry.',
    items: [
      {
        quote: "When my arrhythmia became critical, Dr. Montgomery's team performed a minimally invasive ablation that resolved the condition completely. The compassion of the nursing team made all the difference.",
        author: 'Robert Sterling',
        title: 'Patient • Minimally Invasive Cardiac Reconstruction',
        car: 'Discharged in 36 Hours',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      },
      {
        quote: "The genomic oncology protocol and rapid diagnostics identified my stage 2 condition before standard scans could. Today I am completely cancer-free thanks to MediCare+.",
        author: 'Claire H. Thornton',
        title: 'Patient • Precision Oncology & Immunotherapy',
        car: 'Full Remission Confirmed',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },

  contact: {
    heading: 'SCHEDULE A CLINICAL CONSULTATION',
    subheading: 'Our patient coordination nurses triage inquiries to match you with the appropriate specialty team.',
    fields: {
      vehiclePlaceholder: 'Primary symptom or reason for visit (e.g. Second opinion, Cardiac check, MRI scan)',
      budgetOptions: ['Medicare / Medicaid', 'Blue Cross / Anthem', 'UnitedHealthcare', 'Cigna / Aetna', 'Private Self-Pay / International'],
      serviceOptions: ['Cardiovascular Institute', 'Neurology & Brain Center', 'Oncology & Immunotherapy', 'da Vinci Robotic Surgery', 'Executive Wellness Check'],
    },
    workshopInfo: {
      address: 'AuraCare Pavilion, 450 Medical Sciences Way',
      phone: '24/7 Clinical Desk: 8072212411',
      hours: 'Emergency & Trauma: Open 24/7/365 • Outpatient Clinics: Mon-Sat 07:00 - 20:00',
      email: 'admissions@auracare-health.org'
    }
  }
};
