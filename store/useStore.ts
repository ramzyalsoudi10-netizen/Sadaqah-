
import { useState, useEffect } from 'react';
import { Stats, UpdatePost, Language } from '../types';
import { INITIAL_STATS as DEFAULTS } from '../constants';

export const useStore = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    if (saved) return saved as Language;
    return navigator.language.startsWith('ar') ? 'ar' : 'en';
  });

  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULTS;
      }
    }
    return DEFAULTS;
  });

  const [updates] = useState<UpdatePost[]>(() => {
    const saved = localStorage.getItem('updates');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const updateStats = (newStats: Partial<Stats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'));

  return { lang, toggleLang, stats, updateStats, updates };
};
