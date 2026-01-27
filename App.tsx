
import React, { useState } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Countdown from './components/Countdown';
import StatsCounter from './components/StatsCounter';
import DonationSection from './components/DonationSection';
import { TRANSLATIONS, CRYPTO_ADDRESSES } from './constants';
import { PaymentMethod } from './types';

const App: React.FC = () => {
  const { lang, toggleLang, stats, updateStats, updates } = useStore();
  const [currentPage, setCurrentPage] = useState('home');
  const [usdtModal, setUsdtModal] = useState<{ isOpen: boolean; amount: number }>({ isOpen: false, amount: 0 });
  const [copiedType, setCopiedType] = useState<'TRC20' | 'ERC20' | null>(null);
  const t = TRANSLATIONS[lang];

  const handleDonation = (amount: number, method: PaymentMethod) => {
    if (method === PaymentMethod.USDT) {
      setUsdtModal({ isOpen: true, amount });
    } else {
      alert(`Redirecting to ${method} for $${amount}...`);
      updateStats({ 
        totalRaised: stats.totalRaised + amount,
        totalDonors: stats.totalDonors + 1
      });
    }
  };

  const copyToClipboard = (text: string, type: 'TRC20' | 'ERC20') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-12 md:space-y-20 animate-fade-in overflow-hidden">
            <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center pt-8 md:pt-20">
              <div className="absolute inset-0 z-0">
                 <img 
                  src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80&w=1920" 
                  alt="Background Mosque" 
                  className="w-full h-full object-cover opacity-10 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="text-center md:text-left rtl:md:text-right">
                  <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 tracking-wide uppercase">
                    {lang === 'en' ? 'Ramadan Campaign 2026' : 'حملة رمضان ٢٠٢٦'}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-bold text-emerald-950 mb-6 md:mb-8 leading-[1.2] md:leading-[1.1]">
                    {t.heroTitle}
                  </h1>
                  <p className="text-lg md:text-xl text-emerald-800/80 mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                    {t.heroSubtitle}
                  </p>
                  
                  <div className="md:hidden mb-10 transform scale-95">
                    <img 
                      src="https://cityupload.io/2026/01/thumbs-b-c-619c6fa539def76387b9b0dc11426f2a_f282f.jpg" 
                      alt="Dignified Resilience" 
                      className="rounded-3xl shadow-xl w-full h-[350px] object-cover border-4 border-white"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button onClick={() => setCurrentPage('donate')} className="px-8 md:px-10 py-4 md:py-5 bg-emerald-700 text-white font-bold text-lg rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-700/30 transform active:scale-95">
                      {t.ctaDonate}
                    </button>
                    <button onClick={() => setCurrentPage('about')} className="px-8 md:px-10 py-4 md:py-5 bg-white text-emerald-800 font-bold text-lg rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all active:scale-95">
                      {t.ctaHelp}
                    </button>
                  </div>
                </div>

                <div className="hidden md:block relative">
                  <div className="relative">
                    <img 
                      src="https://cityupload.io/2026/01/thumbs-b-c-619c6fa539def76387b9b0dc11426f2a_f282f.jpg" 
                      alt="Dignified Resilience" 
                      className="rounded-[3rem] shadow-2xl rotate-2 transform hover:rotate-0 transition-transform duration-1000 w-full h-[550px] object-cover"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-amber-400 p-8 rounded-3xl shadow-xl max-w-[280px] z-20">
                      <p className="text-emerald-900 font-bold text-lg leading-tight">
                        “{lang === 'en' ? 'The best charity is that given in Ramadan' : 'أفضل الصدقة صدقة في رمضان'}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <Countdown lang={lang} targetDate={stats.ramadanStartDate} />
              <StatsCounter lang={lang} stats={stats} />
              
              <div className="py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                <div className="order-2 md:order-1 px-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">{t.transparencyTitle}</h2>
                  <p className="text-emerald-700 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">{t.transparencySubtitle}</p>
                  <ul className="space-y-4 md:space-y-6">
                    {[t.transparency1, t.transparency2, t.transparency3].map((item, idx) => (
                      <li key={idx} className="flex items-start md:items-center gap-4 text-emerald-900 font-semibold text-base md:text-lg">
                        <div className="bg-emerald-100 p-2 md:p-3 rounded-full flex-shrink-0 mt-1 md:mt-0">
                           <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200" 
                    alt="Direct Impact Distribution" 
                    className="rounded-3xl md:rounded-[3rem] shadow-xl h-[300px] md:h-[500px] w-full object-cover" 
                  />
                </div>
              </div>

              <DonationSection lang={lang} onDonationComplete={handleDonation} />
            </div>
          </div>
        );
      case 'donate':
        return (
          <div className="max-w-4xl mx-auto py-12 md:py-20 px-4 md:px-6">
             <DonationSection lang={lang} onDonationComplete={handleDonation} />
          </div>
        );
      case 'privacy':
        const typedT = t as any;
        return (
          <div className="max-w-4xl mx-auto py-12 md:py-20 px-4 md:px-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-950 mb-6 text-center">{t.privacyTitle}</h1>
            <p className="text-center text-emerald-700 mb-12">{t.privacyIntro}</p>
            
            <div className="bg-white rounded-[2rem] shadow-sm border border-emerald-50 p-6 md:p-12 space-y-10">
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <section key={num} className="border-b border-emerald-50 pb-8 last:border-0 last:pb-0">
                  <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-4">
                    {typedT[`privacySection${num}Title`]}
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {typedT[`privacySection${num}Body`]}
                  </p>
                </section>
              ))}

              <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-4">
                  {t.privacySection9Title}
                </h2>
                <p className="text-emerald-800 mb-4">{t.privacySection9Body}</p>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-700 p-2 rounded-lg text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <a href={`mailto:${t.privacyEmail}`} className="text-emerald-700 font-bold hover:underline">{t.privacyEmail}</a>
                </div>
              </section>
            </div>
          </div>
        );
      case 'updates':
        return (
          <div className="max-w-5xl mx-auto py-12 md:py-20 px-4 md:px-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-12 text-center">{t.navUpdates}</h1>
            
            <div className="bg-white p-10 md:p-20 rounded-[2rem] shadow-sm border border-emerald-50 max-w-3xl mx-auto text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-950 mb-4">
                {lang === 'ar' ? "قريباً في رمضان" : "Coming Soon in Ramadan"}
              </h2>
              <p className="text-xl text-emerald-800 leading-relaxed font-semibold">
                {t.updatesComingSoon}
              </p>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-12 md:py-20 px-4 md:px-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-950 mb-10 text-center">{t.navAbout}</h1>
            
            <div className="space-y-12 text-lg md:text-xl text-emerald-900/90 leading-relaxed">
              <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-emerald-50">
                <p className="mb-6">
                  {lang === 'ar' ? (
                    <><strong>Sadaqah</strong> هي مبادرة أطلقها مجموعة من الشباب اجتمعوا على هدف واحد: إحياء روح الصدقة والتكافل في شهر رمضان، ومساعدة الأسر الفقيرة والمحتاجة.</>
                  ) : (
                    <><strong>Sadaqah</strong> is an initiative launched by a group of young people united by a single goal: reviving the spirit of charity and solidarity during the month of Ramadan, and helping poor and needy families.</>
                  )}
                </p>
                <p className="mb-6">
                  {lang === 'ar' ? (
                    <>بدأنا هذه المبادرة لأننا نؤمن أن الصدقة لا تحتاج إلى مال كثير، وأن تبرعًا بسيطًا، ولو بدولار واحد، يمكن أن يصنع فرقًا كبيرًا في حياة إنسان.</>
                  ) : (
                    <>We started this initiative because we believe that charity does not require a lot of money, and that a simple donation, even of one dollar, can make a significant difference in someone's life.</>
                  )}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-emerald-800 text-white p-8 md:p-10 rounded-[2rem] shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-amber-400">
                    {lang === 'ar' ? "لماذا الصدقة ولو بدولار واحد؟" : "Why Charity, even for $1?"}
                  </h2>
                  <p>
                    {lang === 'ar' ? (
                      <>لأن القلوب عندما تتحد، يتحول القليل إلى تغيير كبير، ولأن الصدقة الصغيرة اليوم قد تكون سببًا في ابتسامة طفل غدًا.</>
                    ) : (
                      <>Because when hearts unite, small acts turn into big changes. A small charity today might be the reason for a child's smile tomorrow.</>
                    )}
                  </p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-emerald-50">
                  <h2 className="text-2xl font-bold text-emerald-900 mb-6 border-b border-emerald-100 pb-4">
                    {lang === 'ar' ? "قيمنا الأساسية" : "Our Core Values"}
                  </h2>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-bold text-emerald-800">{lang === 'ar' ? "الشفافية:" : "Transparency:"}</h3>
                      <p className="text-base text-emerald-700">{lang === 'ar' ? "نلتزم بتوضيح كيفية استخدام التبرعات، وتتبع أثرها بكل وضوح." : "We are committed to clarifying how donations are used and tracking their impact clearly."}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="py-20 text-center text-emerald-900 text-xl font-bold">404 - Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfb]">
      <Navbar lang={lang} onToggleLang={toggleLang} onNavigate={setCurrentPage} />
      <main>{renderContent()}</main>
      <Footer lang={lang} onNavigate={setCurrentPage} />

      {usdtModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm" onClick={() => setUsdtModal({ ...usdtModal, isOpen: false })} />
          <div className="relative bg-white w-full max-w-lg rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h2 className="text-xl md:text-2xl font-bold text-emerald-900">{t.usdtTitle}</h2>
              <button onClick={() => setUsdtModal({ ...usdtModal, isOpen: false })} className="text-gray-400 hover:text-emerald-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-sm md:text-base text-gray-600">{t.usdtInstructions}</p>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 group relative">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase">TRC20 Address (USDT)</div>
                  <button 
                    onClick={() => copyToClipboard(CRYPTO_ADDRESSES.TRC20, 'TRC20')}
                    className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-md border border-emerald-100 hover:bg-emerald-50 transition-colors"
                  >
                    {copiedType === 'TRC20' ? (
                      <><span className="text-amber-600">Copied!</span><svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></>
                    ) : (
                      <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>Copy</>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs md:text-sm break-all pr-12 text-emerald-950 font-semibold">{CRYPTO_ADDRESSES.TRC20}</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 group relative">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[10px] md:text-xs font-bold text-emerald-600 uppercase">ERC20 Address (USDT)</div>
                  <button 
                    onClick={() => copyToClipboard(CRYPTO_ADDRESSES.ERC20, 'ERC20')}
                    className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-md border border-emerald-100 hover:bg-emerald-50 transition-colors"
                  >
                    {copiedType === 'ERC20' ? (
                      <><span className="text-amber-600">Copied!</span><svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></>
                    ) : (
                      <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>Copy</>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs md:text-sm break-all pr-12 text-emerald-950 font-semibold">{CRYPTO_ADDRESSES.ERC20}</div>
              </div>
            </div>
            <div className="flex justify-center py-2 md:py-4">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${CRYPTO_ADDRESSES.TRC20}`} alt="QR Code" className="w-32 h-32 md:w-40 md:h-40 border-8 border-white shadow-lg" />
            </div>
            <div className="space-y-4">
               <input type="text" placeholder={t.txHashPlaceholder} className="w-full p-4 border-2 border-emerald-100 rounded-xl focus:border-amber-500 outline-none text-sm text-emerald-950" />
              <button onClick={() => { alert(t.pendingVerification); setUsdtModal({ ...usdtModal, isOpen: false }); }} className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors active:scale-95">
                {t.submitHash}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
