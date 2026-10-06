import { create } from 'zustand';

export const useVerticalStore = create((set, get) => ({
  activeVertical: 'hospital',
  activePage: 'home', // 'home' | 'doctors' | 'departments' | 'facilities' | 'appointments' | 'health-tools' | 'contact'

  setActivePage: (page) => {
    set({ activePage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash !== `#/${page}` && window.location.hash !== `#${page}`) {
      window.location.hash = `/${page}`;
    }
  },

  // 3D Doctor Mascot Controls & State (For user's docmodel.glb)
  hospitalCustomizer: {
    mascotFollow: true,
    isWaving: false,
    triggerWalkIn: false,
    vitalsActive: false,
    autoRotate: false,
    speechMessage: "👋 Welcome to AuraCare! Move your cursor around — my gaze follows your pointer in real-time.",
  },

  updateHospitalCustomizer: (partial) =>
    set((state) => ({
      hospitalCustomizer: { ...state.hospitalCustomizer, ...partial },
    })),
}));
