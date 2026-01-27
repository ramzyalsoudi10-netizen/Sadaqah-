
import React, { useState, useEffect, useRef } from 'react';
import { Language, Stats } from '../types';
import { TRANSLATIONS } from '../constants';

interface StatsCounterProps {
  lang: Language;
  stats: Stats;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ lang, stats }) => {
  const t = TRANSLATIONS[lang];
  
  const Counter = ({ value, duration = 1500, prefix = "" }: { value: number; duration?: number; prefix?: string }) => {
    const [count, setCount] = useState(value);
    const prevValueRef = useRef(value);

    useEffect(() => {
      const startValue = prevValueRef.current;
      const endValue = value;
      
      if (startValue === endValue) return;

      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Use easeOutQuad for smoother feel
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * (endValue - startValue) + startValue);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          prevValueRef.current = endValue;
        }
      };

      requestAnimationFrame(animate);
    }, [value, duration]);

    return <span>{prefix}{count.toLocaleString()}</span>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center my-8 md:my-16">
      <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-emerald-50 transform hover:scale-[1.02] transition-transform">
        <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-1 md:mb-2">
          <Counter value={stats.totalRaised} prefix="$" />
        </div>
        <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">{t.statsRaised}</div>
      </div>
      <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-emerald-50 transform hover:scale-[1.02] transition-transform">
        <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-1 md:mb-2">
          <Counter value={stats.totalDonors} />
        </div>
        <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">{t.statsDonors}</div>
      </div>
      <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-emerald-50 transform hover:scale-[1.02] transition-transform">
        <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-1 md:mb-2">
          <Counter value={stats.familiesSupported} />
        </div>
        <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">{t.statsFamilies}</div>
      </div>
    </div>
  );
};

export default StatsCounter;
