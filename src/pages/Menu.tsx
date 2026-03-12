import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, ArrowUp, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { t, updateLanguage } from '../i18n';
import Footer from '../components/Footer';

const menuData = [
  // Antipasti
  { id: 1, category: 'antipasti', name: 'Muscoli alla marinara con peperoncino', desc: '', price: '€12', type: 'mare' },
  { id: 3, category: 'antipasti', name: 'Tartare di gamberi con bufala e granella di pistacchio', desc: '', price: '€15', type: 'mare' },
  { id: 4, category: 'antipasti', name: 'Insalata tiepida di polpo* con patate e olive taggiasche', desc: '', price: '€16', type: 'mare' },
  { id: 5, category: 'antipasti', name: 'Tartare di tonno con cialdine di parmigiano', desc: '', price: '€18', type: 'mare' },
  { id: 6, category: 'antipasti', name: 'Brandacujun su crostini e insalatina', desc: '', price: '€12', type: 'mare' },
  { id: 8, category: 'antipasti', name: 'Caprese di bufala', desc: '', price: '€10', type: 'terra' },

  // Primi
  { id: 9, category: 'primi', name: 'Spaghetti allo scoglio*', desc: '', price: '€18', type: 'mare' },
  { id: 10, category: 'primi', name: 'Spaghetti alle vongole con bottarga di muggine', desc: '', price: '€16', type: 'mare' },
  { id: 11, category: 'primi', name: 'Gnocchi alle 5 Terre, gamberoni, pachino e pesto', desc: '', price: '€14', type: 'mare' },
  { id: 12, category: 'primi', name: 'Paccheri al veliero', desc: '', price: '€15', type: 'mare' },
  { id: 13, category: 'primi', name: 'Ravioli di pesce ai frutti di mare* e pachino', desc: '', price: '€15', type: 'mare' },
  { id: 14, category: 'primi', name: 'Ravioli di zucca con burro, salvia e granella di pistacchio', desc: '', price: '€13', type: 'terra' },
  { id: 15, category: 'primi', name: 'Gnocchetti al pesto genovese', desc: '', price: '€11', type: 'terra' },

  // Secondi
  { id: 16, category: 'secondi', name: 'Zuppetta piccante di muscoli e vongole', desc: '', price: '€17', type: 'mare' },
  { id: 17, category: 'secondi', name: 'Gamberoni* alla griglia', desc: '', price: '€18', type: 'mare' },
  { id: 18, category: 'secondi', name: 'Orata o branzino alla piastra', desc: '', price: '€16', type: 'mare' },
  { id: 19, category: 'secondi', name: 'Grigliata mista di mare', desc: '', price: '€23', type: 'mare' },
  { id: 20, category: 'secondi', name: 'Frittura di baccalà* e acciughe*', desc: '', price: '€16', type: 'mare' },
  { id: 21, category: 'secondi', name: 'Frittura di calamari* e gamberi*', desc: '', price: '€18', type: 'mare' },
  { id: 22, category: 'secondi', name: 'Frittura di calamari*', desc: '', price: '€17', type: 'mare' },
  { id: 23, category: 'secondi', name: 'Tataki di tonno in crosta di sesamo con verdurine', desc: '', price: '€22', type: 'mare' },
  { id: 24, category: 'secondi', name: 'Polpo* alla piastra su crema di piselli e bufala', desc: '', price: '€20', type: 'mare' },
  { id: 25, category: 'secondi', name: 'Tagliata di manzo con rucola e grana', desc: '', price: '€17', type: 'terra' },

  // Contorni
  { id: 27, category: 'contorni', name: 'Patatine* fritte', desc: '', price: '€5', type: 'terra' },
  { id: 28, category: 'contorni', name: 'Insalata mista', desc: '', price: '€4', type: 'terra' },
  { id: 29, category: 'contorni', name: 'Verdure miste saltate', desc: '', price: '€5', type: 'terra' },
  { id: 30, category: 'contorni', name: 'Verza viola in agrodolce', desc: '', price: '€5', type: 'terra' },

  // Dessert
  { id: 31, category: 'dessert', name: 'Proposta del giorno', desc: '', price: '€6', type: 'dessert' },
  { id: 32, category: 'dessert', name: 'Panna cotta liscia, con crema ai frutti di bosco, cioccolato o caramello', desc: '', price: '€4', type: 'dessert' },
  { id: 33, category: 'dessert', name: 'Torta meringata liscia, con crema ai frutti di bosco, cioccolato o caramello', desc: '', price: '€4', type: 'dessert' },
  { id: 34, category: 'dessert', name: 'Gelato alla crema', desc: '', price: '€4', type: 'dessert' },
  { id: 35, category: 'dessert', name: 'Gelato alla crema affogato con crema ai frutti di bosco, cioccolato, caramello, caffè o whiskey', desc: '', price: '€7', type: 'dessert' },
  { id: 36, category: 'dessert', name: 'Cheesecake alle fragole', desc: '', price: '€5', type: 'dessert' },
  { id: 37, category: 'dessert', name: 'Semifreddo al torroncino', desc: '', price: '€5', type: 'dessert' },
  { id: 38, category: 'dessert', name: 'Sorbetto della casa', desc: '', price: '€5', type: 'dessert' },
  { id: 39, category: 'dessert', name: 'Sorbetto della casa con liquore', desc: '', price: '€6', type: 'dessert' },
  { id: 40, category: 'dessert', name: 'Gelato al cocco', desc: '', price: '€6', type: 'dessert' },
  { id: 41, category: 'dessert', name: 'Ananas al naturale', desc: '', price: '€4', type: 'dessert' },
  { id: 42, category: 'dessert', name: 'Ananas con gelato o con liquore', desc: '', price: '€6', type: 'dessert' },

  // Menu per bambini
  { id: 43, category: 'bambini', name: 'Trofie al pesto', desc: '(grano - uova - latte)', price: '€9', type: 'vegetariano' },
  { id: 44, category: 'bambini', name: 'Penne al pomodoro', desc: '(grano)', price: '€8', type: 'vegetariano' },
  { id: 45, category: 'bambini', name: 'Penne ai formaggi', desc: '(grano - latte)', price: '€8', type: 'vegetariano' },
  { id: 46, category: 'bambini', name: 'Cotoletta di pollo', desc: '(grano - uova - prezzemolo)', price: '€8', type: 'terra' },
  { id: 47, category: 'bambini', name: 'Hamburger di manzo', desc: '(senza glutine)', price: '€8', type: 'terra' },
  { id: 48, category: 'bambini', name: 'Prosciutto cotto', desc: '(senza glutine)', price: '€6', type: 'terra' },
  { id: 49, category: 'bambini', name: 'Bastoncini* di pesce', desc: '(grano - uova - pesce)', price: '€7', type: 'mare' },
  { id: 50, category: 'bambini', name: 'Filetto di orata* ai ferri', desc: '(pesce)', price: '€9', type: 'mare' },
  { id: 51, category: 'bambini', name: 'Patatine* fritte', desc: '', price: '€4', type: 'vegetariano' },
  { id: 52, category: 'bambini', name: 'Pomodori', desc: '', price: '€4', type: 'vegetariano' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function MenuPage() {
  const [language, setLanguageState] = useState<'it' | 'en'>(() => {
    return (localStorage.getItem('app-lang') as 'it' | 'en') || 'it';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('antipasti');
  const [activeType, setActiveType] = useState('tutti');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const setLanguage = (lang: 'it' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('app-lang', lang);
    updateLanguage(lang);
  };

  useEffect(() => {
    updateLanguage(language);
  }, [language]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredMenu = menuData.filter(item => {
    const categoryMatch = activeCategory === 'mare' ? item.type === 'mare' : item.category === activeCategory;
    const typeMatch = activeType === 'tutti' || item.type === activeType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#041A25] font-sans selection:bg-[#000c7a] selection:text-white overflow-x-hidden">
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            aria-label={t('nav-backToTop', language)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-[#000c7a] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#3999cc] transition-colors duration-300"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FAF9F6]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-[#FAF9F6] py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center md:grid md:grid-cols-3">
          <div className="md:hidden flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#041A25]"
            >
              <MenuIcon size={28} />
            </button>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/menu" className="magnetic text-xs uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 text-[#041A25]" data-i18n="nav-menu">{t('nav-menu', language)}</Link>
            <Link to="/#il-ristorante" className="magnetic text-xs uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 text-[#041A25]" data-i18n="nav-about">{t('nav-about', language)}</Link>
          </div>
          
          <div className="flex justify-center flex-1 md:flex-none">
            <Link to="/" className="magnetic flex items-center">
              <img 
                src="https://i.postimg.cc/QtKkVZtp/Mini-logo-restiling-bianco.png" 
                alt="La Ola Logo" 
                className="h-20 md:h-24 transition-all duration-300 brightness-0"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          
          <div className="md:hidden flex-1 flex justify-end">
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
          
          <div className="hidden md:flex space-x-10 items-center justify-end">
            <a href="#contatti" className="magnetic text-xs uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 text-[#041A25]" data-i18n="nav-contact">{t('nav-contact', language)}</a>
            <Link to="/faq" className="magnetic text-xs uppercase tracking-[0.2em] hover:text-[#000c7a] transition-colors duration-300 text-[#041A25]" data-i18n="nav-faq">{t('nav-faq', language)}</Link>
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
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[#000c7a] transition-colors" data-i18n="nav-menu">{t('nav-menu', language)}</Link>
              <Link to="/#il-ristorante" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[#000c7a] transition-colors" data-i18n="nav-about">{t('nav-about', language)}</Link>
              <a href="#contatti" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[#000c7a] transition-colors" data-i18n="nav-contact">{t('nav-contact', language)}</a>
              <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="font-serif text-4xl hover:text-[#000c7a] transition-colors" data-i18n="nav-faq">{t('nav-faq', language)}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Header */}
      <section className="pt-40 pb-16 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#041A25] uppercase tracking-[0.2em] text-xs font-medium mb-4 block"
            data-i18n="menu-title"
          >
            {t('menu-title', language)}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl mb-8"
            data-i18n="menu-subtitle"
          >
            {t('menu-subtitle', language)}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm inline-block"
          >
            <p className="text-gray-600 font-light leading-relaxed text-xl" data-i18n="menu-lunchPromo">
              {t('menu-lunchPromo', language)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-6 md:gap-8 mb-8 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
              {['antipasti', 'primi', 'secondi', 'contorni', 'dessert', 'bambini'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`magnetic text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] pb-2 border-b-2 transition-all duration-300 whitespace-nowrap ${activeCategory === cat ? 'border-[#000c7a] text-[#000c7a]' : 'border-transparent text-gray-400 hover:text-[#000c7a]'}`}
                >
                  <span data-i18n={`menu-cat-${cat}`}>{t(`menu-cat-${cat}`, language)}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {['tutti', 'mare', 'terra'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`magnetic px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.1em] transition-all duration-300 ${activeType === type ? 'bg-[#000c7a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  <span data-i18n={`menu-type-${type}`}>{t(`menu-type-${type}`, language)}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item) => {
                const itemName = t(`menu-item-${item.id}-name`, language);
                const itemDesc = t(`menu-item-${item.id}-desc`, language);
                const displayName = itemName !== `menu-item-${item.id}-name` ? itemName : item.name;
                const displayDesc = itemDesc !== `menu-item-${item.id}-desc` ? itemDesc : item.desc;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-between items-start group"
                  >
                    <div className="flex-1 pr-4 md:pr-8">
                      <h3 className="font-serif text-lg md:text-xl mb-1 md:mb-2 group-hover:text-[#000c7a] transition-colors" data-i18n={`menu-item-${item.id}-name`}>{displayName}</h3>
                      {displayDesc && <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed" data-i18n={`menu-item-${item.id}-desc`}>{displayDesc}</p>}
                    </div>
                    <div className="text-[#041A25] font-serif text-base md:text-lg whitespace-nowrap ml-4">{item.price}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-center md:text-left text-sm text-gray-500 font-light flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] opacity-80" data-i18n="menu-frozenWarning">{t('menu-frozenWarning', language)}</p>
            <p className="font-medium text-[#041A25]" data-i18n="menu-coverCharge">{t('menu-coverCharge', language)}</p>
          </div>
        </div>
      </section>

      {/* Dynamic Image Gallery */}
      <section className="py-24 bg-[#FAF9F6] overflow-hidden">
        <div className="max-w-7xl mx-auto mb-16 text-center px-6">
          <span className="text-[#041A25] uppercase tracking-[0.2em] text-xs font-medium mb-4 block" data-i18n="menu-galleryTitle">{t('menu-galleryTitle', language)}</span>
          <h2 className="font-serif text-4xl md:text-5xl" data-i18n="menu-gallerySubtitle">{t('menu-gallerySubtitle', language)}</h2>
        </div>
        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        >
          {/* First set of images */}
          <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
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
              <div key={`set1-${i}`} className="flex-none w-[240px] h-[240px] md:w-[400px] md:h-[400px] bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                <img 
                  src={url} 
                  alt="Piatto" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          {/* Second set of images for seamless loop */}
          <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
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
              <div key={`set2-${i}`} className="flex-none w-[240px] h-[240px] md:w-[400px] md:h-[400px] bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                <img 
                  src={url} 
                  alt="Piatto" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
