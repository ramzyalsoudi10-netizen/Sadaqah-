
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <span className="text-emerald-800 font-bold text-xl tracking-tight flex items-center gap-2 group-hover:text-emerald-600 transition-colors">
              <svg className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
              {t.brand}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">{t.navHome}</button>
            <button onClick={() => onNavigate('updates')} className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">{t.navUpdates}</button>
            <button onClick={() => onNavigate('about')} className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">{t.navAbout}</button>
            <button onClick={() => onNavigate('donate')} className="bg-emerald-700 text-white px-6 py-2.5 rounded-full hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/20 active:scale-95">
              {t.navDonate}
            </button>
            
            <div 
              onClick={onToggleLang}
              className="flex items-center bg-[#f0f4f8] border border-[#e2e8f0] p-1 rounded-full cursor-pointer select-none transition-all hover:bg-[#e8edf3]"
            >
              <div className={`px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'ar' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>
                العربية
              </div>
              <div className={`px-4 py-1 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>
                English
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
             <div 
              onClick={onToggleLang}
              className="flex items-center bg-[#f0f4f8] border border-[#e2e8f0] p-0.5 rounded-full cursor-pointer scale-90"
            >
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'ar' ? 'bg-white text-emerald-600' : 'text-slate-400'}`}>
                AR
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white text-emerald-600' : 'text-slate-400'}`}>
                EN
              </div>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800 p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 p-6 space-y-4 shadow-xl animate-fade-in">
          <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left rtl:text-right px-4 py-3 hover:bg-emerald-50 rounded-xl transition-colors">{t.navHome}</button>
          <button onClick={() => { onNavigate('updates'); setIsOpen(false); }} className="block w-full text-left rtl:text-right px-4 py-3 hover:bg-emerald-50 rounded-xl transition-colors">{t.navUpdates}</button>
          <button onClick={() => { onNavigate('about'); setIsOpen(false); }} className="block w-full text-left rtl:text-right px-4 py-3 hover:bg-emerald-50 rounded-xl transition-colors">{t.navAbout}</button>
          <button onClick={() => { onNavigate('donate'); setIsOpen(false); }} className="block w-full bg-emerald-700 text-white text-center py-4 rounded-xl font-bold active:scale-95 transition-transform">{t.navDonate}</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
