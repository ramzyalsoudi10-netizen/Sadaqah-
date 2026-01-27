
import React, { useState, useEffect, useRef } from 'react';
import { Language, PaymentMethod } from '../types';
import { TRANSLATIONS, IMPACT_LABELS } from '../constants';

interface DonationSectionProps {
  lang: Language;
  onDonationComplete: (amount: number, method: PaymentMethod) => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const DonationSection: React.FC<DonationSectionProps> = ({ lang, onDonationComplete }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1);
  const [customAmount, setCustomAmount] = useState<string>('1');
  const [step, setStep] = useState<1 | 2>(1);
  const [activeMethod, setActiveMethod] = useState<PaymentMethod | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const getFinalAmount = () => {
    return parseFloat(customAmount || selectedAmount?.toString() || "0");
  };

  const isAmountValid = () => {
    const amount = getFinalAmount();
    return !isNaN(amount) && amount > 0;
  };

  const handleQuickAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleInputChange = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    const match = IMPACT_LABELS.find(item => item.amount === num);
    setSelectedAmount(match ? match.amount : null);
  };

  const handleDonateClick = () => {
    if (isAmountValid()) {
      setStep(2);
      setActiveMethod(null);
    }
  };

  useEffect(() => {
    let timeoutId: any;
    if (activeMethod === PaymentMethod.PAYPAL && step === 2) {
      const renderPaypal = () => {
        if (window.paypal && window.paypal.HostedButtons && paypalContainerRef.current) {
          paypalContainerRef.current.innerHTML = "";
          window.paypal.HostedButtons({
            hostedButtonId: "445WTW8YZ8JME",
          }).render(paypalContainerRef.current);
        } else {
          timeoutId = setTimeout(renderPaypal, 500);
        }
      };
      timeoutId = setTimeout(renderPaypal, 100);
    }
    return () => clearTimeout(timeoutId);
  }, [activeMethod, step]);

  const finalize = (method: PaymentMethod) => {
    if (method === PaymentMethod.PAYPAL) {
      setActiveMethod(PaymentMethod.PAYPAL);
    } else {
      const amount = getFinalAmount();
      onDonationComplete(amount, method);
    }
  };

  return (
    <section id="donate-section" className="py-12 md:py-20 bg-emerald-50/50 rounded-3xl md:rounded-[3rem] px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">{t.impactTitle}</h2>
        <p className="text-base md:text-lg text-emerald-700 mb-8 md:mb-12">{t.impactSubtitle}</p>

        {step === 1 ? (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {IMPACT_LABELS.map((item) => (
                <button
                  key={item.amount}
                  onClick={() => handleQuickAmountClick(item.amount)}
                  className={`p-4 md:p-6 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-1 md:gap-2 ${
                    selectedAmount === item.amount ? 'border-amber-500 bg-white shadow-lg scale-105' : 'border-emerald-100 bg-white/50 hover:bg-white'
                  }`}
                >
                  <span className="text-xl md:text-2xl font-bold text-emerald-900">${item.amount}</span>
                  <span className="text-[10px] md:text-xs text-gray-500 leading-tight">
                    {lang === 'en' ? item.labelEn : item.labelAr}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative max-w-xs md:max-w-sm mx-auto">
              <input
                type="number"
                inputMode="decimal"
                placeholder={t.customAmount}
                value={customAmount}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`w-full p-4 rounded-xl border-2 outline-none text-center text-lg font-semibold transition-colors ${
                  isAmountValid() ? 'border-emerald-100 focus:border-amber-500' : 'border-red-200 focus:border-red-400'
                }`}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
            </div>

            <button
              onClick={handleDonateClick}
              disabled={!isAmountValid()}
              className={`w-full max-w-md py-4 font-bold text-lg md:text-xl rounded-2xl shadow-xl transition-all active:scale-95 ${
                isAmountValid() 
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              }`}
            >
              {t.donateNow}
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl space-y-6 md:space-y-8 animate-fade-in max-w-2xl mx-auto min-h-[400px]">
            <button onClick={() => { setStep(1); setActiveMethod(null); }} className="text-emerald-700 font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
               {lang === 'en' ? '← Back' : '← رجوع'}
            </button>
            <div className="text-center">
              <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mb-2">{lang === 'ar' ? 'مبلغ التبرع' : 'Donation Amount'}</span>
              <h3 className="text-3xl md:text-5xl font-black text-emerald-900">
                ${getFinalAmount()}
              </h3>
            </div>
            
            {activeMethod !== PaymentMethod.PAYPAL ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4 animate-fade-in">
                <button onClick={() => finalize(PaymentMethod.PAYPAL)} className="flex items-center md:flex-col justify-center gap-3 md:gap-2 p-5 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-95 group">
                   <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-6 md:h-12 object-contain" />
                   <span className="font-bold text-gray-700">PayPal</span>
                </button>
                <button onClick={() => finalize(PaymentMethod.USDT)} className="flex items-center md:flex-col justify-center gap-3 md:gap-2 p-5 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-95 group">
                   <div className="bg-[#26A17B] text-white rounded-full p-1.5 md:p-2 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg md:text-2xl shadow-md">₮</div>
                   <span className="font-bold text-gray-700">USDT Crypto</span>
                </button>
              </div>
            ) : (
              <div className="pt-6 animate-fade-in flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-6 font-medium">
                  {lang === 'ar' ? 'يرجى إتمام عملية الدفع عبر بايبال أدناه:' : 'Please complete your payment via PayPal below:'}
                </p>
                <div ref={paypalContainerRef} className="w-full min-h-[150px]">
                   <div className="flex items-center justify-center py-10">
                      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-700 rounded-full animate-spin"></div>
                   </div>
                </div>
                <button 
                  onClick={() => setActiveMethod(null)} 
                  className="mt-8 text-sm text-gray-400 hover:text-emerald-700 transition-colors underline"
                >
                  {lang === 'ar' ? 'تغيير طريقة الدفع' : 'Change payment method'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationSection;
