
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-emerald-950 text-emerald-100 py-20 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
             <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
            {t.brand}
          </h3>
          <p className="text-emerald-300 leading-relaxed max-sm:text-sm max-w-sm">
            {t.footerAbout}
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">{t.footerLinks}</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">{t.navHome}</button></li>
            <li><button onClick={() => onNavigate('updates')} className="hover:text-amber-400 transition-colors">{t.navUpdates}</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">{t.navAbout}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">{t.footerLegal}</h4>
          <ul className="space-y-4">
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors">{t.privacyTitle}</button></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-emerald-900 text-center text-sm text-emerald-500">
        <p>{t.footerCopyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
