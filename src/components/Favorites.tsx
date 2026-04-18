import React, { useState, useEffect } from 'react';
import { Clock, Share2, Heart, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Recipe, getPreferences, removeFavorite, Preference } from '../services/api';
import { useImageStore } from '../stores/imageStore';
import SkeletonCard from './SkeletonCard';

interface FavoritesProps {
  recipes: Recipe[];
  onDiscoverMore: () => void;
  onRecipeClick: (recipe: Recipe) => void;
  deviceId: string;
}

export default function Favorites({ recipes, onDiscoverMore, onRecipeClick, deviceId }: FavoritesProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { recipeImages } = useImageStore();

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const prefs: Preference = await getPreferences(deviceId);
        setFavoriteIds(prefs.favoriteRecipeIds.map(id => id.toString()));
      } catch (err) {
        console.error('Failed to fetch preferences:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [deviceId]);

  const favoriteRecipes = recipes.filter(r => favoriteIds.includes(r._id));

  const handleRemoveFavorite = async (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await removeFavorite(deviceId, recipeId);
      setFavoriteIds(prev => prev.filter(id => id !== recipeId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="mb-16">
          <span className="font-headline uppercase text-xs tracking-widest text-secondary mb-4 block">Saved Collection</span>
          <h1 className="font-headline text-6xl md:text-8xl font-bold text-primary tracking-tighter leading-none uppercase">
            Your Saved Flavors
          </h1>
          <div className="h-1 w-32 bg-surface-container-highest mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-surface-container-low overflow-hidden">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <span className="font-headline uppercase text-xs tracking-widest text-secondary mb-4 block">Saved Collection</span>
        <h1 className="font-headline text-6xl md:text-8xl font-bold text-primary tracking-tighter leading-none uppercase">
          Your Saved Flavors
        </h1>
        <div className="h-1 w-32 bg-surface-container-highest mt-8"></div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-headline text-2xl text-primary uppercase mb-4">No favorites yet</p>
          <p className="font-body text-on-surface-variant mb-8">
            Generate recipes and save your favorites to see them here
          </p>
          <button 
            onClick={onDiscoverMore}
            className="font-headline uppercase tracking-[0.2em] text-primary border-b-2 border-secondary pb-2 hover:text-secondary transition-colors px-12 py-4"
          >
            Discover More Flavors
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant">
            {favoriteRecipes.map((recipe, idx) => {
                const heroImage = recipeImages.get(recipe._id)?.hero || recipe.heroImage || '';
                return (
                  <motion.div 
                    key={recipe._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-surface-container-low overflow-hidden transition-all duration-500 hover:z-10 cursor-pointer"
                    onClick={() => onRecipeClick(recipe)}
                  >
                    <div className="aspect-[4/5] relative overflow-hidden">
                      {heroImage ? (
                        <img 
                          src={heroImage} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                          <span className="font-headline text-on-surface-variant uppercase">No image</span>
                        </div>
                      )}
                    </div>
                <div className="p-6 bg-surface-container-low border-t border-outline-variant/10">
                  <h3 className="font-headline text-2xl font-bold text-primary mb-3">{recipe.title}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="font-headline text-[10px] uppercase tracking-widest bg-primary text-on-primary px-3 py-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {recipe.cookingTime} MIN
                      </span>
                      <span className="font-headline text-[10px] uppercase tracking-widest border border-primary/20 text-primary px-3 py-1">
                        {recipe.difficulty}
                      </span>
                    </div>
                    <button 
                      className="text-secondary hover:scale-110 transition-transform"
                      onClick={(e) => handleRemoveFavorite(recipe._id, e)}
                    >
                      <Heart className="w-5 h-5 fill-secondary" />
                    </button>
                  </div>
                </div>
              </motion.div>
                );
              })}
          </div>

          <div className="mt-24 flex flex-col items-center">
            <button 
              onClick={onDiscoverMore}
              className="font-headline uppercase tracking-[0.2em] text-primary border-b-2 border-secondary pb-2 hover:text-secondary transition-colors px-12 py-4"
            >
              Discover More Flavors
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}