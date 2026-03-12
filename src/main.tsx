import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import FAQ from './pages/FAQ.tsx';
import MenuPage from './pages/Menu.tsx';
import Legal from './pages/Legal.tsx';
import ImageGenerator from './pages/ImageGenerator.tsx';
import MagneticCursor from './components/MagneticCursor';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MagneticCursor />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/generate-image" element={<ImageGenerator />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
