import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Facebook, Twitter, Menu, X, ArrowRight, ChevronRight, ArrowUp, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { translations, updateLanguage, t } from './i18n';
import HeroParallaxSection from './components/HeroParallaxSection';
import DualImageTextSection from './components/DualImageTextSection';
import ScrollRevealGallery from './components/ScrollRevealGallery';
import PageLoader from './components/PageLoader';
import Footer from './components/Footer';

const restaurantSections = [
  {
    id: 'sala-1',
    image: 'https://i.postimg.cc/1Xnh5L9n/Chat_GPT_Image_8_mar_2026_02_45_00.png',
    color: '#041A25'
  },
  {
    id: 'sala-2',
    image: 'https://i.postimg.cc/vTwzF48q/Chat-GPT-Image-9-mar-2026-21-21-07.png',
    color: '#041A25'
  },
  {
    id: 'sala-3',
    image: 'https://i.postimg.cc/Pq8YXdRg/Chat-GPT-Image-9-mar-2026-21-24-38.png',
    color: '#041A25'
  },
  {
    id: 'sala-4',
    image: 'https://i.postimg.cc/fbxyqyPg/Chat-GPT-Image-9-mar-2026-21-27-22.png',
    color: '#041A25'
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const typewriterContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const typewriterChar = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const TypewriterText = ({ text, className, language }: { text: string; className?: string; language: string }) => {
  const characters = text.split("");

  return (
    <motion.h2
      className={className}
      variants={typewriterContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <motion.span key={`${language}-${index}`} variants={typewriterChar}>
          {char === "\n" ? <br /> : char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const galleryImages = [
  { id: 1, url: 'https://i.postimg.cc/mDpjpJ30/img_20180908_wa0022_largejpg.jpg', title: 'Suggestivo, sereno, conviviale' },
  { id: 2, url: 'https://i.postimg.cc/fLqCqpjN/photo0jpg.jpg', title: 'Mediterraneo, autentico, irresistibile' },
  { id: 3, url: 'https://i.postimg.cc/TwN0NFqG/unnamed.webp', title: 'Mediterraneo, autentico, irresistibile' },
  { id: 4, url: 'https://i.postimg.cc/76t9tdM8/unnamed_(1).webp', title: 'Solare, conviviale, mediterraneo' },
  { id: 5, url: 'https://i.postimg.cc/bJVgVWHf/unnamed_(2).webp', title: 'Incantevole, vivace, notturno' },
  { id: 6, url: 'https://i.postimg.cc/tTvkvwtH/unnamed_(3).webp', title: 'Sapori di Mare' },
];

const heroImages = [
  "https://i.postimg.cc/mgy00P13/1.jpg",
  "https://i.postimg.cc/SxCPcJGm/2.jpg",
  "https://i.postimg.cc/YS7sRMX2/3.png",
  "https://i.postimg.cc/y8cG0kT6/4.jpg"
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AnimatedBookingButton = ({ className = "", isFixed = false, isVisible = true, language }: { className?: string, isFixed?: boolean, isVisible?: boolean, language: 'it' | 'en' }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/3349109138?partnertoken=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3dhLm1lLzMzNDkxMDkxMzgiLCJleHAiOjE3NzI4NDEzMzMsImlzcyI6Ikdvb2dsZSIsImlhdCI6MTc3Mjg0MTAzM30.dQJl0ZQNlHTHRri2IuzFwZkDxzagO0DytBZEjCJtqiMKE8VOT0xxGAvE2jL9Erwjd5VTl6Q5hld3bysGxMdnvA"
          target="_blank"
          rel="noopener noreferrer"
          initial={isFixed ? { opacity: 0, scale: 0.5 } : { opacity: 1 }}
          animate={isFixed ? { opacity: 1, scale: 1 } : { opacity: 1 }}
          exit={isFixed ? { opacity: 0, scale: 0.5 } : { opacity: 0 }}
          className={`${isFixed ? 'fixed bottom-24 right-8 z-[100] w-24 h-24 md:w-32 md:h-32' : 'relative w-40 h-40 md:w-48 md:h-48'} bg-[#000c7a] rounded-full flex items-center justify-center group shadow-2xl ${className}`}
          whileHover={{ scale: 1.05, backgroundColor: '#3999cc' }}
          whileTap={{ scale: 0.95, backgroundColor: '#3999cc' }}
        >
          {/* Rotating Text Container */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                />
              </defs>
              <text className={`${isFixed ? 'text-[7px] md:text-[8px]' : 'text-[6px] md:text-[7px]'} uppercase tracking-[0.4em] fill-white font-medium`}>
                <textPath xlinkHref="#circlePath" data-i18n="booking-circle" startOffset="50%" textAnchor="middle">
                  {t('booking-circle', language)}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Central Circle with Cloche Icon */}
          <div className={`${isFixed ? 'w-12 h-12 md:w-16 md:h-16' : 'w-20 h-20 md:w-24 md:h-24'} bg-white rounded-full flex items-center justify-center shadow-inner z-10 group-hover:bg-white transition-colors duration-500`}>
            <svg className={`magnetic ${isFixed ? 'w-6 h-6 md:w-8 md:h-8' : 'w-10 h-10 md:w-12 md:h-12'} text-[#000c7a] group-hover:text-[#3999cc] transition-colors duration-300`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18h18" />
              <path d="M5 18c0-3.866 3.134-7 7-7s7 3.134 7 7" />
              <path d="M12 11V8" />
              <circle cx="12" cy="7" r="1" fill="currentColor" />
            </svg>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [language, setLanguageState] = useState<'it' | 'en'>(() => {
    return (localStorage.getItem('app-lang') as 'it' | 'en') || 'it';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [heroBgIndex, setHeroBgIndex] = useState(() => Math.floor(Math.random() * heroImages.length));
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const setLanguage = (lang: 'it' | 'en') => {
    setLanguageState(lang);
  };

  useEffect(() => {
    // Aggiorna tutti i testi data-i18n quando cambia la lingua
    updateLanguage(language);
  }, [language]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
      
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        const footerRect = footerRef.current?.getBoundingClientRect();
        
        // Show button when the top of the about section reaches the top of the viewport
        // and hide it when the footer starts to appear near the button
        const isFooterVisible = footerRect ? footerRect.top < window.innerHeight - 100 : false;
        setShowFloatingButton(rect.top <= 100 && !isFooterVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email connection
    setReservationSuccess(true);
    setTimeout(() => {
      setIsReservationModalOpen(false);
      setReservationSuccess(false);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#041A25] font-sans selection:bg-[#000c7a] selection:text-white">
      
      {/* Reservation Modal */}
      <AnimatePresence>
        {isReservationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#041A25]/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg p-8 md:p-12 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsReservationModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#041A25] transition-colors"
              >
                <X size={24} />
              </button>

              {reservationSuccess ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <ChevronRight size={40} className="rotate-[-90deg]" />
                  </motion.div>
                  <h3 className="font-serif text-3xl mb-4 text-[#041A25]" data-i18n="res-success">{t('res-success', language)}</h3>
                  <p className="text-gray-500" data-i18n="res-success-desc">{t('res-success-desc', language)}</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <span className="text-[#041A25] uppercase tracking-[0.2em] text-xs font-medium mb-2 block" data-i18n="res-title">{t('res-title', language)}</span>
                    <h2 className="font-serif text-4xl text-[#041A25]" data-i18n="res-subtitle">{t('res-subtitle', language)}</h2>
                  </div>

                  <form onSubmit={handleReservationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400" data-i18n="res-date">{t('res-date', language)}</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            required
                            type="date" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-100 focus:border-[#F0C808] outline-none transition-colors text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400" data-i18n="res-time">{t('res-time', language)}</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            required
                            type="time" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-100 focus:border-[#F0C808] outline-none transition-colors text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400" data-i18n="res-people">{t('res-people', language)}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select className="w-full pl-10 pr-4 py-3 border border-gray-100 focus:border-[#F0C808] outline-none transition-colors text-sm bg-transparent appearance-none">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? t('res-person', language) : t('res-people', language)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400" data-i18n="res-email">{t('res-email', language)}</label>
                      <input 
                        required
                        type="email" 
                        placeholder={t('res-email', language)}
                        className="w-full px-4 py-3 border border-gray-100 focus:border-[#F0C808] outline-none transition-colors text-sm"
                        data-i18n-placeholder="res-email"
                      />
                    </div>

                    <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[#000c7a] text-white hover:bg-[#3999cc] transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium"
                      data-i18n="res-confirm"
                    >
                      {t('res-confirm', language)}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Window Transition Panels removed as requested */}

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center md:grid md:grid-cols-3">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 -ml-2 ${isScrolled ? 'text-[#041A25]' : 'text-white'}`}
            >
              <Menu size={28} />
            </button>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <Link 
              to="/menu" 
              className={`magnetic text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 ${isScrolled ? 'text-[#041A25]' : 'text-white/90'}`}
              data-i18n="nav-menu"
            >
              {t('nav-menu', language)}
            </Link>
            <a 
              href="#il-ristorante" 
              className={`magnetic text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 ${isScrolled ? 'text-[#041A25]' : 'text-white/90'}`}
              data-i18n="nav-about"
            >
              {t('nav-about', language)}
            </a>
          </div>
          
          <div className="flex justify-center flex-1 md:flex-none">
            <a href="#" className="magnetic flex items-center">
              <img 
                src="https://i.postimg.cc/QtKkVZtp/Mini-logo-restiling-bianco.png" 
                alt="La Ola Logo" 
                className={`h-20 md:h-24 transition-all duration-300 ${isScrolled ? 'brightness-0' : ''}`}
                referrerPolicy="no-referrer"
              />
            </a>
          </div>
          
          {/* Mobile Language Switcher */}
            <div className="md:hidden flex-1 flex justify-end">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium">
                <button 
                  onClick={() => setLanguage('it')}
                  className={`transition-colors drop-shadow-sm ${language === 'it' ? (isScrolled ? 'text-[#000c7a]' : 'text-white') : (isScrolled ? 'text-gray-400' : 'text-white/60')}`}
                >
                  ITA
                </button>
                <span className={`drop-shadow-sm ${isScrolled ? 'text-gray-300' : 'text-white/30'}`}>|</span>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`transition-colors drop-shadow-sm ${language === 'en' ? (isScrolled ? 'text-[#000c7a]' : 'text-white') : (isScrolled ? 'text-gray-400' : 'text-white/60')}`}
                >
                  ENG
                </button>
              </div>
            </div>
          
          <div className="hidden md:flex space-x-10 items-center justify-end">
            <a 
              href="#contatti" 
              className={`magnetic text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 ${isScrolled ? 'text-[#041A25]' : 'text-white/90'}`}
              data-i18n="nav-contact"
            >
              {t('nav-contact', language)}
            </a>
            <Link 
              to="/faq" 
              className={`magnetic text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 ${isScrolled ? 'text-[#041A25]' : 'text-white/90'}`}
              data-i18n="nav-faq"
            >
              {t('nav-faq', language)}
            </Link>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-medium">
              <button 
                onClick={() => setLanguage('it')}
                className={`transition-colors ${language === 'it' ? (isScrolled ? 'text-[#000c7a]' : 'text-white') : (isScrolled ? 'text-gray-400' : 'text-white/40')}`}
              >
                ITA
              </button>
              <span className={isScrolled ? 'text-gray-300' : 'text-white/20'}>|</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? (isScrolled ? 'text-[#000c7a]' : 'text-white') : (isScrolled ? 'text-gray-400' : 'text-white/40')}`}
              >
                ENG
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#041A25] text-white flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col space-y-8 text-center">
              <Link 
                to="/menu" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-4xl hover:text-[#000c7a] transition-colors"
                data-i18n="nav-menu"
              >
                {t('nav-menu', language)}
              </Link>
              <a 
                href="#il-ristorante" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-4xl hover:text-[#000c7a] transition-colors"
                data-i18n="nav-about"
              >
                {t('nav-about', language)}
              </a>
              <a 
                href="#contatti" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-4xl hover:text-[#000c7a] transition-colors"
                data-i18n="nav-contact"
              >
                {t('nav-contact', language)}
              </a>
              <Link 
                to="/faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-4xl hover:text-[#000c7a] transition-colors"
                data-i18n="nav-faq"
              >
                {t('nav-faq', language)}
              </Link>
              
              <div className="flex items-center justify-center space-x-4 pt-8 text-sm uppercase tracking-[0.3em] font-medium">
                <button 
                  onClick={() => {
                    setLanguage('it');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`transition-colors ${language === 'it' ? 'text-[#000c7a]' : 'text-white/40'}`}
                >
                  ITA
                </button>
                <span className="text-white/20">|</span>
                <button 
                  onClick={() => {
                    setLanguage('en');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`transition-colors ${language === 'en' ? 'text-[#000c7a]' : 'text-white/40'}`}
                >
                  ENG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#041A25]">
          <AnimatePresence mode="wait">
            <motion.img 
              key={heroBgIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              src={heroImages[heroBgIndex]} 
              alt="Restaurant Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 text-white/80"
            data-i18n="hero-subtitle"
          >
            {t('hero-subtitle', language)}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-3xl md:text-5xl mb-8 leading-none tracking-tight md:whitespace-nowrap"
            data-i18n="hero-title"
          >
            {t('hero-title', language)}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href="https://wa.me/3349109138?partnertoken=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3dhLm1lLzMzNDkxMDkxMzgiLCJleHAiOjE3NzI4NDEzMzMsImlzcyI6Ikdvb2dsZSIsImlhdCI6MTc3Mjg0MTAzM30.dQJl0ZQNlHTHRri2IuzFwZkDxzagO0DytBZEjCJtqiMKE8VOT0xxGAvE2jL9Erwjd5VTl6Q5hld3bysGxMdnvA"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic inline-block px-8 py-4 bg-[#000c7a] text-white hover:bg-[#3999cc] transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium rounded-lg"
                data-i18n="hero-book"
              >
                {t('hero-book', language)}
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-3" data-i18n="hero-scroll">{t('hero-scroll', language)}</span>
          <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      <AnimatedBookingButton isFixed isVisible={showFloatingButton} language={language} />

      {/* Experience Section */}
      <section id="chi-siamo" ref={aboutSectionRef} className="pt-24 pb-12 bg-white px-6 overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <TypewriterText 
            text={t('experience-title', language)}
            language={language}
            className="font-serif text-[32px] md:text-[55px] mb-8 leading-tight text-[#041A25] whitespace-pre-wrap"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-[19px] text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            data-i18n="experience-p1"
          >
            {t('experience-p1', language)}
          </motion.p>
        </div>

        {/* Plates Section */}
        <div className="pb-16 md:pb-24 overflow-hidden">
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {/* First set of images */}
            <div className="flex gap-2 md:gap-4 pr-2 md:pr-4">
              {[
                'https://i.postimg.cc/8cM3d33T/carne.png',
                'https://i.postimg.cc/d3rXRXXs/crostini.png',
                'https://i.postimg.cc/yxc5h55V/fritto_misto.png',
                'https://i.postimg.cc/gj85y55c/gamberi_alla_piastra.png',
                'https://i.postimg.cc/ZnpgPggC/gnocchi_e_gamberi.png',
                'https://i.postimg.cc/RhK81886/muscoli.png',
                'https://i.postimg.cc/90ZSPSSD/polpo.png',
                'https://i.postimg.cc/5yLG5GGH/polpo_insalata.png',
                'https://i.postimg.cc/G3yZ18pz/scoglio.png',
              ].map((url, i) => (
                <div key={`set1-${i}`} className="flex-none w-[280px] h-[280px] md:w-[540px] md:h-[540px] bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                  <img 
                    src={url} 
                    alt="Piatto" 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            {/* Second set of images for seamless loop */}
            <div className="flex gap-2 md:gap-4 pr-2 md:pr-4">
              {[
                'https://i.postimg.cc/8cM3d33T/carne.png',
                'https://i.postimg.cc/d3rXRXXs/crostini.png',
                'https://i.postimg.cc/yxc5h55V/fritto_misto.png',
                'https://i.postimg.cc/gj85y55c/gamberi_alla_piastra.png',
                'https://i.postimg.cc/ZnpgPggC/gnocchi_e_gamberi.png',
                'https://i.postimg.cc/RhK81886/muscoli.png',
                'https://i.postimg.cc/90ZSPSSD/polpo.png',
                'https://i.postimg.cc/5yLG5GGH/polpo_insalata.png',
                'https://i.postimg.cc/G3yZ18pz/scoglio.png',
              ].map((url, i) => (
                <div key={`set2-${i}`} className="flex-none w-[280px] h-[280px] md:w-[540px] md:h-[540px] bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                  <img 
                    src={url} 
                    alt="Piatto" 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <HeroParallaxSection language={language} />

      <section id="il-ristorante" className="relative bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-20 text-[#041A25]">
          <span className="text-sm uppercase tracking-[0.3em] opacity-60 mb-8 block text-[#041A25]" data-i18n="about-label">{t('about-label', language)}</span>
          <h2 className="font-serif text-[32px] md:text-[40px] mb-12 whitespace-nowrap" data-i18n="about-title">{t('about-title', language)}</h2>
          <div className="text-[17px] font-light leading-relaxed space-y-8 text-gray-700">
            <p data-i18n="about-p1">
              {t('about-p1', language)}
            </p>
            <p data-i18n="about-p2">
              {t('about-p2', language)}
            </p>
          </div>
        </div>
      </section>

      {/* New Animated Image Section */}
      <ScrollRevealGallery language={language} />

      {/* Reviews Section */}
      <section className="py-20 bg-white px-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <span className="text-[#041A25] uppercase tracking-[0.2em] text-[10px] font-medium mb-2 block" data-i18n="reviews-subtitle">{t('reviews-subtitle', language)}</span>
          <h2 className="font-serif text-3xl md:text-4xl" data-i18n="reviews-title">{t('reviews-title', language)}</h2>
        </div>

        <div className="relative flex overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[
              { name: "Alessio", text: "È un luogo unico: una terrazza sul mare, sembra di essere su uno yacht in rada." },
              { name: "Vito", text: "Posto su una terrazza direttamente sul mare. Cibo di buona qualità e personale molto disponibile." },
              { name: "Mitri", text: "Una bella scoperta consigliata da amici del luogo. Una buona cucina e una vista sul mare incredibile." },
              { name: "Ninni", text: "Sono stata con amici, la location è molto carina terrazze sul mare, il cibo è davvero ottimo." },
              { name: "Chiara", text: "Puoi goderti il Mar Mediterraneo ai tuoi piedi mentre ti godi un pranzo fantastico." },
              { name: "Piero B", text: "Locale accogliente con splendida vista sul mare. Abbiamo gustato tartare di tonno e ravioli di pesce." },
              // Repeated for loop
              { name: "Alessio", text: "È un luogo unico: una terrazza sul mare, sembra di essere su uno yacht in rada." },
              { name: "Vito", text: "Posto su una terrazza direttamente sul mare. Cibo di buona qualità e personale molto disponibile." },
              { name: "Mitri", text: "Una bella scoperta consigliata da amici del luogo. Una buona cucina e una vista sul mare incredibile." },
              { name: "Ninni", text: "Sono stata con amici, la location è molto carina terrazze sul mare, il cibo è davvero ottimo." },
              { name: "Chiara", text: "Puoi goderti il Mar Mediterraneo ai tuoi piedi mentre ti godi un pranzo fantastico." },
              { name: "Piero B", text: "Locale accogliente con splendida vista sul mare. Abbiamo gustato tartare di tonno e ravioli di pesce." }
            ].map((review, i) => (
              <div
                key={`review-${i}`}
                className="inline-block w-[280px] md:w-[320px] bg-white p-6 rounded-xl border border-gray-100 mx-4"
              >
                <div className="text-[#041A25] mb-2 flex">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 font-light italic mb-3 text-[12px] leading-relaxed whitespace-normal">"{review.text}"</p>
                <div className="font-serif text-[13px]">{review.name}</div>
              </div>
            ))}
          </motion.div>
          
          {/* Fading edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer ref={footerRef} language={language} />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-auto max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="text-white font-serif text-2xl md:text-3xl mt-8 text-center italic">
                {selectedImage.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
