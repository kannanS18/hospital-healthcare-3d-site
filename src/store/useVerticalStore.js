import { create } from 'zustand';

export const useVerticalStore = create((set, get) => ({
  activeVertical: 'hospital',
  activePage: 'home', // 'home' | 'doctors' | 'departments' | 'facilities' | 'appointments' | 'health-tools' | 'contact' | 'blog'
  sosModalOpen: false,

  setSosModalOpen: (open) => set({ sosModalOpen: open }),

  setActivePage: (page) => {
    set({ activePage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash !== `#/${page}` && window.location.hash !== `#${page}`) {
      window.location.hash = `/${page}`;
    }
  },

  // 3D Clinical Anatomy & Digital Twin Controls
  hospitalCustomizer: {
    explorerMode: 'heart', // 'heart' | 'brain' | 'body'
    bpm: 72,
    xrayMode: false,
    autoRotate: true,
    activeHotspot: null,
    telemetryMessage: "❤️ Cardiology Suite: Normal Sinus Rhythm (72 BPM) • 120/80 mmHg • SpO2 99%",
  },

  updateHospitalCustomizer: (partial) =>
    set((state) => ({
      hospitalCustomizer: { ...state.hospitalCustomizer, ...partial },
    })),
}));
