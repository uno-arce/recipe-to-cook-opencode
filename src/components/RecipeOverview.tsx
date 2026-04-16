import { useState } from 'react';
import { Clock, SignalHigh, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Recipe, addFavorite, removeFavorite, getPreferences } from '../services/api';
import { useImageStore } from '../stores/imageStore';

interface RecipeWithImages {
  images: {
    hero: string;
    steps: string[];
  };
}

interface RecipeOverviewProps {
  recipe: Recipe;
  images: { hero: string; steps: string[] };
  onBack: () => void;
  deviceId: string;
}

export default function RecipeOverview({ recipe, images, onBack, deviceId }: RecipeOverviewProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { recipeImages } = useImageStore();
  
  const storedImages = recipeImages.get(recipe._id) || images;
  const heroImage = storedImages.hero;
  const stepImages = storedImages.steps;

  useState(() => {
    const checkFavorite = async () => {
      try {
        const prefs = await getPreferences(deviceId);
        setIsFavorite(prefs.favoriteRecipeIds.includes(recipe._id));
      } catch (err) {
        console.error('Failed to check favorite status:', err);
      } finally {
        setIsLoading(false);
      }
    };
    checkFavorite();
  });

  const handleToggleFavorite = async () => {
    setIsSaving(true);
    try {
      if (isFavorite) {
        await removeFavorite(deviceId, recipe._id);
        setIsFavorite(false);
      } else {
        await addFavorite(deviceId, recipe._id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20"
    >
      {/* Recipe Header Card */}
      <section className="min-h-[716px] grid grid-cols-1 md:grid-cols-2 bg-surface">
        {/* Left Side: Content */}
        <div className="p-12 md:p-24 flex flex-col justify-center gap-8 border-r border-outline-variant">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-headline text-xs uppercase tracking-widest group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </button>
          
          <div className="space-y-4">
            <span className="font-headline text-secondary font-bold tracking-[0.2em] uppercase text-xs">Featured Seasonal Dish</span>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-primary leading-[0.9] tracking-tighter uppercase">
              {recipe.title}
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-12 font-headline text-sm uppercase tracking-widest text-primary/70">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              <span>{recipe.cookingTime} MIN</span>
            </div>
            <div className="flex items-center gap-2">
              <SignalHigh className="w-5 h-5 text-secondary" />
              <span>{recipe.difficulty}</span>
            </div>
            <button 
              onClick={handleToggleFavorite}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-primary/20 hover:bg-white/20 transition-all duration-200 group"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin text-secondary" />
              ) : (
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-secondary text-secondary' : 'text-secondary group-hover:fill-secondary'} transition-all`} />
              )}
              <span className="font-headline text-xs font-bold tracking-[0.1em] text-primary">
                {isFavorite ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>
          
          <p className="font-body text-xl text-on-surface-variant max-w-lg leading-relaxed">
            {recipe.description}
          </p>
        </div>
        
        {/* Right Side: Image Spotlight */}
        <div className="relative overflow-hidden group">
          {heroImage ? (
            <img 
              alt={recipe.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={heroImage}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
              <span className="font-headline text-on-surface-variant uppercase">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-[1440px] mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Ingredients Section */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="sticky top-32">
            <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-primary mb-10 pb-4 border-b-4 border-secondary w-fit">
              Ingredients
            </h2>
            <ul className="space-y-8">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="border-b border-outline-variant pb-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-headline font-bold text-lg">{ing.name}</span>
                    <span className="font-headline text-secondary text-sm">{ing.amount} {ing.unit}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-body">{ing.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Cooking Process Section */}
        <section className="lg:col-span-8">
          <h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-primary mb-12">
            The Process
          </h2>
          <div className="space-y-12">
            {recipe.instructions.map((step, idx) => (
              <div key={idx} className="glass-panel grid grid-cols-1 md:grid-cols-3 gap-0 group">
                <div className="relative h-64 md:h-full overflow-hidden">
                  {stepImages[idx] ? (
                    <img 
                      alt={`Step ${step.step}`} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                      src={stepImages[idx]}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                      <span className="font-headline text-on-surface-variant uppercase text-xs">No image</span>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 p-10 flex flex-col justify-center">
                  <span className="font-headline text-secondary text-xs font-bold tracking-[0.3em] mb-4">
                    STEP {String(step.step).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline font-bold text-xl text-primary mb-4 uppercase">{step.title}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}