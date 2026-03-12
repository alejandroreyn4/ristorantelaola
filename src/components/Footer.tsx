import React, { forwardRef } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { t } from '../i18n';

interface FooterProps {
  language: 'it' | 'en';
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ language }, ref) => {
  return (
    <footer ref={ref} id="contatti" className="relative text-white pt-20 pb-12 px-0 scroll-mt-20 overflow-hidden bg-[#041A25]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <img 
          src="https://i.postimg.cc/DyMbs3QW/Footer.png" 
          alt="Footer Landscape" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#041A25]/60" />
      </div>
      
      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <img 
              src="https://i.postimg.cc/qqg1Lj8f/logo_la_ola_restiling_1_bianco.png" 
              alt="La Ola Logo" 
              className="h-24 md:h-32 mb-8"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm font-light leading-relaxed text-white/70 max-w-xs" data-i18n="about-p1">
              {t('about-p1', language)}
            </p>
          </div>
          
          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="text-white font-serif text-xl mb-6" data-i18n="footer-contact-title">{t('footer-contact-title', language)}</h4>
            <ul className="space-y-4 font-light text-sm text-white/70">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 shrink-0 text-[#3999cc]" fill="#3999cc" />
                <span>La Ola Ristorante Bar<br/>Via Quinto al mare 14 R canc.<br/>Genova, GE 16166</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-0.5 shrink-0 text-[#3999cc]" fill="#3999cc" />
                <div className="flex flex-col items-start gap-1">
                  <span>Tel. 010 3202817</span>
                  <span>Cel. 334 9109138</span>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Hours Column */}
          <div className="md:col-span-3">
            <h4 className="text-white font-serif text-xl mb-6" data-i18n="footer-hours-title">{t('footer-hours-title', language)}</h4>
            <ul className="space-y-3 font-light text-sm text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span data-i18n="footer-lunch">{t('footer-lunch', language)}</span>
                <span className="font-medium text-white">12:00 - 14:30</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span data-i18n="footer-dinner">{t('footer-dinner', language)}</span>
                <span className="font-medium text-white">19:00 - 21:30</span>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="md:col-span-2">
            <h4 className="text-white font-serif text-xl mb-6">Social</h4>
            <ul className="space-y-3 font-light text-sm text-white/70">
              <li>
                <a href="https://www.facebook.com/laola.genova" target="_blank" rel="noopener noreferrer" className="hover:text-[#45bde6] transition-colors flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="Facebook" className="w-4 h-4 brightness-200" referrerPolicy="no-referrer" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.tripadvisor.it/Restaurant_Review-g187823-d3418570-Reviews-La_Ola_Pizzeria_Ristorante_Bar-Genoa_Italian_Riviera_Liguria.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#45bde6] transition-colors flex items-center gap-2">
                  <img src="https://i.postimg.cc/qB6HH1sy/pngwing-com.png" alt="TripAdvisor" className="w-4 h-4 brightness-200" referrerPolicy="no-referrer" />
                  TripAdvisor
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-[11px] uppercase tracking-[0.2em] font-medium pt-8 border-t border-white/10 text-white/40">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} La Ola Restaurant. <span data-i18n="footer-rights">{t('footer-rights', language)}</span></p>
          
          <div className="flex justify-center">
            <span>
              Designed by <a href="https://kriollo-design-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-white/60 hover:text-[#45bde6] transition-colors ml-1">Kriollo Design</a>
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-2 md:gap-4">
            <Link to="/legal#privacy" className="hover:text-[#45bde6] transition-colors text-white/60" data-i18n="footer-privacy">{t('footer-privacy', language)}</Link>
            <Link to="/legal#terms" className="hover:text-[#45bde6] transition-colors text-white/60" data-i18n="footer-terms">{t('footer-terms', language)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
