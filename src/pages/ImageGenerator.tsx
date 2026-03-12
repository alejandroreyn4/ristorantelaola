import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';

// Declare window.aistudio for TypeScript
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function ImageGenerator() {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    try {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        // Fallback if not in AI Studio environment
        setHasKey(true);
      }
    } catch (err) {
      console.error("Error checking API key:", err);
      setHasKey(false);
    }
  };

  const handleSelectKey = async () => {
    try {
      if (window.aistudio?.openSelectKey) {
        await window.aistudio.openSelectKey();
        // Assume success to mitigate race condition
        setHasKey(true);
      }
    } catch (err) {
      console.error("Error opening key selector:", err);
      if (err instanceof Error && err.message.includes("Requested entity was not found")) {
        setHasKey(false);
      }
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Create a new instance right before making the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [
            { text: prompt }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size
          }
        }
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
            setGeneratedImage(imageUrl);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("Nessuna immagine generata. Riprova con un altro prompt.");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      setError(err instanceof Error ? err.message : "Si è verificato un errore durante la generazione dell'immagine.");
      
      if (err instanceof Error && err.message.includes("Requested entity was not found")) {
        setHasKey(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (hasKey === false) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 text-center">
        <ImageIcon size={64} className="text-[#000c7a] mb-6" />
        <h1 className="font-serif text-3xl text-[#041A25] mb-4">Generatore di Immagini Pro</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Per utilizzare il modello di generazione immagini ad alta qualità (Gemini 3 Pro Image), 
          è necessario selezionare una chiave API associata a un progetto Google Cloud con fatturazione abilitata.
        </p>
        <button 
          onClick={handleSelectKey}
          className="px-8 py-4 bg-[#000c7a] text-white hover:bg-[#3999cc] transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium rounded-lg"
        >
          Seleziona Chiave API
        </button>
        <p className="mt-6 text-xs text-gray-400">
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#000c7a]">
            Maggiori informazioni sulla fatturazione
          </a>
        </p>
        <Link to="/" className="mt-8 text-[#000c7a] hover:underline text-sm font-medium">
          Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#041A25] font-sans">
      {/* Header */}
      <header className="bg-white py-6 px-6 md:px-12 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center text-[#041A25] hover:text-[#000c7a] transition-colors group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Torna alla Home</span>
          </Link>
          <img 
            src="https://i.postimg.cc/QtKkVZtp/Mini-logo-restiling-bianco.png" 
            alt="La Ola Logo" 
            className="h-12 brightness-0"
            referrerPolicy="no-referrer"
          />
          <div className="w-[120px]"></div>
        </div>
      </header>

      <main className="py-12 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#041A25] uppercase tracking-[0.2em] text-xs font-medium mb-4 block">AI Studio</span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Generatore Immagini</h1>
          <p className="text-gray-500 font-light">Crea immagini esclusive per il ristorante con Gemini 3 Pro Image</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione dell'immagine (Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Es: Un piatto di spaghetti allo scoglio servito su un tavolo di legno rustico con vista mare al tramonto..."
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#000c7a] focus:border-transparent outline-none resize-none h-32"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risoluzione</label>
              <div className="flex gap-4">
                {['1K', '2K', '4K'].map((s) => (
                  <label key={s} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={(e) => setSize(e.target.value as any)}
                      className="mr-2 text-[#000c7a] focus:ring-[#000c7a]"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 bg-[#000c7a] text-white hover:bg-[#3999cc] transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Generazione in corso...
                </>
              ) : (
                'Genera Immagine'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {generatedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <h3 className="font-serif text-2xl mb-4 text-center">Risultato</h3>
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <img 
                  src={generatedImage} 
                  alt="Immagine generata" 
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-4 text-center">
                <a 
                  href={generatedImage} 
                  download="la-ola-ai-image.png"
                  className="inline-block px-6 py-3 border border-[#000c7a] text-[#000c7a] hover:bg-[#000c7a] hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium rounded-lg"
                >
                  Scarica Immagine
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
