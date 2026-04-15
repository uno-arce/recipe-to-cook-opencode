import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeSpotlight from './components/RecipeSpotlight';
import Ingredients from './components/Ingredients';
import Process from './components/Process';
import Favorites from './components/Favorites';
import RecipeOverview from './components/RecipeOverview';
import Footer from './components/Footer';
import { getRecipes, Recipe, RecipeWithImages } from './services/api';
import { useImageStore } from './stores/imageStore';

function generateDeviceId(): string {
  const stored = localStorage.getItem('recipe-app-device-id');
  if (stored) return stored;
  
  const newId = 'device-' + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('recipe-app-device-id', newId);
  return newId;
}

export default function App() {
  const [view, setView] = useState<'discover' | 'favorites' | 'overview'>('discover');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeWithImages | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const deviceId = generateDeviceId();
  const { recipeImages, setRecipeImage } = useImageStore();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load recipes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    const images = recipeImages.get(recipe._id);
    setSelectedRecipe({ ...recipe, images: images || { hero: '', steps: [] } });
    setView('overview');
    window.scrollTo(0, 0);
  };

  const handleViewChange = (newView: 'discover' | 'favorites') => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleRecipeGenerated = (recipe: Recipe, images: { hero: string; steps: string[] }) => {
    setRecipeImage(recipe._id, images);
    setRecipes(prev => [recipe, ...prev]);
    setSelectedRecipe({ ...recipe, images });
    setView('overview');
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen brutalist-grid bg-surface text-on-surface font-body antialiased selection:bg-secondary selection:text-white">
      <Navbar 
        currentView={view === 'overview' ? 'favorites' : view} 
        onViewChange={handleViewChange}
        deviceId={deviceId}
      />
      
      {view === 'discover' && (
        <>
          <Hero onRecipeGenerated={handleRecipeGenerated} isLoading={isLoading} />
          <RecipeSpotlight 
            recipes={recipes} 
            onRecipeClick={handleRecipeClick} 
            isLoading={isLoading}
          />
          <Ingredients />
          <Process />
        </>
      )}
      
      {view === 'favorites' && (
        <Favorites 
          recipes={recipes}
          onDiscoverMore={() => handleViewChange('discover')} 
          onRecipeClick={handleRecipeClick}
          deviceId={deviceId}
        />
      )}

      {view === 'overview' && selectedRecipe && (
        <RecipeOverview 
          recipe={selectedRecipe} 
          images={selectedRecipe.images}
          onBack={() => setView('favorites')}
          deviceId={deviceId}
        />
      )}
      
      <Footer />
    </main>
  );
}