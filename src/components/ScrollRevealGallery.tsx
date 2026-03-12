import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { t } from '../i18n';

interface ScrollRevealGalleryProps {
  language: 'it' | 'en';
}

export default function ScrollRevealGallery({ language }: ScrollRevealGalleryProps) {
  const slides = [
    {
      title: t('slide-reach-title', language),
      text: t('slide-reach-text', language),
      key: 'slide-reach'
    },
    {
      title: t('slide-train-title', language),
      text: t('slide-train-text', language),
      key: 'slide-train'
    },
    {
      title: t('slide-bus-title', language),
      text: t('slide-bus-text', language),
      key: 'slide-bus'
    },
    {
      title: t('slide-car-title', language),
      text: t('slide-car-text', language),
      key: 'slide-car'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="w-full py-10 overflow-hidden">
      {/* Immagine principale */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full mb-10 overflow-hidden relative"
      >
        <motion.div
          variants={{
            hidden: { x: "100%" },
            visible: { x: 0 }
          }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="w-full"
        >
          <img
            src="https://i.postimg.cc/htPLTGL8/Chat-GPT-Image-9-mar-2026-21-27-22.jpg"
            alt="Immagine principale"
            className="w-full h-auto"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </motion.div>

      {/* Due immagini affiancate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10">
        {/* Terza immagine (sinistra) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full flex flex-col"
        >
          <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden relative mb-6">
            <motion.div
              variants={{
                hidden: { y: "-100%" },
                visible: { y: 0 }
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              className="w-full h-full absolute inset-0"
            >
              <img
                src="https://i.postimg.cc/vTwzF48q/Chat_GPT_Image_9_mar_2026_21_21_07.png"
                alt="Terza immagine"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center md:text-left px-2"
          >
            <h3 className="font-serif text-2xl text-[#041A25] mb-3" data-i18n="gallery-sapore-title">
              {t('gallery-sapore-title', language)}
            </h3>
            <p className="text-gray-600 font-light leading-relaxed italic" data-i18n="gallery-sapore-desc">
              {t('gallery-sapore-desc', language)}
            </p>
          </motion.div>
        </motion.div>
        
        {/* Immagine inferiore destra */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full flex flex-col"
        >
          <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden relative mb-6">
            <motion.div
              variants={{
                hidden: { x: "100%" },
                visible: { x: 0 }
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
              className="w-full h-full absolute inset-0"
            >
              <img
                src="https://i.postimg.cc/Pq8YXdRg/Chat_GPT_Image_9_mar_2026_21_24_38.png"
                alt="Immagine inferiore destra"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center md:text-left px-2"
          >
            <h3 className="font-serif text-2xl text-[#041A25] mb-3" data-i18n="gallery-dipinto-title">
              {t('gallery-dipinto-title', language)}
            </h3>
            <p className="text-gray-600 font-light leading-relaxed italic" data-i18n="gallery-dipinto-desc">
              {t('gallery-dipinto-desc', language)}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Immagine finale centrata */}
      <div className="w-full flex flex-col items-center mt-24 px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-6xl h-[50vh] md:h-[80vh] overflow-hidden relative mb-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 0 }
            }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-0 bg-white z-10 pointer-events-none"
          />
          <img
            src="https://i.postimg.cc/rz2tHnWT/Chat-GPT-Image-10-mar-2026-15-47-07-(1).jpg"
            alt="Immagine finale"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Carousel di testo */}
        <div className="w-full max-w-3xl min-h-[200px] flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <h2 className="font-serif text-3xl text-[#041A25] mb-6 tracking-wide" data-i18n={`${slides[currentSlide].key}-title`}>
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed max-w-2xl mx-auto" data-i18n={`${slides[currentSlide].key}-text`}>
                {slides[currentSlide].text}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Indicatori */}
          <div className="flex gap-3 mt-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'bg-[#041A25] w-8' : 'bg-gray-300'
                }`}
                aria-label={`Vai alla slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
