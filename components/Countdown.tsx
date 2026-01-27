
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CountdownProps {
  lang: Language;
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ lang, targetDate }) => {
  const t = TRANSLATIONS[lang];
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-emerald-900 text-white py-8 md:py-12 px-4 rounded-3xl relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10 pointer-events-none">
        <svg className="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C10.3 2 8.7 2.3 7.1 2.9C10.1 3.9 12.3 6.7 12.3 10C12.3 13.3 10.1 16.1 7.1 17.1C8.7 17.7 10.3 18 12 18C16.4 18 20 14.4 20 10C20 5.6 16.4 2 12 2ZM22 10C22 15.5 17.5 20 12 20C9.6 20 7.4 19.2 5.5 17.8C4.5 17.1 3.7 16.1 3 15C5.4 14.2 7.1 12 7.1 9.5C7.1 7 5.4 4.8 3 4C3.7 2.9 4.5 1.9 5.5 1.2C7.4 -0.2 9.6 -1 12 -1C17.5 -1 22 3.5 22 9V10Z" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-amber-400">{t.countdownTitle}</h2>
        <div className="grid grid-cols-4 gap-2 md:gap-8">
          {[
            { value: timeLeft.days, label: t.days },
            { value: timeLeft.hours, label: t.hours },
            { value: timeLeft.minutes, label: t.minutes },
            { value: timeLeft.seconds, label: t.seconds }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col items-center border border-white/5">
              <span className="text-2xl md:text-5xl font-bold mb-1 font-mono">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-[10px] md:text-sm uppercase tracking-widest text-emerald-200 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
