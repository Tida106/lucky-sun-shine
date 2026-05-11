'use client';
// Light/dark mode toggle.
// Reads/writes localStorage('theme') and toggles `dark` class on <html>.
// The matching script in app/layout.jsx applies the right class on
// first paint to avoid the FOUC (flash of unstyled content).
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './icons/NavIcons';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-ink-700 transition-colors text-[#C9A96E] hover:text-[#9C7A47] dark:text-amber-400 dark:hover:text-amber-200 ${className}`}
      title={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-[18px] h-[18px]" />
      ) : (
        <MoonIcon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}
