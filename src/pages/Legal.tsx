import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { t, updateLanguage } from '../i18n';
import Footer from '../components/Footer';

export default function Legal() {
  const [language, setLanguageState] = useState<'it' | 'en'>(() => {
    return (localStorage.getItem('app-lang') as 'it' | 'en') || 'it';
  });

  const setLanguage = (lang: 'it' | 'en') => {
    setLanguageState(lang);
  };

  useEffect(() => {
    updateLanguage(language);
    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#041A25] font-sans selection:bg-[#000c7a] selection:text-white">
      {/* Header */}
      <header className="bg-white py-6 px-6 md:px-12 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="magnetic flex items-center text-[#041A25] hover:text-[#000c7a] transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium" data-i18n="faq-back">{t('faq-back', language)}</span>
          </Link>
          <img 
            src="https://i.postimg.cc/QtKkVZtp/Mini-logo-restiling-bianco.png" 
            alt="La Ola Logo" 
            className="h-12 brightness-0"
            referrerPolicy="no-referrer"
          />
          <div className="w-[120px] hidden md:flex justify-end">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium">
              <button 
                onClick={() => setLanguage('it')}
                className={`magnetic transition-colors ${language === 'it' ? 'text-[#000c7a]' : 'text-gray-400'}`}
              >
                ITA
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`magnetic transition-colors ${language === 'en' ? 'text-[#000c7a]' : 'text-gray-400'}`}
              >
                ENG
              </button>
            </div>
          </div>
          <div className="md:hidden flex justify-end">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium">
              <button 
                onClick={() => setLanguage('it')}
                className={`magnetic transition-colors ${language === 'it' ? 'text-[#000c7a]' : 'text-gray-400'}`}
              >
                ITA
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`magnetic transition-colors ${language === 'en' ? 'text-[#000c7a]' : 'text-gray-400'}`}
              >
                ENG
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#041A25] uppercase tracking-[0.2em] text-xs font-medium mb-4 block" data-i18n="legal-subtitle">{t('legal-subtitle', language)}</span>
            <h1 className="font-serif text-4xl md:text-5xl mb-6" data-i18n="legal-title">{t('legal-title', language)}</h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12"
          >
            {/* Privacy Policy */}
            <section id="privacy">
              <h2 className="font-serif text-3xl mb-2 text-[#041A25]" data-i18n="legal-privacy-title">{t('legal-privacy-title', language)}</h2>
              <p className="text-sm text-gray-400 mb-6 italic" data-i18n="legal-privacy-date">{t('legal-privacy-date', language)}</p>
              
              <p className="text-gray-600 font-light leading-relaxed mb-8" data-i18n="legal-privacy-p1">
                {t('legal-privacy-p1', language)}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-privacy-h1">{t('legal-privacy-h1', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-privacy-t1">{t('legal-privacy-t1', language)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-privacy-h2">{t('legal-privacy-h2', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-privacy-t2">{t('legal-privacy-t2', language)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-privacy-h3">{t('legal-privacy-h3', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-privacy-t3">{t('legal-privacy-t3', language)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-privacy-h4">{t('legal-privacy-h4', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-privacy-t4">{t('legal-privacy-t4', language)}</p>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Terms and Conditions */}
            <section id="terms">
              <h2 className="font-serif text-3xl mb-8 text-[#041A25]" data-i18n="legal-terms-title">{t('legal-terms-title', language)}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-terms-h1">{t('legal-terms-h1', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-terms-t1">{t('legal-terms-t1', language)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-terms-h2">{t('legal-terms-h2', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-terms-t2">{t('legal-terms-t2', language)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-terms-h3">{t('legal-terms-h3', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-terms-t3">{t('legal-terms-t3', language)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#041A25] mb-2" data-i18n="legal-terms-h4">{t('legal-terms-h4', language)}</h3>
                  <p className="text-gray-600 font-light leading-relaxed" data-i18n="legal-terms-t4">{t('legal-terms-t4', language)}</p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
