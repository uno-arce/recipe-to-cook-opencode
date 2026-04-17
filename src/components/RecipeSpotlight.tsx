import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Recipe, RecipeWithImages } from '../services/api';
import { useImageStore } from '../stores/imageStore';
import { recipes as demoRecipes } from '../data/recipes';

const SPOTLIGHT_RECIPE = {
  name: "Wild Mushroom & Thyme Risotto",
  description: "A slow-cooked masterpiece celebrating the earthy depths of foraged fungi and the aromatic sharpness of garden-fresh thyme. Structured yet ethereal.",
  complexity: "Level 02 / Medium",
  time: "45 Minutes",
  yield: "04 Servings",
  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClEMsBFolTKSiCsBTa3QeApysAh-1qwjkn7M3_jYof9AhpIwvKiOBVdx8QeoJXOWnkXTgDQpFp319QEp_JkjKXIiuBjaX18cAPMhF9mMGdMNu1A2AXo72H3M2MVu5cq1e-4CQ7MhB0tTe_FqKFt1OXZDkYBM9l2GG-eT8ThAtGPCADDJ57fWqr9KcbyN75I8yo6qahWtiw_tUzBzojh7VgWAzTQj0Gi92W1i4Uq3s_30g1gcyXk7vq8BxWhPuHpuVhJRUfRxuA-j8"
};

interface RecipeSpotlightProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  isLoading: boolean;
}

export default function RecipeSpotlight({ recipes, onRecipeClick, isLoading }: RecipeSpotlightProps) {
  const { recipeImages } = useImageStore();

  const handleStartCooking = () => {
    const fullRecipe = demoRecipes.find(r => r.id === "mushroom-risotto");
    if (!fullRecipe) return;

    const mapped: Recipe = {
      _id: "mushroom-risotto",
      title: fullRecipe.title,
      description: fullRecipe.description,
      ingredients: fullRecipe.ingredients.map(i => {
        const parts = i.amount.split(' ');
        return {
          name: i.name,
          amount: parts[0] || '',
          unit: parts[1] || '',
          description: i.desc
        };
      }),
      instructions: fullRecipe.steps.map(s => ({
        step: parseInt(s.num),
        title: s.title,
        text: s.desc
      })),
      cookingTime: 45,
      servings: 4,
      difficulty: "Level 02 / Medium",
      cuisine: "Italian",
      aiMetadata: {
        textModel: 'demo',
        imageModel: 'demo',
        generationPrompt: ''
      },
      imagePrompts: [],
      heroImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    recipeImages.set(mapped._id, {
      hero: fullRecipe.img,
      steps: fullRecipe.steps.map(s => s.img)
    });

    onRecipeClick(mapped);
  };

  if (isLoading) {
    return (
      <section className="relative px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 font-headline text-sm text-on-surface-variant uppercase tracking-widest">
            Loading recipes...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 py-24 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 glass-panel p-10 md:p-16 border border-outline-variant/20"
        >
          <span className="font-headline text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Recipe Spotlight</span>
          <h2 className="font-headline text-5xl md:text-6xl font-black text-primary leading-[0.9] mb-6 uppercase">{SPOTLIGHT_RECIPE.name}</h2>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-8">
            {SPOTLIGHT_RECIPE.description}
          </p>
          
          <div className="flex flex-wrap gap-8 py-6 border-y border-outline-variant/20">
            <div>
              <span className="block font-headline text-[10px] uppercase text-on-surface-variant tracking-widest mb-1">Complexity</span>
              <span className="font-headline text-primary font-bold text-lg">{SPOTLIGHT_RECIPE.complexity}</span>
            </div>
            <div>
              <span className="block font-headline text-[10px] uppercase text-on-surface-variant tracking-widest mb-1">Time</span>
              <span className="font-headline text-primary font-bold text-lg">{SPOTLIGHT_RECIPE.time}</span>
            </div>
            <div>
              <span className="block font-headline text-[10px] uppercase text-on-surface-variant tracking-widest mb-1">Yield</span>
              <span className="font-headline text-primary font-bold text-lg">{SPOTLIGHT_RECIPE.yield}</span>
            </div>
          </div>
          
          <div className="mt-10">
            <button 
              onClick={handleStartCooking}
              className="bg-primary text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300 inline-flex items-center gap-3 group"
            >
              Start Cooking 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group overflow-hidden shadow-2xl border border-outline-variant/20"
        >
          <img 
            alt={SPOTLIGHT_RECIPE.name}
            className="w-full h-[600px] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
            src={SPOTLIGHT_RECIPE.src}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-surface-container-highest/30 -z-10 border-r border-b border-outline-variant/30"></div>
        </motion.div>
      </div>
    </section>
  );
}