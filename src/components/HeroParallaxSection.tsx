import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '../i18n';

const HeroParallaxSection = ({ language }: { language: 'it' | 'en' }) => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Preload hero image for better performance */}
      <img 
        src="https://i.postimg.cc/d08RRqjZ/Chat_GPT_Image_9_mar_2026_21_24_42.jpg" 
        alt="" 
        style={{ display: 'none' }} 
        fetchPriority="high" 
        decoding="async"
      />
      {/* Immagine di sfondo con effetto parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://i.postimg.cc/d08RRqjZ/Chat_GPT_Image_9_mar_2026_21_24_42.jpg')" }}
      >
        {/* Overlay scuro per migliorare la leggibilità del testo */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenuto centrato */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl font-serif mb-6 tracking-wide" data-i18n="parallax-title">
          {t('parallax-title', language)}
        </h1>
        <p className="max-w-xl text-lg md:text-xl font-light mb-8" data-i18n="parallax-desc">
          {t('parallax-desc', language)}
        </p>
        <Link to="/menu" className="border border-white/50 px-8 py-3 hover:bg-[#3999cc] hover:text-white transition-all duration-300 uppercase tracking-widest text-sm" data-i18n="parallax-button">
          {t('parallax-button', language)}
        </Link>
      </div>
    </section>
  );
};

export default HeroParallaxSection;
