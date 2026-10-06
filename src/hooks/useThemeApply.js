import { useEffect } from 'react';
import { useVerticalStore } from '../store/useVerticalStore';
import { THEMES } from '../themes';

export function useThemeApply() {
  const activeVertical = useVerticalStore((state) => state.activeVertical);

  useEffect(() => {
    const theme = THEMES[activeVertical];
    if (!theme) return;

    const root = document.documentElement;

    root.style.setProperty('--color-bg', theme.colors.bg);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-surface-hover', theme.colors.surfaceHover);
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-muted', theme.colors.textMuted);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-nav-bg', theme.colors.navBg);
    root.style.setProperty('--glow-color', theme.colors.glow);
    root.style.setProperty('--shadow-color', theme.colors.shadow);

    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--font-mono', theme.fonts.mono);

    // Set page title dynamically
    document.title = `${theme.brandName} — ${theme.tagline}`;
  }, [activeVertical]);
}
