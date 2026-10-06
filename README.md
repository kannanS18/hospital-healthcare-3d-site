# 🌟 NexusMorph — 4-in-1 Multi-Vertical 3D Web Experience

A high-performance interactive website where **4 distinct business verticals** (Automotive Modification, Hospitals & Healthcare, Dental Clinic, and Luxury Real Estate) morph seamlessly into entirely new visual identities, 3D worlds, typography, layouts, and copy via a top-level switcher bar and custom GLSL noise-dissolve shader transitions.

Built with **React 18**, **Three.js (React Three Fiber & Drei)**, **Zustand**, **Framer Motion**, and **Tailwind CSS**.

---

## 🚀 The 4 Verticals

| Vertical | Brand | Aesthetic | 3D Centerpiece | Colors | Typography |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **🚗 Car Modification** | **AUTOFORGE** | Dark Atelier Supercar Garage | Official Ferrari 458 Italia (`ferrari.glb`) with PBR clearcoat paint, customizer, sparks & underglow | Obsidian (`#0B0B0C`), Racing Orange (`#FF4D00`), Forged Gold (`#D4AF37`) | **Rajdhani** + Inter + JetBrains Mono |
| **🏥 Hospitals & Care** | **MediCare+** | Clean Diagnostic Precision | 3D Cranial Scan (`LeePerrySmith.glb`) or Molecular Cellular Sphere with DNA double helix & laser scanner | Warm Alabaster (`#F8FAFC`), Medical Teal (`#0D9488`), Cyan (`#0284C7`) | **Outfit** + DM Sans + DM Mono |
| **🦷 Dental Clinic** | **BrightSmile** | Spa-Inspired Anxiety-Free Wellness | Anatomical 3D Porcelain Molar Tooth with enamel translucency, orbiting precision instruments & diamond sparkle halo | Warm Cream (`#FAF9F6`), Deep Violet (`#7C3AED`), Cyan (`#06B6D4`) | **Poppins** + Nunito + DM Mono |
| **🏠 Real Estate** | **PrimeNest** | Luxury Architectural Reserve | Animated 3D Architectural Complex (`LittlestTokyo.glb`) with glowing shop windows, train & sunset golden hour lighting | Deep Charcoal (`#101114`), Champagne Gold (`#C9A96E`), Emerald (`#10B981`) | **Playfair Display** + Lato + DM Mono |

---

## 🎛️ Live 3D Interactive Controls

Click the **"3D Live Controls"** floating button at the bottom-left of the viewport to inspect and customize each 3D model in real time:
- **Car**: 6 body paint finishes (*Rosso Corsa, Obsidian Black, Electric Cyan, Acid Green, Forged Gold, Frozen Pearl*), rim finishes (*Gold, Black, Silver*), toggle neon underglow, headlights, and turntable rotation.
- **Hospital**: Switch between *Cellular DNA* and *Cranial Scan*, toggle vertical laser scanning beam, wireframe mode, and auto-rotation.
- **Dental**: Toggle whitening enamel glow, cold laser scan beam, precision tools orbit, and auto-rotation.
- **Real Estate**: Switch time-of-day between *Sunset, Night, and Day*, toggle interior window lights, golden dust particles, and turntable.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS with dynamic CSS variables
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd multi_vertical_threejs_site

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License
MIT License
