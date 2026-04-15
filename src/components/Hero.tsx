import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { generateRecipe } from '../services/api';
import { Recipe, RecipeWithImages } from '../services/api';

interface HeroProps {
  onRecipeGenerated: (recipe: Recipe, images: { hero: string; steps: string[] }) => void;
  isLoading: boolean;
}

export default function Hero({ onRecipeGenerated, isLoading }: HeroProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await generateRecipe(prompt);
      onRecipeGenerated(response.recipe, response.images);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <section className="relative px-6 pt-32 pb-24 md:px-12 lg:px-24 border-b border-outline-variant overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-6xl md:text-8xl lg:text-9xl font-black text-primary leading-[0.85] mb-12 uppercase tracking-tighter"
        >
          Discover <br/>Sustainable <span className="text-secondary">Flavors</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-panel flex items-center px-6 py-4 shadow-2xl border border-outline-variant/20">
            <Search className="text-on-surface-variant mr-4 w-6 h-6" />
            <input 
              className="w-full bg-transparent border-none focus:outline-none text-xl font-headline placeholder:text-on-surface-variant/40 placeholder:uppercase placeholder:tracking-widest" 
              placeholder="Search food recipes..." 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
            />
            {isGenerating && (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            )}
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-red-600 font-headline"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 font-headline text-xs uppercase tracking-[0.4em] text-on-surface-variant"
        >
          The Ethical Kitchen — Curated for Conscious Consumption
        </motion.p>
      </div>
    </section>
  );
}