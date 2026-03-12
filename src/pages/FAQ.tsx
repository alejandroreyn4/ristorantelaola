import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { t, updateLanguage } from '../i18n';
import Footer from '../components/Footer';

export default function FAQ() {
  const [language, setLanguageState] = useState<'it' | 'en'>(() => {
    return (localStorage.getItem('app-lang') as 'it' | 'en') || 'it';
  });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const setLanguage = (lang: 'it' | 'en') => {
    setLanguageState(lang);
  };

  useEffect(() => {
    updateLanguage(language);
  }, [language]);

  const faqItems = [
    { id: 1, question: t('faq-q1', language), answer: t('faq-a1', language) },
    { id: 3, question: t('faq-q3', language), answer: t('faq-a3', language) },
    { id: 4, question: t('faq-q4', language), answer: t('faq-a4', language) },
    { id: 5, question: t('faq-q5', language), answer: t('faq-a5', language) },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#041A25] font-sans selection:bg-[#000c7a] selection:text-white">
      {/* Header */}
      <header className="bg-white py-6 px-6 md:px-12 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="magnetic flex items-center text-[#041A25] hover:text-[#000c7a] transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium" data-i18n="faq-back">{t('faq-back', language)}</span>
          </a>
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
            <span className="text-[#041A25] uppercase tracking-[0.2em] text-xs font-medium mb-4 block" data-i18n="faq-subtitle">{t('faq-subtitle', language)}</span>
            <h1 className="font-serif text-4xl md:text-6xl mb-6" data-i18n="faq-title">{t('faq-title', language)}</h1>
            <p className="text-gray-500 font-light leading-relaxed" data-i18n="faq-desc">
              {t('faq-desc', language)}
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="magnetic w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-serif text-xl pr-8" data-i18n={`faq-q${faq.id}`}>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#041A25] shrink-0"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed border-t border-gray-50 pt-4" data-i18n={`faq-a${faq.id}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>


        <div className="max-w-3xl mx-auto mt-20 text-center bg-white p-10 rounded-2xl shadow-sm">
          <h3 className="font-serif text-2xl mb-4" data-i18n="faq-moreQuestions">{t('faq-moreQuestions', language)}</h3>
          <p className="text-gray-500 font-light mb-8" data-i18n="faq-contactDesc">
            {t('faq-contactDesc', language)}
          </p>
          <a 
            href="https://wa.me/3349109138?partnertoken=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3dhLm1lLzMzNDkxMDkxMzgiLCJleHAiOjE3NzI4NDEzMzMsImlzcyI6Ikdvb2dsZSIsImlhdCI6MTc3Mjg0MTAzM30.dQJl0ZQNlHTHRri2IuzFwZkDxzagO0DytBZEjCJtqiMKE8VOT0xxGAvE2jL9Erwjd5VTl6Q5hld3bysGxMdnvA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#000c7a] text-white hover:bg-[#3999cc] transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium rounded-lg"
            data-i18n="faq-contactButton"
          >
            {t('faq-contactButton', language)}
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
